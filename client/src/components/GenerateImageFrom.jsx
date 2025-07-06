import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import Button from './button';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import TextInput from './textInput';
import { CreatePost, GenerateAIIamge } from '../api';
import { useState } from 'react';


const Form = styled.div`
    flex: 1;
    padding: 16px 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
`;
const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

`;
const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    @media(max-width: 880px){
        font-size: 22px;
    }
`;
const Desc = styled.div`
    font-size: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    @media(max-width: 880px){
        font-size: 14px;
    }
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
    flex: 1;
    display: flex;
    gap: 8px;
`;


const GenerateImageFrom = ({ post, setPost, createPostLoading, setGenerateImageLoading, generateImageLoading, setCreatePostLoading }) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const generateIamgeFun = async () => {
        setGenerateImageLoading(true);
        await GenerateAIIamge({ prompt: post.prompt }).then((res) => {
            setPost({ ...post, photo: `data:image/jpeg;base64,${res?.data?.photo}` });
            setGenerateImageLoading(false);
        }).catch((error) => {
            setError(error?.response?.data?.message);
            setGenerateImageLoading(false);
        });
    }

    const createPostFun = async () => {
        setCreatePostLoading(true);
        await CreatePost(post)
            .then((res) => {
                setCreatePostLoading(false);
                navigate("/");
            }).catch((error) => {
                setError(error?.response?.data?.message);
                setCreatePostLoading(false);
            });
    }
    return <Form>
        <Top>
            <Title>Generate Image with prompt</Title>
            <Desc>Write your prompt according to the image you want to generate!</Desc>
        </Top>
        <Body>
            <TextInput label="AUTHOR" placeholder="Enter your name..." name="name" value={post.name} handleChange={(e) => setPost({ ...post, name: e.target.value })} />
            <TextInput label="IMAGE PROMPT" placeholder="Write a detailed prompt of the iamge you want to generate..." name="prompt" rows="8" textarea value={post.prompt} handleChange={(e) => setPost({ ...post, prompt: e.target.value })} />
            {error && <div style={{ color: "red" }}>{error}</div>}
            ** You can post the AI Generated Image to the Community **
        </Body>
        <Actions>
            <Button text="Generate Image" flex leftIcon={<AutoAwesome />} isLoading={generateImageLoading} isDisabled={post.name === "" || post.prompt === ""} onClick={() => generateIamgeFun()} />
            <Button text="Post Image" flex type="secondary" leftIcon={<CreateRounded />} isLoading={createPostLoading} isDisabled={generateImageLoading || post.name === "" || post.prompt === "" || post.photo === ""} onClick={() => createPostFun()} />
        </Actions>
    </Form>
}

export default GenerateImageFrom
