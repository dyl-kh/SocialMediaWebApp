import React from 'react';
import { Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Reply from './Reply';
import ReplyInput from './ReplyInput';

const ReplyField = props => {
    const { postId, setPosts, posts, users, reactions } = props;

    // get replies whose parentID is the postID
    const postReplies = posts.filter(r => r.parentPostId === postId);

    const repliesJsx = [];
    return (
        <Stack mt="20px" gap="10px">
            <ReplyInput parentId={postId} setPosts={setPosts} posts={posts} />
            {
                // render replies
                Array.from(postReplies).forEach(reply => {
                    repliesJsx.push(
                        <Reply
                            key={reply.postId}
                            postId={reply.postId}
                            posts={posts}
                            setPosts={setPosts}
                            users={users}
                            reactions={reactions}
                        />
                    );
                })
            }
            {repliesJsx}
        </Stack>
    );
};

ReplyField.propTypes = {
    postId: PropTypes.string.isRequired,
    setPosts: PropTypes.func.isRequired,
    posts: PropTypes.instanceOf(Array).isRequired,
    users: PropTypes.instanceOf(Array).isRequired,
    reactions: PropTypes.instanceOf(Array).isRequired,
};

export default ReplyField;
