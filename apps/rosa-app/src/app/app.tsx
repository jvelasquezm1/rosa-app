import styled from 'styled-components';
import Card from '../calendar/Card';
import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Card />
    </StyledApp>
  );
}

export default App;
