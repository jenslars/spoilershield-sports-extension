import styled from "styled-components";

export const StyledEventContainer = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 99px;
    background-color: #2D2D2D;
    border-radius: 10px;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const BlockedEventOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #5E5E5E;
    border-radius: 10px;
    z-index: 0;
    pointer-events: none;
    transition: 0.5s;
    
    &.active {
        width: 100%;
        transition: 0.5s;
    }
`;

export const StyledLeftSection = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 66%;
    margin-left: 10px;
    justify-content: space-between;
`;

export const StyledEventDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-size: 8px;
    color: #ACACAC;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 300;
    margin-bottom: 10px;
`;

export const StyledAsideSection = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 34%;
    font-weight: 400;
`;

export const StyledTime = styled.div`
    font-size: 22px;
    margin-bottom: -5px;
`;

export const StyledBlockButton = styled.div`
    position: relative;
    overflow: hidden;
    height: 25px;
    width: 75px;
    display: flex;
    align-items: center;
    background: #4A4A4A;
    color: #fff;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    user-select: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const BlockedButtonOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #4A4A4A;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    z-index: 2;
    pointer-events: none;
    transition: 0.5s;

    &.active {
        width: 100%;
        transition: 0.5s;
    }
`;