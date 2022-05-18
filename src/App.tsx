import styled from 'styled-components';

import { Calendar } from '~/components/calendar';
import { GlobalStyles } from '~/styles/globalStyles';

const Container = styled.main`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  margin: 0;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  color: #f1f1f1;
  background-color: #1f1f1f;
`;

function App() {
  const previousDate = new Date(2022, 3, 15);
  const actualDate = new Date(2022, 3, 30);

  const formatSelectedDate = (selectedDate: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };

    return selectedDate.toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      <GlobalStyles />
      <Calendar
        date={[previousDate, actualDate]}
        setPeriod={period => console.log('selected period', period)}
        buttonsDefinedPeriods={[
          { label: '1 Month', returnInMonths: 0.2 },
          { label: '3 Months', returnInMonths: 3 },
          { label: '6 Months', returnInMonths: 6 },
          { label: '1 year', returnInMonths: 12 }
        ]}
      />

      <h1>Calendar Range:</h1>
      <span>{`${formatSelectedDate(previousDate)} - ${formatSelectedDate(actualDate)}`}</span>
    </Container>
  );
}

export default App;
