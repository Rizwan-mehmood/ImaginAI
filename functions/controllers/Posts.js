import Post from '../models/Posts.js';
import * as dotenv from "dotenv";

import { createError } from '../error.js'
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        next(createError(
            error.status,
            error?.response?.data?.error?.message || error?.message
        ));
    }
}


// Create Post
export const createPost = async (req, res, next) => {
    try {
        let body = req.body;

        // Handle cases where body is a Buffer
        if (Buffer.isBuffer(body)) {
            body = body.toString("utf8");
        }

        // Handle cases where body is a stringified JSON
        if (typeof body === "string") {
            try {
                body = JSON.parse(body);
            } catch (err) {
                return next(createError(400, "Invalid JSON in request body"));
            }
        }

        // Logging the sanitized body
        console.log("Incoming post data:", {
            type: typeof body,
            keys: Object.keys(body || {}),
            sample: body?.photo?.slice?.(0, 100)
        });

        const { name, prompt, photo } = body;

        if (!name || !prompt || !photo) {
            return next(createError(400, "Missing required fields"));
        }

        // Upload photo to Cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);

        // Create new post
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl?.secure_url,
        });

        return res.status(201).json({ success: true, data: newPost });

    } catch (error) {
        next(createError(
            error.status || 500,
            error?.response?.data?.error?.message || error?.message || "Server Error"
        ));
    }
};
