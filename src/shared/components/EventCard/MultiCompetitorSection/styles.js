import styled from "styled-components";

export const StyledMultiCompetitorSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: space-between;

`;

export const StyledEventHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-weight: 400;

    img {
        margin-left: 5px;
        border-radius: 2px;
        height: 12px;
        width: 20px
    }
`;

export const StyledEventDescription = styled.div`
    font-size: 9px;
    font-weight: 300;
`;