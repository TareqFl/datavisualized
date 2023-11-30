import { createContext, useReducer } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { InitialState, ETypes, Payload, Props } from './types';
import Dialog from '../comps/dialog/Dialog';
import { Channels } from '../utils/types';
const initialState: InitialState = {
  mode: 'dark',
  saveDialog: false,
  loadDialog: false,
  startStop: false,
  timing: 1,
  timingRange: '1',
  channels: 0,
  channelsData: null,
  loadedData: null,
  setLoadedData: () => {},
  setChannelsData: () => {},
  setMode: () => {},
  setSaveDialog: () => {},
  setLoadDialog: () => {},
  setStartStop: () => {},
  setTiming: () => {},
  setTimingRange: () => {},
  setChannels: () => {},
};

function reducer(state: InitialState, action: Payload) {
  const { type, payload } = action;

  switch (type) {
    case ETypes.MODE:
      return { ...state, mode: payload };
    case ETypes.SAVE_DIALOG:
      return { ...state, saveDialog: payload };
    case ETypes.LOAD_DIALOG:
      return { ...state, loadDialog: payload };
    case ETypes.START_STOP:
      return { ...state, startStop: payload };
    case ETypes.TIMING:
      return { ...state, timing: payload };
    case ETypes.TIMING_RANGE:
      return { ...state, timingRange: payload };
    case ETypes.CHANNELS:
      return { ...state, channels: payload };
    case ETypes.SET_CHANNEL_DATA:
      return { ...state, channelsData: payload };
    case ETypes.SET_LOAD_CHANNEL_DATA:
      return { ...state, loadedData: payload };
    default:
      return state;
  }
}

const AppSettings = createContext({
  ...initialState,
});

export const AppSettingsContext = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Theme
  const { mode } = state;

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'light' ? '#f3f4f9' : '#0f1924',
        paper: mode === 'light' ? '#1b252f' : 'transparent',
      },
    },
    typography: {
      allVariants: {
        color: mode === 'light' ? '#333' : 'white',
      },
    },
  });

  // hooks
  const setMode = (payload: 'dark' | 'light') =>
    dispatch({ type: ETypes.MODE, payload });

  const setLoadedData = (payload: Channels | null) =>
    dispatch({
      type: ETypes.SET_LOAD_CHANNEL_DATA,
      payload,
    });

  const setSaveDialog = (payload: boolean) =>
    dispatch({ type: ETypes.SAVE_DIALOG, payload });

  const setLoadDialog = (payload: boolean) =>
    dispatch({ type: ETypes.LOAD_DIALOG, payload });

  const setStartStop = (payload: boolean) =>
    dispatch({
      type: ETypes.START_STOP,
      payload,
    });

  const setTiming = (payload: number) =>
    dispatch({ type: ETypes.TIMING, payload });

  const setTimingRange = (payload: string) =>
    dispatch({ type: ETypes.TIMING_RANGE, payload });

  const setChannels = (payload: number | 0) =>
    dispatch({ type: ETypes.CHANNELS, payload });

  const setChannelsData = (payload: Channels | null) =>
    dispatch({ type: ETypes.SET_CHANNEL_DATA, payload });
  return (
    <AppSettings.Provider
      value={{
        ...state,
        setMode,
        setSaveDialog,
        setLoadDialog,
        setStartStop,
        setTiming,
        setTimingRange,
        setChannels,
        setChannelsData,
        setLoadedData,
      }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dialog />
        {children}
      </ThemeProvider>
    </AppSettings.Provider>
  );
};

export default AppSettings;
