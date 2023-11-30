import { Container, Stack } from '@mui/material';
import React from 'react';
import { useAppHooks } from '../../context/hooks';
import DisplayChart from '../ChartDp/DisplayChart';
import { Channels } from '../../utils/types';

const ChartRenderer = () => {
  const { channels, setChannelsData, loadedData, setLoadedData } =
    useAppHooks();

  // render charts based on channels
  const [render, setRender] = React.useState<Channels>([]);

  React.useEffect(() => {
    if (channels && loadedData === null) {
      let charts = [];
      let i = 0;
      for (i; i < channels; i++) {
        charts.push({ channel: i, data: [1] });
      }
      setRender(charts);
    }
    // reset  when all channels removed
    if (channels === 0) {
      setChannelsData(null);
      setLoadedData(null);
    }

    // render charts data from local
    if (channels && loadedData) {
      setRender(loadedData);
    }

    // render new charts
    if (loadedData && channels > loadedData.length) {
      let newLoad = loadedData;
      newLoad.push({ channel: loadedData.length, data: [1] });
      setRender(newLoad);
      setLoadedData(loadedData);
    }

    // remove a chart from render
    if (loadedData && channels < loadedData.length) {
      let newLoad = loadedData;
      newLoad.pop();
      setRender(newLoad);
      setLoadedData(loadedData);
    }
  }, [channels]);

  if (channels === 0) return <></>;

  return (
    <Container maxWidth='md'>
      <Stack direction={'column'} gap={2} flex={1}>
        {render.map((dpChart, index) => {
          return <DisplayChart key={index} channel={dpChart.channel} />;
        })}
      </Stack>
    </Container>
  );
};

export default ChartRenderer;
