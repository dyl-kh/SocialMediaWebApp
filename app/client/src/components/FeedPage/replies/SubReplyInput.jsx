import {
    Input,
    Flex,
    Button,
    Spinner,
    Image,
    Box,
    Text,
    useToast,
} from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import UploadImageButton from '../feedUtils/UploadImageButton';
import axi from '../../../axios';
import SessionContext from '../../../state/sessionContext';

const SubReplyInput = props => {
    const [replyValue, setReplyValue] = useState(''); // value of reply input
    const { parentID, setPosts } = props;

    const { token } = useContext(SessionContext);

    const [uploadingImage, setUploadingImage] = useState(false); // whether image is being uploaded
    const [imageURL, setImageURL] = useState(null);

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

    // add reply to posts state
    const addReply = async () => {
        const postBody = JSON.stringify([
            {
                type: 'paragraph',
                children: [{ text: replyValue }],
            },
        ]);

        const newReply = {
            parentPostId: parentID,
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
            .then(res => setPosts(posts => [res.data, ...posts]))
            .catch(err => console.log(err));

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
                    title: 'Reply posted.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }}
        >
            <Flex mb="20px" direction="column">
                <Flex gap="20px" align="center" mt="20px" ml="60px">
                    <Input
                        width="80%"
                        value={replyValue}
                        onChange={e => setReplyValue(e.currentTarget.value)}
                        placeholder="Write a reply"
                        isRequired
                        size="sm"
                    />
                    {uploadingImage ? (
                        <Button
                            isDisabled
                            rightIcon={<Spinner />}
                            minW="-moz-fit-content"
                            size="sm"
                        >
                            Uploading Image
                        </Button>
                    ) : (
                        <>
                            <UploadImageButton
                                setImageURL={setImageURL}
                                small
                                reply
                            />
                            <Button
                                size="sm"
                                type="submit"
                                isDisabled={
                                    uploadingImage ||
                                    charactersLeft < 0 ||
                                    charactersLeft === 125
                                }
                                minW="-moz-fit-content"
                            >
                                Reply
                            </Button>
                        </>
                    )}
                </Flex>
                {replyValue.length > 0 ? (
                    <Box ml="60px" mt="5px">
                        <Text>{charactersLeft} characters remaining...</Text>
                    </Box>
                ) : null}
            </Flex>

            {imageURL !== null ? (
                <Image src={imageURL} width="30%" ml="60px" mt="10px" />
            ) : null}
        </form>
    );
};

SubReplyInput.propTypes = {
    parentID: PropTypes.string.isRequired,
    setPosts: PropTypes.func.isRequired,
};

export default SubReplyInput;
