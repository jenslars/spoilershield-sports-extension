import React from 'react';
import { StyledBlockedEventsView } from './styles';
import BlockedEventsList from '../BlockedEventsList';
import HeaderSection from '../Header/HeaderSection';

const BlockedEventsView = () => {
  // You can get the current month/year from your existing logic
  const currentDate = new Date();
  const monthYear = {
    month: currentDate.toLocaleString('default', { month: 'long' }),
    year: currentDate.getFullYear()
  };

  return (
    <StyledBlockedEventsView>
      <HeaderSection monthYear={monthYear} />
      <div style={{ padding: '16px' }}>
        <h2 style={{ marginBottom: '24px', color: '#333' }}>Blocked Events</h2>
        <BlockedEventsList />
      </div>
    </StyledBlockedEventsView>
  );
};

export default BlockedEventsView; 