import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppSettingsContext } from './context';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppSettingsContext>
    <App />
  </AppSettingsContext>
);
