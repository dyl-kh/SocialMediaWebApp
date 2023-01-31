import React, { useContext } from 'react';
import { Circle } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import SessionContext from '../../state/sessionContext';

// dynamic profile icon component
const ProfileIcon = props => {
    let { fullname } = props;
    const { userId, large } = props;
    const navigate = useNavigate();
    if (fullname === 'null') {
        // if fullname isnt specified, the fullname is taken from the session context
        fullname = useContext(SessionContext).user.fullName;
    }

    // get first letter of first and last name for profile icon initials
    const nameSplit = fullname.split(' ');
    let initials = '';
    if (nameSplit[0] === fullname) {
        initials = fullname[0].toUpperCase();
    } else {
        const first = nameSplit.shift().charAt(0).toUpperCase();
        const last = nameSplit.pop().charAt(0).toUpperCase();
        initials = first + last;
    }

    const clickProfile = () => {
        // navigate to /user/:userId
        if (userId !== 'null') {
            navigate(`/user/${userId}`);
        }
    };

    return (
        <Circle
            bgColor="teal.700"
            height={large ? '5rem' : '3rem'}
            width={large ? '5rem' : '3rem'}
            color="white"
            fontWeight="600"
            fontSize={large ? '4xl' : 'xl'}
            onClick={() => clickProfile()}
            cursor="pointer"
        >
            {initials}
        </Circle>
    );
};

ProfileIcon.propTypes = {
    fullname: PropTypes.string,
    userId: PropTypes.string,
    large: PropTypes.bool,
};

ProfileIcon.defaultProps = {
    fullname: 'null',
    userId: 'null',
    large: false,
};

export default ProfileIcon;
