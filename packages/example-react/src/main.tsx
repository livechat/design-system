import { ThemeProvider } from '@livechat/design-system-react-components';
import { Container, createRoot } from 'react-dom/client';

import App from './App';

import '@livechat/design-system-react-components/dist/design-system-react-components.css';

const container = document.getElementById('root');
const root = createRoot(container as Container);
root.render(
  <ThemeProvider customVariables={{ '--content-basic-primary': '#ff00ff' }}>
    <App />
  </ThemeProvider>
);
