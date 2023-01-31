import { Flex, Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
// eslint-disable-next-line import/no-cycle
import Reply from './Reply';

const SubReplyField = props => {
    const { subReplies, posts, setPosts, users, reactions } = props;

    const [open, setOpen] = useState(false); // whether subreply field is open

    // text of button when subreply field closed
    const closedButtonText =
        subReplies.length === 1
            ? '1 Reply'
            : `${subReplies.length}
Replies`;

    // text of button when subreply field open
    const openButtonText =
        subReplies.length === 1 ? 'Hide Reply' : 'Hide Replies';

    const subRepliesJsx = [];

    return (
        <Flex
            minW="90%"
            w="90%"
            mt="10px"
            position="relative"
            left="60px"
            direction="column"
        >
            <Button
                width="min"
                leftIcon={open ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                onClick={() => setOpen(!open)}
                size="sm"
                mb="10px"
            >
                {open ? openButtonText : closedButtonText}
            </Button>
            {open
                ? // render subposts
                  Array.from(subReplies).forEach(reply => {
                      subRepliesJsx.push(
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
                : null}
            {}

            <Box mr="20px">{subRepliesJsx}</Box>
        </Flex>
    );
};

SubReplyField.propTypes = {
    subReplies: PropTypes.instanceOf(Array).isRequired,
    posts: PropTypes.instanceOf(Array).isRequired,
    setPosts: PropTypes.func.isRequired,
    users: PropTypes.instanceOf(Array).isRequired,
    reactions: PropTypes.instanceOf(Array).isRequired,
};

export default SubReplyField;
