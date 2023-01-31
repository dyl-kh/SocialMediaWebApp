import { Flex, Image, useToast, Text, Box } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axi from '../../../axios';
import ProfileIcon from '../../MISC/ProfileIcon';

import SessionContext from '../../../state/sessionContext';
import ReplyInputField from './ReplyInputField';

const ReplyInput = props => {
    const [replyValue, setReplyValue] = useState(''); // value of reply input
    const { parentId, setPosts } = props;

    const [uploadingImage, setUploadingImage] = useState(false); // whether image is being uploaded
    const [imageURL, setImageURL] = useState(null); // url of image to be uploaded

    const [charactersLeft, setCharactersLeft] = useState(125); // number of characters left in reply
    useEffect(() => {
        setCharactersLeft(125 - replyValue.length);
    }, [replyValue]);

    useEffect(() => {
        // if temporary image is set as imageURL, wait until firebase image upload completes before allowing user to post

        if (imageURL && imageURL.includes('blob:http')) {
            setUploadingImage(true);
        } else {
            setUploadingImage(false);
        }
    }, [imageURL]);

    const { token } = useContext(SessionContext); // get token

    // const { userId } = sessionObj;

    const addReply = async () => {
        const postBody = JSON.stringify([
            {
                type: 'paragraph',
                children: [{ text: replyValue }],
            },
        ]);
        const newReply = {
            parentPostId: parentId,
            imageUrl: imageURL,
            // userId,
            postBody,
        };
        await axi
            .post('/post', newReply, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => setPosts(posts => [res.data, ...posts]));

        setReplyValue('');
    };

    const toast = useToast();

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                addReply();
                setReplyValue('');
                toast({
                    title: 'Comment posted.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }}
        >
            <Flex gap="20px" align="center">
                <ProfileIcon />
                <ReplyInputField
                    replyValue={replyValue}
                    setReplyValue={setReplyValue}
                    setImageURL={setImageURL}
                    uploadingImage={uploadingImage}
                    setCharactersLeft={setCharactersLeft}
                />
            </Flex>
            {replyValue.length > 0 ? (
                <Box mt="5px" ml="70px">
                    <Text>{charactersLeft} characters remaining...</Text>
                </Box>
            ) : null}
            {imageURL !== null ? (
                <Image src={imageURL} width="30%" ml="70px" mt="10px" />
            ) : null}
        </form>
    );
};

ReplyInput.propTypes = {
    parentId: PropTypes.string.isRequired,
    setPosts: PropTypes.func.isRequired,
};

export default ReplyInput;
