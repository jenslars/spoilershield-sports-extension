import styled from 'styled-components';

export const StyledNagivateLeftButton = styled.button`
    background-size: 25px;
    height: 25px;
    width: 25px;
    background-color: unset;
    border: unset;
    cursor: pointer;

    transition: transform 0.2s ease, background-color 0.2s ease;

    &:hover {
        transform: scale(1.1); 
        background-color: rgba(0, 0, 0, 0.1); 
    }

    &:active {
        transform: scale(0.95); 
    }
`;