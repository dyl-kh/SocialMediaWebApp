import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Divider,
    Flex,
    Image,
    Button,
    Spacer,
    useColorModeValue,
    Text,
    useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axi from '../../../axios';
import { borderColorToggle } from '../../common/ColorModeValues';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import ReplyField from '../replies/ReplyField';
import UploadImageButton from '../feedUtils/UploadImageButton';
import SessionContext from '../../../state/sessionContext';
import ReactionContainer from './ReactionContainer';
import InputTextBlock from './InputTextBlock';

const Post = props => {
    const { postId, setPosts, posts, users, reactions } = props;

    const { token } = useContext(SessionContext);

    // get postObject by postId from posts array
    const postObject = posts.find(p => p.postId === postId);

    const postReactions = reactions.filter(r => r.postId === postId);

    const postAuthorObject = users.find(u => u.userId === postObject.userId);

    const { imageUrl, postBody, editDateTime } = postObject;

    const formatEditDateTime = new Date(editDateTime).toLocaleString();
    const [editDateState, setEditDateState] = useState(formatEditDateTime);

    const [edit, setEdit] = useState(false); // whether post has been edited

    const [editImg, setEditImg] = useState(imageUrl); // image change during edit

    const [textValue, setTextValue] = useState(postObject.postBody); // text change during edit

    const [uploadingImage, setUploadingImage] = useState(false); // whether image is being uploaded

    const [charactersLeft, setCharactersLeft] = useState(600); // characters left in post

    // set characters left
    useEffect(() => {
        const parsedTextValue = JSON.parse(textValue);
        if (!Array.isArray(parsedTextValue)) {
            setCharactersLeft(600);
        } else {
            const totalCharacters = parsedTextValue.reduce((prevVal, val) => {
                let prevChars = prevVal;
                prevChars += val.children.reduce((prevVal2, val2) => {
                    let prevChars2 = prevVal2;
                    prevChars2 += val2.text.length;
                    return prevChars2;
                }, 0);
                return prevChars;
            }, 0);
            setCharactersLeft(600 - totalCharacters);
        }
    }, [textValue]);

    const toast = useToast();

    useEffect(() => {
        // if temporary image is set as imageURL, wait until firebase image upload completes before allowing user to post
        if (editImg && editImg.includes('blob:http')) {
            setUploadingImage(true);
        } else {
            setUploadingImage(false);
        }
    }, [editImg]);

    // update img in posts state array
    function setImage(id, img) {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.postId === id) {
                    return {
                        ...post,
                        imageUrl: img,
                    };
                }
                return post;
            })
        );
    }

    // update text in posts state array
    function setText(id, text) {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.postId === id) {
                    return {
                        ...post,
                        postBody: text,
                    };
                }
                return post;
            })
        );
    }

    // update edit date in posts state array
    function setEditDate(id, date) {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.postId === id) {
                    return {
                        ...post,
                        editDateTime: date,
                    };
                }
                return post;
            })
        );

        setEditDateState(date);
    }

    // delete post from posts state array
    function handleDelete() {
        setPosts(prevPosts => prevPosts.filter(post => post.postId !== postId));
        // TO DO
        // delete post replies from replies state array
        // setReplies(prevReplies =>
        //     prevReplies.filter(reply => reply.parentID !== postId)
        // );

        axi.delete('/post', {
            data: { postId },
            headers: { Authorization: `Bearer ${token}` },
        });
        toast({
            title: 'Post deleted.',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }

    const saveChanges = async () => {
        // save changes to post
        setImage(postId, editImg);
        setText(postId, textValue);

        // edit data
        const data = {
            postId,
            imageUrl: editImg,
            postBody: textValue,
        };
        // update db with edits

        // eslint-disable-next-line no-unused-vars
        const res = await axi.put('/post', data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const newEditDate = res.data.editDateTime;
        setEditDate(postId, newEditDate);

        toast({
            title: 'Post edited.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    function cancelChanges() {
        // reverts edits back to original post data
        setEdit(false);
    }

    return (
        <Box
            borderStyle="solid"
            borderWidth="1px"
            borderRadius="5px"
            borderColor={borderColorToggle}
            padding="30px"
            minW="450px"
            w="60vw"
            maxW="750px"
        >
            <PostHeader
                postId={postId}
                setEdit={setEdit}
                handleDelete={() => handleDelete()}
                posts={posts}
                postAuthorObject={postAuthorObject}
            />
            {edit ? (
                <Flex direction="column" gap="10px">
                    {/* <Textarea
                        isRequired
                        mt="10px"
                        value={textValue}
                        onChange={e => setTextValue(e.currentTarget.value)}
                        resize="none"
                        onKeyDown={e => {
                            e.currentTarget.style.height = '1px';
                            // eslint-disable-next-line prettier/prettier
                            e.currentTarget.style.height = `${
                                25 + e.currentTarget.scrollHeight
                                // eslint-disable-next-line prettier/prettier
                            }px`;
                        }}
                        overflow="hidden"
                        maxLength="250"
                    /> */}
                    <InputTextBlock
                        onChange={setTextValue}
                        mt="10px"
                        initial={textValue}
                    />
                    <Box mb="10px">
                        <Text>{charactersLeft} characters remaining...</Text>
                    </Box>

                    {editImg !== null ? (
                        <Image alignSelf="center" src={editImg} alt="img" />
                    ) : null}
                    <Flex gap="10px" align="center">
                        <UploadImageButton
                            setImageURL={setEditImg}
                            postId={postId}
                            isImg={imageUrl}
                            uploadingImage={uploadingImage}
                        />
                        <Spacer />
                        <Button onClick={() => cancelChanges()}>Cancel</Button>
                        <Button
                            isDisabled={uploadingImage}
                            onClick={() => saveChanges()}
                        >
                            {uploadingImage ? 'Uploading image...' : 'Save'}
                        </Button>
                    </Flex>
                </Flex>
            ) : (
                <Box>
                    <PostContent postBody={postBody} imageUrl={imageUrl} />
                    <Flex align="center">
                        {editDateTime ? (
                            <Text
                                mt="10px"
                                fontSize="smaller"
                                color={useColorModeValue(
                                    'gray.400',
                                    'gray.500'
                                )}
                            >
                                Edited {editDateState}
                            </Text>
                        ) : null}
                        <Spacer />
                        <ReactionContainer
                            postId={postId}
                            postReactions={postReactions}
                        />
                    </Flex>
                </Box>
            )}
            <Flex mt="20px" justify="center">
                <Divider />
            </Flex>
            <ReplyField
                postId={postId}
                setPosts={setPosts}
                posts={posts}
                users={users}
                reactions={reactions}
            />
        </Box>
    );
};

Post.propTypes = {
    postId: PropTypes.string.isRequired,
    setPosts: PropTypes.func.isRequired,
    posts: PropTypes.instanceOf(Array).isRequired,
    reactions: PropTypes.instanceOf(Array).isRequired,
    users: PropTypes.instanceOf(Array).isRequired,
};

export default Post;
