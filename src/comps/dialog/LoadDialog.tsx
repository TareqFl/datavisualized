import React from 'react';
import { Channels } from '../../utils/types';
import { loadData } from '../../utils/utils';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useAppHooks } from '../../context/hooks';
import LoadingComponent from './LoadingComponent';

const LoadDialog = () => {
  const { setLoadedData, setChannels, setLoadDialog } = useAppHooks();

  const [data, setData] = React.useState<Channels[] | null | false>(null);

  React.useEffect(() => {
    const chan_data = loadData();
    if (chan_data) {
      let parsedData = JSON.parse(chan_data);

      setData(parsedData);
    }
  }, []);

  // Picking a file to load
  if (data === null) {
    return (
      <>
        <Typography textAlign={'center'}>No Saved Data Found</Typography>
        <Button fullWidth onClick={() => setLoadDialog(false)}>
          Cancel
        </Button>
      </>
    );
  }

  // Loading the picked file
  if (data === false) {
    return <LoadingComponent />;
  }

  return (
    <Box>
      <Typography>Files:</Typography>
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={1.5}
        flexWrap={'wrap'}
        maxHeight={200}
        overflow={'auto'}>
        {data.map((savedChannels: Channels, index: number) => {
          return (
            <Button
              key={index}
              onClick={() => {
                setLoadedData(savedChannels);
                setChannels(savedChannels.length);
                setData(false);
              }}>
              File v:{index}
            </Button>
          );
        })}
      </Stack>
      <Button fullWidth onClick={() => setLoadDialog(false)}>
        Cancel
      </Button>
    </Box>
  );
};

export default LoadDialog;
