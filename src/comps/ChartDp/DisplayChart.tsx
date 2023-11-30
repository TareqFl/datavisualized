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
import { Box, Paper, Stack, Typography } from '@mui/material';
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
  const [colors, setColors] = React.useState<string[]>(['#2B2A4C']);
  const [channelData, setChannelData] = React.useState<{
    channel: number;
    data: number[];
  }>({ channel, data: values });
  React.useEffect(() => {
    let timer: number;
    if (startStop) {
      timer = setInterval(() => {
        const randomData = Math.round(Math.random() * 10);
        setValues((prev) => [...prev, randomData]);
        // less than 3
        if (randomData < 3) {
          setChannelData((prev) => ({
            ...prev,
            data: [...prev.data, randomData],
          }));

          return setColors((prev) => [...prev, '#2B2A4C']);
        }
        // between 3 and 6
        if (randomData >= 3 && randomData <= 6) {
          setChannelData((prev) => ({
            ...prev,
            data: [...prev.data, randomData],
          }));
          return setColors((prev) => [...prev, '#EA906C']);
        }

        // greater than 6
        setChannelData((prev) => ({
          ...prev,
          data: [...prev.data, randomData],
        }));
        return setColors((prev) => [...prev, '#B31312']);
        // Do nothing if paused
        return;
      }, timing * 1000);
    }

    // reset  when all channels removed
    if (channels === 0) {
      setChannelsData(null);
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

  React.useEffect(() => {
    if (loadedData) {
      let newValues = loadedData[channel].data;

      setChannelsData(loadedData);
      setChannelData({ channel, data: newValues });
      setValues(() => newValues);
      newValues.filter((randomData) => {
        if (randomData < 3) {
          return setColors((prev) => [...prev, '#2B2A4C']);
        }
        // between 3 and 6
        if (randomData >= 3 && randomData <= 6) {
          return setColors((prev) => [...prev, '#EA906C']);
        }

        // greater than 6

        if (randomData > 6) {
          return setColors((prev) => [...prev, '#B31312']);
        }
      });
    }
  }, [loadedData]);

  React.useEffect(() => {
    setChannelData({ channel, data: values });
  }, [values]);

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

  return (
    <Paper sx={{ borderRadius: 2, padding: 2 }}>
      <Stack direction={'row'} gap={4}>
        <Box flex={0.9}>
          <Bar data={data} options={options} />
        </Box>
        <Box>
          <Typography>Channel: {channel}</Typography>
          <Typography>data: {values.length}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default DisplayChart;
