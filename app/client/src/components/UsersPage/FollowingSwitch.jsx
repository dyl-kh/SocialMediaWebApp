import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Switch, Flex } from '@chakra-ui/react';
import { headingColorToggle } from '../common/ColorModeValues';

const FollowingSwitch = props => {
    const { setShowFollowing } = props;
    const [value, setValue] = useState(true); // value of the switch

    function handleSwitch() {
        setValue(!value);
        setShowFollowing(value); // pass value to parent component
    }
    return (
        <FormControl>
            <Flex direction="column" align="end">
                <FormLabel
                    color={headingColorToggle}
                    mr="0"
                    mb="5px"
                    htmlFor="following-switch"
                >
                    Only show people you&apos;re following
                </FormLabel>
                <Switch id="following-switch" onChange={() => handleSwitch()} />
            </Flex>
        </FormControl>
    );
};

FollowingSwitch.propTypes = {
    setShowFollowing: PropTypes.func.isRequired,
};

export default FollowingSwitch;
