import { useContext } from 'react';
import AppSettingsContext from '../context';

export const useAppHooks = () => useContext(AppSettingsContext);
