import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    align-items: center;
    display: flex;
    gap: 16px;
    justify-content: center;
    padding: 16px;
    border: 2px dashed yellow;
    // color: 
    border-radius: 20px;
    height: fit-content;
    min-height: 200px
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    background-color: #000;
`;

const GeneratedImage = ({ src, loading }) => {
    return <Container>
        {loading ? (
            <>
                <CircularProgress />
                Genrating Your Image ...</>
        ) : (
            <>{src ? <Image src={src} /> : <>Write prompt to generate image </>}</>
        )}
    </Container>
}

export default GeneratedImage
