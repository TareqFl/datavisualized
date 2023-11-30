import React from 'react';
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Paper, Slider, Stack, Typography } from '@mui/material';
import { useAppHooks } from '../../context/hooks';

ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DisplayChart = ({ channel }: { channel: number }) => {
  const {
    startStop,
    timing,
    channelsData,
    setChannelsData,
    channels,
    loadedData,
  } = useAppHooks();

  const [values, setValues] = React.useState<number[]>([1]);
  const [colors, setColors] = React.useState<string>('#2B2A4C');
  const [channelData, setChannelData] = React.useState<{
    channel: number;
    data: number[];
  }>({ channel, data: values });

  // Generate unqiue color for each chart
  React.useEffect(() => {
    const randomData = Math.round(Math.random() * 10);
    // less than 3
    if (randomData < 2) {
      return setColors(() => '#2B2A4C');
    }
    // between 3 and 6
    if (randomData >= 3 && randomData <= 5) {
      return setColors(() => '#EA906C');
    }

    // between 6 8
    if (randomData >= 6 && randomData <= 8) {
      return setColors(() => '#B31312');
    }
    if (randomData >= 9 && randomData <= 10) {
      return setColors(() => '#FA7070');
    }
  }, []);

  React.useEffect(() => {
    // start or stop generating data to charts
    let timer: number;
    if (startStop) {
      timer = setInterval(() => {
        const randomData = Math.round(Math.random() * 10);
        setValues((prev) => [...prev, randomData]);
        setChannelData((prev) => ({
          ...prev,
          data: [...prev.data, randomData],
        }));
      }, timing * 1000);
    }

    if (channels === 1) {
      setChannelsData([{ channel, data: values }]);
    }

    if (channels > 1 && channelsData !== null) {
      channelsData.forEach((ch, inx) => {
        if (ch.channel === channel) {
          let new_Channels = channelsData;
          new_Channels[inx] = channelData;
          setChannelsData(new_Channels);
        }
        if (ch.channel !== channel) {
          let new_Channels = [...channelsData, channelData];

          setChannelsData(new_Channels);
        }
      });
    }

    return () => {
      clearTimeout(timer);
    };
  }, [startStop, timing]);

  React.useLayoutEffect(() => {
    if (loadedData && loadedData[channel] && loadedData[channel].data) {
      let newValues = loadedData[channel].data;

      setChannelsData(loadedData);
      setChannelData({ channel, data: newValues });
      setValues(() => newValues);
    }
  }, [loadedData]);

  const data = {
    labels: values,
    datasets: [
      {
        label: `Channel ${channel}`,
        data: values,
        borderColor: colors,
        borderWidth: 1,
        backgroundColor: colors,
        borderRadius: 4,
        hoverBorderColor: '#EEE2DE',
        hoverBorderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          color: '#333',
        },
      },
    },
  };

  const [zoom, setZoom] = React.useState<number | number[]>(1);
  const handleZoom = (_event: Event, newValue: number | number[]) => {
    setZoom(newValue as number);
  };
  return (
    <Paper sx={{ borderRadius: 2, padding: 2 }}>
      <Stack direction={'row'} gap={4}>
        <Box width={'75%'} overflow={'auto'} padding={2}>
          <Bar
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  grid: {
                    color: '#333',
                  },
                  suggestedMax: zoom,
                },
              },
            }}
          />
        </Box>
        <Stack direction={'column'} gap={2}>
          <Box>
            <Typography>Channel: {channel}</Typography>
            <Typography>data: {values.length}</Typography>
          </Box>
          <Typography textAlign={'center'}>Scale</Typography>
          <Slider
            sx={{
              width: 200,
            }}
            color='secondary'
            size='small'
            aria-label='TimeChange'
            value={zoom}
            onChange={handleZoom}
            min={1}
            max={50}
            step={1}
            valueLabelDisplay='auto'
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DisplayChart;
