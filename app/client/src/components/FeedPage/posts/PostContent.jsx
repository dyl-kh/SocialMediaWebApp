import React from 'react';
import { Box, Stack, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import richTextRender from '../feedUtils/richTextRender';
// contains the post text and image
const PostContent = props => {
    const { postBody, imageUrl } = props;

    return (
        <Box mt="20px">
            <Stack gap="20px" mb="30px">
                {richTextRender(postBody)}
                {imageUrl ? (
                    <Image
                        alignSelf="center"
                        src={imageUrl}
                        alt="img"
                        objectFit="contain"
                    />
                ) : null}
            </Stack>
        </Box>
    );
};

PostContent.propTypes = {
    postBody: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
};

PostContent.defaultProps = {
    imageUrl: 'null',
};

export default PostContent;
