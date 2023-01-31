import { Text } from '@chakra-ui/react';
import styled from 'styled-components';

// styling for the login switcher link
const StyledHyperText = styled(Text)`
    color: #3182ce;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

export default StyledHyperText;
