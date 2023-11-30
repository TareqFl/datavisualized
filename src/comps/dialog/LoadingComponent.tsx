import { LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { useAppHooks } from '../../context/hooks';

const LoadingComponent = () => {
  const { setLoadDialog } = useAppHooks();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoadDialog(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Stack direction={'column'}>
      <Typography textAlign={'center'}>Loading...</Typography>
      <LinearProgress />
    </Stack>
  );
};

export default LoadingComponent;
