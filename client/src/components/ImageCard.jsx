import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Avatar from '@mui/material/Avatar';
import { DownloadRounded } from '@mui/icons-material';
import FileSaver from "file-saver";


const Card = styled.div`
    position: relative;
    display: flex;
    border-radius: 20px;
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
        scale: 1.05;
    }

    &:nth-child(7n+1){
        grid-column: auto/span 2;
        grid-row: auto/span 2;
    }

    @media(max-width: 559px){
        &:nth-child(7n+1){
            grid-column: auto/span 1;
            grid-row: auto/span 2;
        }
    }
`;
const HoverOverlay = styled.div`
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 2px;
    backdrop-filter: blur(2px);
    background: rgba(0, 0, 0, 0.5);
    color: ${({ theme }) => theme.white};
    transition: opacity 0.3s ease;
    width: 100%;
    height: 100%
    z-index: 1;
    border-radius: 6px;
    justify-content: end;
    padding: 16px;

    ${Card}:hover & {
        opacity: 1;
    }
`;
const Prompt = styled.div`
    font-weight: 400;
    color: white;
    font-size: 15px;
`;
const Author = styled.div`
    font-weight: 600;
    color: white;
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 15px;
`;

const DownloadButtonWrapper = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.4);
        transform: scale(1.1);
    }

    svg {
        color: white;
        cursor: pointer;
    }
`;

const ImageCard = ({ item }) => {
    return (
        <Card>
            <LazyLoadImage style={{ borderRadius: "12px" }} width="100%" src={item?.photo} />
            <HoverOverlay>
                <Prompt>{item?.prompt}</Prompt>
                <div style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Author>
                        <Avatar sx={{ width: "32px", height: "32px" }}>{item?.name[0]}</Avatar>
                        {item?.name}</Author>
                    <DownloadButtonWrapper>
                        <DownloadRounded onClick={() => FileSaver.saveAs(item?.photo, "downlaod.jpg")} />
                    </DownloadButtonWrapper>
                </div>
            </HoverOverlay>
        </Card>
    )
}

export default ImageCard
