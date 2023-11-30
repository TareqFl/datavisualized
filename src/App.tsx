import { Container, SxProps } from '@mui/material';
import ChartRenderer from './comps/chartRenderer/ChartRenderer';

import Controls from './comps/Controls';
const App = () => {
  const container: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: 2,
  };

  return (
    <Container sx={container}>
      <Controls />
      <ChartRenderer />
    </Container>
  );
};

export default App;
