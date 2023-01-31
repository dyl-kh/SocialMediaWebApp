/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Box, Stack, Flex, Text, Spacer } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { headingColorToggle } from '../common/ColorModeValues';
import Post from './posts/Post';
import NewPost from './posts/NewPost';
import OwnPostSwitch from './feedUtils/OwnPostSwitch';
import SessionContext from '../../state/sessionContext';
import axi from '../../axios';

const Feed = () => {
    const { token, user } = useContext(SessionContext);
    // console.log('user: ', user);

    const [showOwnPosts, setShowOwnPosts] = useState(false); // whether to show only own posts

    // posts state array
    const [posts, setPosts] = useState();

    // get posts on mount
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axi.get('/post', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(res.data);
        };
        fetchPosts();
    }, []);

    // users state array
    const [users, setUsers] = useState();
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axi.get('/users');
            const allUsers = res.data;
            setUsers(allUsers);
        };
        fetchUsers();
    }, []);

    // reactions state array
    const [reactions, setReactions] = useState();
    useEffect(() => {
        const fetchReactions = async () => {
            const res = await axi.get('/post/reaction', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReactions(res.data);
        };
        fetchReactions();
    }, []);

    // update localStorage with posts state
    // useEffect(() => {
    //     localStorage.setItem('posts', JSON.stringify(posts));
    // }, [posts]);

    const getFirstName = () => {
        const name = user.fullName;
        const firstName = name.split(' ')[0];
        return firstName;
    };

    const postsJsx = [];

    if (!posts || !users || !reactions) {
        return <Text>Loading...</Text>;
    }
    return (
        <Box>
            <Stack align="center" mt="80px">
                <Flex
                    minW="450px"
                    w="60vw"
                    maxW="750px"
                    direction="column"
                    mb="30px"
                    color={headingColorToggle}
                >
                    <Flex>
                        <Box>
                            <Text fontSize="3xl" fontWeight="500">
                                Welcome to
                                <span style={{ color: '#3182ce' }}>
                                    {' '}
                                    LAN
                                </span>, {getFirstName()}!
                            </Text>
                            <Text fontSize="large">
                                See what others are up to
                            </Text>
                        </Box>
                        <Spacer />
                        <Box>
                            <OwnPostSwitch setShowOwnPosts={setShowOwnPosts} />
                        </Box>
                    </Flex>
                    <NewPost setPosts={setPosts} />
                </Flex>
                <Stack gap="20px">
                    {Array.from(posts).forEach(post => {
                        if (post.isRoot === true) {
                            const postToAdd = (
                                // create post jsx
                                <Post
                                    postId={post.postId}
                                    setPosts={setPosts}
                                    posts={posts}
                                    users={users}
                                    reactions={reactions}
                                    setReactions={setReactions}
                                    key={uuid()}
                                />
                            );
                            if (
                                // if showOwnPosts is true, only add own posts
                                showOwnPosts &&
                                post.userId === user.userId
                            ) {
                                postsJsx.push(postToAdd);
                            } else if (!showOwnPosts) {
                                // if showOwnPosts is false, add all posts
                                postsJsx.push(postToAdd);
                            }
                        }
                    })}
                    {postsJsx}
                </Stack>
            </Stack>
        </Box>
    );
};

export default Feed;
