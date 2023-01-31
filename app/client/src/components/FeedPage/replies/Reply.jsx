import React, { useState } from 'react';
import { Link, Box, Text, Flex, Button, Image, Spacer } from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { headingColorToggle } from '../../common/ColorModeValues';
import ProfileIcon from '../../MISC/ProfileIcon';

// eslint-disable-next-line import/no-cycle
import SubReplyField from './SubReplyField';
import SubReplyInput from './SubReplyInput';
import ReactionContainer from '../posts/ReactionContainer';

const Reply = props => {
    const { postId, posts, setPosts, users, reactions } = props;

    // reply object from posts array
    const replyObject = posts.find(r => r.postId === postId);

    const postReactions = reactions.filter(r => r.postId === postId);

    const { postBody, dateTime, userId, imageUrl } = replyObject;
    const formatDate = new Date(dateTime).toLocaleString();

    const rawPostBody = JSON.parse(postBody)[0].children[0].text;

    // posts to this reply
    const subReplies = posts.filter(r => r.parentPostId === postId);

    const postAuthorObject = users.find(u => u.userId === replyObject.userId);

    const authorName = postAuthorObject.fullName;

    const [replyFieldActive, setReplyFieldActive] = useState(false);

    return (
        <Box minW="100%">
            <Box minW="100%">
                <Flex gap="10px" minW="100%">
                    <ProfileIcon fullname={authorName} userId={userId} />
                    <Flex gap="5px" direction="column" minW="100%">
                        <Link
                            as={RouterLink}
                            to={`/user/${userId}`}
                            _hover={{ textDecoration: 'none' }}
                        >
                            <Text
                                color={headingColorToggle}
                                fontWeight="semibold"
                            >
                                {authorName}
                            </Text>
                        </Link>
                        <Text>{rawPostBody}</Text>

                        {imageUrl ? (
                            <Image src={imageUrl} alt="reply img" width="40%" />
                        ) : null}
                        <Flex align="center" maxW="92%">
                            <Box>
                                <Flex align="center" gap="5px">
                                    <Text
                                        color={headingColorToggle}
                                        fontSize="smaller"
                                    >
                                        {formatDate}
                                    </Text>
                                    <Button
                                        size="xs"
                                        onClick={
                                            () =>
                                                setReplyFieldActive(
                                                    !replyFieldActive
                                                )
                                            // toggle subreply input
                                        }
                                    >
                                        {replyFieldActive ? 'Cancel' : 'Reply'}
                                    </Button>
                                </Flex>
                            </Box>
                            <Spacer />
                            <Box>
                                <ReactionContainer
                                    postId={postId}
                                    postReactions={postReactions}
                                />
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>

                {replyFieldActive ? (
                    // input field for replying to this reply
                    <SubReplyInput
                        parentID={replyObject.postId}
                        setPosts={setPosts}
                        posts={posts}
                    />
                ) : null}
            </Box>
            {subReplies.length > 0 ? (
                // sub posts to this reply
                <SubReplyField
                    subReplies={subReplies}
                    posts={posts}
                    setPosts={setPosts}
                    users={users}
                    reactions={reactions}
                />
            ) : null}
        </Box>
    );
};

Reply.propTypes = {
    postId: PropTypes.string.isRequired,
    posts: PropTypes.instanceOf(Array).isRequired,
    setPosts: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(Array).isRequired,
    reactions: PropTypes.instanceOf(Array).isRequired,
};
export default Reply;
