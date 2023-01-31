import React from 'react';
import { Input, Button, Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import UploadImageButton from '../feedUtils/UploadImageButton';

const ReplyInputField = ({
    replyValue,
    setReplyValue,
    setImageURL,
    uploadingImage,
}) => {
    const [charLength, setCharLength] = React.useState(0);
    const handleOnChange = e => {
        setReplyValue(e.currentTarget.value);
        setCharLength(e.currentTarget.value.length);
    };

    return (
        <>
            <Input
                value={replyValue}
                onChange={handleOnChange}
                placeholder="Write a comment"
                isRequired
                type="text"
            />
            {uploadingImage ? (
                <Button
                    isDisabled
                    rightIcon={<Spinner />}
                    minW="-moz-fit-content"
                >
                    Uploading Image
                </Button>
            ) : (
                <>
                    <UploadImageButton setImageURL={setImageURL} reply />
                    <Button
                        minW="-moz-fit-content"
                        type="submit"
                        isDisabled={
                            uploadingImage ||
                            charLength === 0 ||
                            charLength > 125
                        }
                    >
                        Comment
                    </Button>
                </>
            )}
        </>
    );
};

ReplyInputField.propTypes = {
    replyValue: PropTypes.string.isRequired,
    setReplyValue: PropTypes.func.isRequired,
    setImageURL: PropTypes.func.isRequired,
    uploadingImage: PropTypes.bool.isRequired,
};

export default ReplyInputField;
