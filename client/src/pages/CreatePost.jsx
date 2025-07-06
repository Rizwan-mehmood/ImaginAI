import React, { useState } from 'react';
import styled from 'styled-components';
import GenerateImageFrom from '../components/GenerateImageFrom';
import GeneratedImage from '../components/GeneratedImage';


const Container = styled.div`
    height: 100%;
    overflow-y: scroll;
    background: ${({ theme }) => theme.bg};
    padding: 30px 10px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1200px;
    gap: 40px;
    display: flex;
    justify-content: center;
    @media(max-width: 880px){
        flex-direction: column-reverse;
    }
`;

const CreatePost = () => {
    const [generateImageLoading, setGenerateImageLoading] = useState(false);
    const [createPostLoading, setCreatePostLoading] = useState(false);
    const [post, setPost] = useState({
        name: "",
        prompt: "",
        photo: "",
    })
    return (
        <Container>
            <Wrapper>
                <GenerateImageFrom post={post} setPost={setPost} createPostLoading={createPostLoading} generateImageLoading={generateImageLoading} setGenerateImageLoading={setGenerateImageLoading} setCreatePostLoading={setCreatePostLoading} />
                <GeneratedImage src={post?.photo} loading={generateImageLoading} />
            </Wrapper>
        </Container >
    )
}

export default CreatePost
