/* eslint-disable prettier/prettier */
import { Button, Box, Stack, Image, useToast, Text } from '@chakra-ui/react';
import { HiPlus } from 'react-icons/hi';
import { FiMinus } from 'react-icons/fi';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import UploadImageButton from '../feedUtils/UploadImageButton';
import SessionContext from '../../../state/sessionContext';
import axi from '../../../axios';
import InputTextBlock from './InputTextBlock';

const NewPost = props => {
    const { setPosts } = props;
    const { token } = useContext(SessionContext);

    const [textValue, setTextValue] = useState(''); // value of text input
    const [active, setActive] = useState(false); // whether dropdown input field is active
    const [image, setImage] = useState(null); // image to be uploaded
    const [imageURL, setImageURL] = useState(); // url of uploaded image
    const [uploadingImage, setUploadingImage] = useState(false); // whether image is being uploaded

    const [charactersLeft, setCharactersLeft] = useState(600); // number of characters left in reply

    // set characters left
    useEffect(() => {
        if (textValue === '') {
            setCharactersLeft(600);
        } else {
            const parsedTextValue = JSON.parse(textValue);
            if (!Array.isArray(parsedTextValue)) {
                setCharactersLeft(600);
            } else {
                const totalCharacters = parsedTextValue.reduce(
                    (prevVal, val) => {
                        let prevChars = prevVal;
                        prevChars += val.children.reduce((prevVal2, val2) => {
                            let prevChars2 = prevVal2;
                            prevChars2 += val2.text.length;
                            return prevChars2;
                        }, 0);
                        return prevChars;
                    },
                    0
                );
                setCharactersLeft(600 - totalCharacters);
            }
        }
    }, [textValue]);

    useEffect(() => {
        // if temporary image is set as imageURL, wait until firebase image upload completes before allowing user to post
        if (imageURL && imageURL.includes('blob:http')) {
            setUploadingImage(true);
        } else {
            setUploadingImage(false);
        }
    }, [imageURL]);

    // create url from image file
    useEffect(() => {
        if (image === null) return;
        const newImageURL = URL.createObjectURL(image);
        setImageURL(newImageURL);
    }, [image]);

    // add new posts to posts state array
    const addPost = async () => {
        const newPost = {
            // userId: sessionObj.userId,
            postBody: textValue,
            imageUrl: imageURL,
        };

        await axi.post('/post', newPost, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        await axi
            .get('/post', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => setPosts(res.data));
    };

    const toast = useToast();

    return (
        <Stack gap="20px">
            <Button
                mt="20px"
                rightIcon={active ? <FiMinus /> : <HiPlus />}
                width="min"
                onClick={() => {
                    setActive(!active);
                    setImageURL(undefined);
                    setImage(null);
                }}
            >
                {active ? 'Cancel' : 'Create New Post'}
            </Button>
            {active ? (
                <Box>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            if (textValue === '') {
                                toast({
                                    title: 'Post cannot be empty',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                });
                            } else {
                                addPost();
                                setTextValue('');
                                setImage(null);
                                setImageURL(undefined);
                                setActive(false);
                                toast({
                                    title: 'Post created.',
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                });
                            }
                        }}
                    >
                        <Stack gap="20px">
                            <Box>
                                <InputTextBlock onChange={setTextValue} />

                                <Box mb="10px">
                                    <Text>
                                        {charactersLeft} characters remaining...
                                    </Text>
                                </Box>

                                {imageURL !== undefined ? (
                                    <Image
                                        src={imageURL}
                                        maxH="200px"
                                        alt="img"
                                        mb="10px"
                                    />
                                ) : null}

                                <UploadImageButton
                                    setImageURL={setImageURL}
                                    uploadingImage={uploadingImage}
                                />
                            </Box>
                            <Button
                                isDisabled={
                                    uploadingImage ||
                                    charactersLeft < 0 ||
                                    charactersLeft === 600
                                }
                                type="submit"
                            >
                                {uploadingImage ? 'Uploading image...' : 'Post'}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            ) : null}
        </Stack>
    );
};

NewPost.propTypes = {
    setPosts: PropTypes.func.isRequired,
};

export default NewPost;
