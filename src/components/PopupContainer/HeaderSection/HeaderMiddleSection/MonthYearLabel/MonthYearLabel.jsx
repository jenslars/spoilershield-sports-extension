import React from 'react';
import { StyledLabel } from './styles';

const MonthYearLabel = ({ monthYear }) => {
    return (
        <StyledLabel>
            {monthYear.month} {monthYear.year}
        </StyledLabel>
    );
};

export default MonthYearLabel;
