import styled from "styled-components";

export const StyledHeadToHeadSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    width: 80%;
    justify-content: space-between;
`;

export const StyledDividerSection = styled.span`
    font-size: 21px;
    font-weight: 600;
    color: #F0F0F0;
`;

export const StyledCompetitorSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 9px;
    font-weight: 300;
    
    div {
        margin-top: 4px;
    }
`;