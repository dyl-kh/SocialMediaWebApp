/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, FormLabel, Input, Spinner } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { FiUpload as UploadImage } from 'react-icons/fi';
import { storage, firebase } from '../../../firebase';

const UploadImageButton = props => {
    const { setImageURL, isImg, small, uploadingImage, reply } = props;
    const [checkImg, setCheckImg] = useState(isImg); // check if image exists

    const imageButtonRef = useRef(null); // ref to image button
    const imageButtonLabelRef = useRef(null); // ref to image button label
    const [image, setImage] = useState(null); // image file
    function triggerInputClick(e) {
        // trigger input click when label is clicked
        if (e.target === imageButtonRef.current) {
            imageButtonLabelRef.current.click();
        }
    }

    const uploadImageToFirebase = () => {
        const newImageId = uuid();
        const uploadTask = storage.ref(`images/${newImageId}`).put(image);
        // upload image to firebase storage
        uploadTask.on(
            'state_changed',
            snapshot => {
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        break;
                }
            },
            error => {
                // pass
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    // pass
                });

                storage
                    .ref('images')
                    .child(newImageId)
                    .getDownloadURL()
                    .then(url => setImageURL(url));
            }
        );
    };

    const [isHovering, setIsHovering] = useState(false); // whether mouse is hovering over image button

    // trigger hover for button
    const handleMouseOver = () => {
        setIsHovering(true);
    };

    // trigger unhover for button
    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const [buttonText, setButtonText] = useState(''); // text on button
    const [buttonIcon, setButtonIcon] = useState(<UploadImage />); // icon on button

    useEffect(() => {
        // set button text and icon based on whether button is hovered over
        if (reply) {
            setButtonText(isHovering ? 'Upload Image' : <UploadImage />);
            setButtonIcon(isHovering ? <UploadImage /> : null);
            return;
        }
        setButtonText('Upload Image');
    }, [isHovering]);

    useEffect(() => {
        if (image === null) return;
        // set temporary image url for preview while upload is in progress
        const newImageURL = URL.createObjectURL(image);
        setImageURL(newImageURL);
        uploadImageToFirebase();
        setCheckImg('img');
    }, [image]);

    return (
        <Button
            onClick={e => {
                triggerInputClick(e);
            }}
            ref={imageButtonRef}
            rightIcon={uploadingImage ? <Spinner /> : buttonIcon}
            minW="-moz-fit-content"
            size={small ? 'sm' : null}
            isDisabled={uploadingImage}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <FormLabel
                width="100%"
                m="0px"
                cursor="pointer"
                ref={imageButtonLabelRef}
            >
                <Input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        setImage(e.currentTarget.files[0]); // set image file
                    }}
                    display="none"
                />
                {checkImg === null || checkImg === 'null' || isImg === 'img'
                    ? buttonText
                    : 'Change Image'}
            </FormLabel>
        </Button>
    );
};

UploadImageButton.propTypes = {
    setImageURL: PropTypes.func.isRequired,
    isImg: PropTypes.string,
    small: PropTypes.bool,
    uploadingImage: PropTypes.bool,
    reply: PropTypes.bool,
};

UploadImageButton.defaultProps = {
    isImg: 'img',
    small: false,
    uploadingImage: false,
    reply: false,
};

export default UploadImageButton;
