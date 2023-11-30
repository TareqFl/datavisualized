import { ReactNode } from 'react';
import { Channels } from '../utils/types';
export interface InitialState {
  mode: 'light' | 'dark';
  saveDialog: boolean;
  loadDialog: boolean;
  startStop: boolean;
  timing: number;
  timingRange: string;
  channels: number | 0;
  channelsData: Channels | null;
  loadedData: Channels | null;
  setLoadedData: (value: Channels | null) => void;
  setChannelsData: (value: Channels | null) => void;
  setMode: (value: 'dark' | 'light') => void;
  setSaveDialog: (value: boolean) => void;
  setLoadDialog: (value: boolean) => void;
  setStartStop: (value: boolean) => void;
  setTiming: (value: number) => void;
  setTimingRange: (value: string) => void;
  setChannels: (value: number | 0) => void;
}

export interface Payload {
  type: ETypes;
  payload: any;
}

export enum ETypes {
  MODE = 'MODE',
  SAVE_DIALOG = 'SAVE_DIALOG',
  LOAD_DIALOG = 'LOAD_DIALOG',
  START_STOP = 'START_STOP',
  TIMING = 'TIMING',
  TIMING_RANGE = 'TIMING_RANGE',
  CHANNELS = 'CHANNELS',
  SET_CHANNEL_DATA = 'SET_CHANNEL_DATA',
  SET_LOAD_CHANNEL_DATA = 'SET_LOAD_CHANNEL_DATA',
}

export interface Props {
  children: ReactNode;
}
