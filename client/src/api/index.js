import axios from "axios";

const API = axios.create({
    baseURL: "/.netlify/functions/index/api"
});


export const GetPosts = async () => await API.get("/post");
export const CreatePost = async (data) => await API.post("/post", data);
export const GenerateAIIamge = async (data) => await API.post("/generateImage", data);