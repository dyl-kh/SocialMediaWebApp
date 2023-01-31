import { Button, Flex } from '@chakra-ui/react';
import React, { useState, useContext, useEffect } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import PropTypes from 'prop-types';
import SessionContext from '../../../state/sessionContext';
import axi from '../../../axios';

// contains the like and dislike buttons
const ReactionContainer = props => {
    const { postId, postReactions } = props;

    const { token, user } = useContext(SessionContext);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);

    const [reactionStatus, setReactionStatus] = useState(null);

    useEffect(() => {
        const sortReactions = () => {
            const likesArr = [];
            const dislikesArr = [];
            postReactions.forEach(reaction => {
                if (reaction.reactionType === 'like') {
                    likesArr.push(reaction);
                    if (reaction.userId === user.userId) {
                        setReactionStatus('like');
                    }
                } else {
                    dislikesArr.push(reaction);
                    if (reaction.userId === user.userId) {
                        setReactionStatus('dislike');
                    }
                }
            });
            setLikes(likesArr);
            setDislikes(dislikesArr);
        };
        sortReactions();
    }, []);

    const handleClick = async type => {
        if (reactionStatus === 'like' && type === 'dislike') {
            setReactionStatus('dislike');
            const res = await axi.put(
                '/post/reaction',
                {
                    postId,
                    reactionType: 'dislike',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLikes(
                likes.filter(like => {
                    if (
                        like.userId === res.data.userId &&
                        like.postId === res.data.postId
                    ) {
                        return false;
                    }
                    return true;
                })
            );
            setDislikes([...dislikes, res.data]);
        } else if (reactionStatus === 'dislike' && type === 'like') {
            setReactionStatus('like');
            const res = await axi.put(
                '/post/reaction',
                {
                    postId,
                    reactionType: 'like',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // console.log(res);
            setDislikes(
                dislikes.filter(dislike => {
                    if (
                        dislike.userId === res.data.userId &&
                        dislike.postId === res.data.postId
                    ) {
                        return false;
                    }
                    return true;
                })
            );
            setLikes([...likes, res.data]);
        } else if (reactionStatus === type) {
            setReactionStatus(null);
            const res = await axi.delete('/post/reaction', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    postId,
                },
            });
            if (type === 'like') {
                setLikes(
                    likes.filter(like => {
                        if (
                            like.userId === res.data.userId &&
                            like.postId === res.data.postId
                        ) {
                            return false;
                        }
                        return true;
                    })
                );
            } else {
                setDislikes(
                    dislikes.filter(dislike => {
                        if (
                            dislike.userId === res.data.userId &&
                            dislike.postId === res.data.postId
                        ) {
                            return false;
                        }
                        return true;
                    })
                );
            }
        } else if (reactionStatus === null) {
            const res = await axi.post(
                '/post/reaction',
                {
                    postId,
                    reactionType: type,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setReactionStatus(type);
            if (type === 'like') {
                setLikes([...likes, res.data]);
            } else {
                setDislikes([...dislikes, res.data]);
            }
        }
    };

    return (
        <Flex gap="10px" mt="10px">
            <Button
                leftIcon={<AiFillLike />}
                onClick={() => handleClick('like')}
                colorScheme={reactionStatus === 'like' ? 'green' : 'gray'}
                type="like"
            >
                {likes.length}
            </Button>
            <Button
                leftIcon={<AiFillDislike />}
                onClick={() => handleClick('dislike')}
                colorScheme={reactionStatus === 'dislike' ? 'red' : 'gray'}
                type="dislike"
            >
                {dislikes.length}
            </Button>
        </Flex>
    );
};

ReactionContainer.propTypes = {
    postId: PropTypes.string.isRequired,
    postReactions: PropTypes.instanceOf(Array),
};

ReactionContainer.defaultProps = {
    postReactions: [],
};

export default ReactionContainer;
