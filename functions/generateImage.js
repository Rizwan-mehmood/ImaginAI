import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function handler(event, context) {
    try {
        // 1) Parse the incoming JSON body
        let body = event.body || "{}";
        // If it’s single‐quoted or Buffer‐stringified, clean it up:
        body = body
            .replace(/^'|'$/g, "")
            .replace(/'/g, '"');
        const { prompt } = JSON.parse(body);

        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Prompt is required" }),
            };
        }

        console.log("Final parsed prompt:", prompt);

        // 2) Call Hugging Face
        const hfResponse = await axios.post(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-base",
            {
                inputs: prompt,
                parameters: {
                    num_outputs: 1,
                    num_inference_steps: 15,
                    guidance_scale: 7.5
                },
                options: { wait_for_model: true }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
                    Accept: "image/png"
                },
                responseType: "arraybuffer"
            }
        );


        const imgBase64 = Buffer.from(hfResponse.data).toString("base64");
        return {
            statusCode: 200,
            body: JSON.stringify({ photo: imgBase64 }),
        };

    } catch (err) {
        console.error("Background generateImage error:", err);
        const message = err.message || "Server error";
        return {
            statusCode: err.status || 500,
            body: JSON.stringify({ message }),
        };
    }
}