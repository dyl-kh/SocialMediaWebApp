import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SignOutButton = props => {
    const { onClick } = props;
    const [clicked, setClicked] = useState(false); // state of button initial click
    const [btnText, setBtnText] = useState('Sign Out'); // text of button

    // sign out button with confirmation
    const handleClick = () => {
        if (!clicked) {
            setBtnText('Are you sure?');
            setClicked(true);
        } else if (clicked) {
            onClick();
        }
    };

    return <Button onClick={handleClick}>{btnText}</Button>;
};

SignOutButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SignOutButton;
