import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import CircularProgress from '@mui/material/CircularProgress';
import { GetPosts } from "../api/index.js"

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

const Headline = styled.div`
    font-size: 34px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    align-items: center;
    flex-direction: column;
    @media(max-width: 768px){
        font-size: 24px;
    }
`;
const Span = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: ${({ theme }) => theme.primary};
    @media(max-width: 768px){
        font-size: 20px;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    padding: 32px 0;
    display: flex;
    justify-content: center;

`;

const CardWrapper = styled.div`
    display: grid;
    gap: 20px;
    @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: 560px) and (max-width: 1199px){
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 559px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const getPosts = async () => {
        setLoading(true);
        await GetPosts()
            .then((res) => {
                setPosts(res?.data?.data);
                setLoading(false);
                setFilteredPosts(res?.data?.data);
            })
            .catch((error) => {
                setError(error?.response?.data?.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        getPosts();
    }, []);

    // Search functionality
    useEffect(() => {
        if (!search) {
            setFilteredPosts(posts);
        }

        const searchFilteredPosts = posts.filter((post) => {
            const promptMatch = post?.prompt?.toLowerCase().includes(search.toLowerCase());
            const authorMatch = post?.name?.toLowerCase().toLowerCase().includes(search.toLowerCase());
            return promptMatch || authorMatch;
        });
        if (search) {
            setFilteredPosts(searchFilteredPosts);
        }
    }, [posts, search]);
    return (
        <Container>
            <Headline>Explore popular posts in the community
                <Span>• Generated with AI •</Span>
            </Headline>
            <SearchBar search={search} setSearch={setSearch} />
            <Wrapper>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {loading ? (<CircularProgress />) :
                    (<CardWrapper>
                        {filteredPosts.length === 0 ? <>No Posts Found</> :
                            <>
                                {filteredPosts.slice().reverse().map((item, index) => (
                                    <ImageCard key={index} item={item} />
                                ))}
                            </>}
                    </CardWrapper>)
                }
            </Wrapper>
        </Container>
    )
}

export default Home
