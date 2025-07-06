// controllers/generateImage.js

import axios from "axios";
import { createError } from "../error.js";
import dotenv from "dotenv";
dotenv.config();

export const generateImage = async (req, res, next) => {
    try {
        let body = req.body;

        if (Buffer.isBuffer(body)) {
            body = body.toString();
        }

        if (typeof body === 'string') {
            // Convert single-quoted string to valid JSON
            try {
                body = JSON.parse(body.replace(/^'|'$/g, '').replace(/'/g, '"'));
            } catch (parseErr) {
                return next(createError(400, "Invalid JSON format in request body"));
            }
        }

        const { prompt } = body;
        console.log("Final parsed prompt:", prompt);

        if (!prompt) {
            return next(createError(400, "Prompt is required"));
        }

        // Call Hugging Face Inference API (expecting image response)
        const hfResponse = await axios.post(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                inputs: prompt,
                parameters: { num_outputs: 1, num_inference_steps: 10, guidance_scale: 7.5 },
                options: { wait_for_model: true },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
                    Accept: "image/png", // ask for raw image
                },
                responseType: "arraybuffer",
            }
        );

        const contentType = hfResponse.headers["content-type"] || "";
        if (!contentType.startsWith("image/")) {
            const text = Buffer.from(hfResponse.data, "binary").toString("utf8");
            console.error("🛑 Unexpected non-image response:", text);
            return next(createError(502, "Unexpected response from Hugging Face"));
        }

        const imgBase64 = Buffer.from(hfResponse.data).toString("base64");
        return res.status(200).json({ photo: imgBase64 });

    } catch (err) {
        if (err.response?.data) {
            const errorText = Buffer.from(err.response.data, "binary").toString("utf8");
            console.error("🛑 HF error payload:", errorText);
        }

        console.error("🛑 HF error status:", err.response?.status);
        console.error("🛑 HF error message:", err.message);

        let message = err.message;
        try {
            const parsed = JSON.parse(
                Buffer.from(err.response?.data, "binary").toString("utf8")
            );
            if (parsed?.error) message = parsed.error;
        } catch { }

        return next(createError(err.response?.status || 500, message));
    }
};
