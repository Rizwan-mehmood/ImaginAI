// functions/generateImage.background.js
import axios from "axios";
import { createError } from "./error.js";      // adjust path if needed
import dotenv from "dotenv";
dotenv.config();

export async function handler(event, context) {
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
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Prompt is required" }),
            };
        }

        // call HF API (same as before)
        const hfResponse = await axios.post(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            { inputs: prompt, options: { wait_for_model: true } },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
                    Accept: "image/png",
                },
                responseType: "arraybuffer",
            }
        );

        // verify and encode
        const imgBase64 = Buffer.from(hfResponse.data).toString("base64");
        return {
            statusCode: 200,
            body: JSON.stringify({ photo: imgBase64 }),
        };
    } catch (err) {
        console.error("Background generateImage error:", err);
        return {
            statusCode: err.status || 500,
            body: JSON.stringify({ message: err.message || "Server error" }),
        };
    }
}
