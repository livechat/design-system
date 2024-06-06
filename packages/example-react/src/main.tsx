import { Container, createRoot } from 'react-dom/client';

import App from './App';

import '@livechat/design-system-react-components/dist/style.css';

const container = document.getElementById('root');
const root = createRoot(container as Container);
root.render(<App />);
