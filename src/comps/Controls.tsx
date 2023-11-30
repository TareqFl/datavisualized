import {
  Button,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useAppHooks } from '../context/hooks';

const Controls = () => {
  const {
    mode,
    setMode,
    startStop,
    setStartStop,
    timing,
    setTiming,
    timingRange,
    setTimingRange,
    channels,
    setChannels,
    setSaveDialog,
    setLoadDialog,
  } = useAppHooks();

  // ======>Handlers<========
  // Render channels
  const handleChannelCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (value === '-1') {
      setChannels(0);
      return setStartStop(false);
    }
    setChannels(Number(value));
  };

  // Timer slider
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setTiming(newValue as number);
  };

  // Range for Timer slider
  const handleTimingRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    if (value === '0') {
      return setTimingRange('1');
    }
    setTimingRange(value);
  };

  // Save Data
  const saveData = () => {
    setStartStop(false);
    setLoadDialog(false);
    setSaveDialog(true);
  };

  // Load Data
  const loadData = () => {
    setStartStop(false);
    setSaveDialog(false);
    setLoadDialog(true);
  };
  // ======>End Of Handlers<========

  return (
    <>
      <Stack
        flex={1}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Stack
          flex={1}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'start'}
          gap={2}
          flexWrap={'wrap'}>
          <Tooltip title={'Save Data'}>
            <span>
              <Button
                variant='contained'
                color='info'
                disabled={!channels ? true : false}
                onClick={saveData}>
                Save
              </Button>
            </span>
          </Tooltip>
          <Tooltip title={'Load Data'}>
            <Button variant='contained' color='info' onClick={loadData}>
              Load
            </Button>
          </Tooltip>
          <Button onClick={() => window.localStorage.clear()}>Clear</Button>
        </Stack>
        <Tooltip
          title={mode.charAt(0).toUpperCase() + mode.slice(1) + ' Theme'}>
          <Button
            onClick={() => {
              if (mode === 'dark') return setMode('light');
              if (mode === 'light') return setMode('dark');
            }}>
            {mode}
          </Button>
        </Tooltip>
      </Stack>
      {/* Controls */}
      <Stack direction={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
        <TextField
          type='number'
          value={channels}
          onChange={handleChannelCount}
          label='channels'
        />
        <Button
          variant='contained'
          onClick={() => setStartStop(true)}
          disabled={!channels ? true : startStop ? true : false}>
          Start
        </Button>
        <Button
          variant='contained'
          onClick={() => setStartStop(false)}
          disabled={startStop ? false : true}>
          Pause
        </Button>

        <Stack direction={'row'} alignItems={'center'} gap={2}>
          {/* Adjust max time intervale */}
          <TextField
            label='Time Range (s)'
            type='number'
            onChange={handleTimingRange}
            value={timingRange}
            disabled={!channels ? true : false}
          />

          {/* Adjust Time */}
          <Slider
            sx={{
              width: 200,
            }}
            size='small'
            aria-label='TimeChange'
            value={timing}
            onChange={handleChange}
            min={1}
            max={Number(timingRange)}
            valueLabelDisplay='auto'
            disabled={!channels ? true : false}
          />
          <Typography>every {timing} sec</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Controls;
