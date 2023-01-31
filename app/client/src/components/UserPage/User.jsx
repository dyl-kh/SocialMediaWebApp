/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Text, Flex, Button, Box } from '@chakra-ui/react';
import axi from '../../axios';
import SessionContext from '../../state/sessionContext';
import ProfileIcon from '../MISC/ProfileIcon';
import { headingColorToggle } from '../common/ColorModeValues';
import Post from '../FeedPage/posts/Post';

const User = () => {
    const { id: displayedUserId } = useParams();

    // posts state array
    const [posts, setPosts] = useState();
    const { token } = useContext(SessionContext);

    const [userObject, setUserObject] = React.useState({});
    // console.log('userObject', userObject);
    useEffect(() => {
        const fetchUserObject = async () => {
            const res = await axi
                .get(`/user?userId=${displayedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .catch();
            if (res) {
                setUserObject(res.data);
            } else {
                setUserObject({ fullName: 'User not found' });
            }
        };
        fetchUserObject();
    }, [displayedUserId]);

    // record visit to user page
    useEffect(() => {
        const recordVisit = async () => {
            try {
                await axi.post(
                    '/user/visit-user',
                    { targetUserId: displayedUserId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch {
                // console.log('error recording visit');
            } finally {
                // console.log(
                //     'Profile visit recorded for user: ',
                //     displayedUserId
                // );
            }
        };
        recordVisit();
    }, [displayedUserId]);

    // get posts on mount
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axi.get('/post', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const allPosts = res.data;
            setPosts(allPosts);

            // // only show posts by this user
            // console.log('allPosts: ', allPosts);
            // const filteredPosts = allPosts.filter(
            //     post => post.userId === displayedUserId && post.isRoot
            // );
            // console.log('filteredPosts: ', filteredPosts);
            // setPosts(filteredPosts);
        };
        fetchPosts();
    }, []);

    // get post count on mount
    const [postCount, setPostCount] = useState();
    useEffect(() => {
        const fetchPostCount = async () => {
            const res = await axi
                .get(`/user/postCount?userId=${displayedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .catch();

            setPostCount(res.data.postCount);
        };
        fetchPostCount();
    }, []);

    // get follower count on mount
    const [followerCount, setFollowerCount] = useState();
    useEffect(() => {
        const fetchFollowerCount = async () => {
            const res = await axi
                .get(`/user/followers?userId=${displayedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .catch();

            setFollowerCount(res.data.length);
        };
        fetchFollowerCount();
    }, []);

    // get following count on mount
    const [followingCount, setFollowingCount] = useState();
    useEffect(() => {
        const fetchFollowingCount = async () => {
            const res = await axi
                .get(`/user/following?userId=${displayedUserId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .catch();

            setFollowingCount(res.data.length);
        };
        fetchFollowingCount();
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

    const isFollowing = true;
    const postsJsx = [];
    if (!posts || !users || !reactions) {
        return <div>Loading...</div>;
    }
    return (
        <Stack align="center" mt="40px">
            {userObject.fullName === 'User not found' ? (
                <Text>Not Found</Text>
            ) : (
                <Box>
                    <Flex
                        align="center"
                        gap="40px"
                        color={headingColorToggle}
                        mt="40px"
                        mb="70px"
                    >
                        <ProfileIcon fullname={userObject.fullName} large />
                        <Flex direction="column" gap="20px">
                            <Flex gap="20px">
                                <Text fontSize="2xl" fontWeight="500">
                                    {userObject.fullName}
                                </Text>
                            </Flex>
                            <Flex gap="10px">
                                <Text>
                                    <Text as="b">{postCount}</Text>
                                    {postCount === 1 ? ' post' : ' posts'}
                                </Text>
                                <Text>
                                    <Text as="b">{followerCount}</Text>
                                    {followerCount === 1
                                        ? ' follower'
                                        : ' followers'}
                                </Text>
                                <Text as="b">{followingCount}</Text>
                                following
                            </Flex>
                        </Flex>
                    </Flex>
                    <Stack align="center" mt="40px">
                        {posts.forEach(post => {
                            if (
                                post.userId === displayedUserId &&
                                post.isRoot
                            ) {
                                postsJsx.push(
                                    <div
                                        style={{ marginBottom: '20px' }}
                                        key={post.postId}
                                    >
                                        <Post
                                            postId={post.postId}
                                            setPosts={setPosts}
                                            posts={posts}
                                            users={users}
                                            reactions={reactions}
                                        />
                                    </div>
                                );
                            }
                        })}
                        {postsJsx}
                    </Stack>
                </Box>
            )}
        </Stack>
    );
};

export default User;
