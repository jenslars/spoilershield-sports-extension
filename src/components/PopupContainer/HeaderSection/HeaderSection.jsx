import React from 'react';
import HeaderRightSection from "./HeaderRightSection/HeaderRightSection";
import HeaderLeftSection from './HeaderLeftSection/HeaderLeftSection';
import MonthYearLabel from './HeaderMiddleSection/MonthYearLabel/MonthYearLabel';
import { StyledHeader } from './styles';

const HeaderSection = ({ monthYear }) => {
    return (
        <StyledHeader>
            <HeaderLeftSection />
            <MonthYearLabel monthYear={monthYear} />
            <HeaderRightSection />
        </StyledHeader>
    );
};

export default HeaderSection;
