import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Switch, Flex } from '@chakra-ui/react';
import { headingColorToggle } from '../../common/ColorModeValues';

const OwnPostSwitch = props => {
    const { setShowOwnPosts } = props;
    const [value, setValue] = useState(true); // value of the switch

    function handleSwitch() {
        setValue(!value);
        setShowOwnPosts(value); // pass value to parent component
    }
    return (
        <FormControl>
            <Flex direction="column" align="end">
                <FormLabel
                    color={headingColorToggle}
                    mr="0"
                    mb="5px"
                    htmlFor="own-post-switch"
                >
                    Own Posts
                </FormLabel>
                <Switch id="own-post-switch" onChange={() => handleSwitch()} />
            </Flex>
        </FormControl>
    );
};

OwnPostSwitch.propTypes = {
    setShowOwnPosts: PropTypes.func.isRequired,
};

export default OwnPostSwitch;
