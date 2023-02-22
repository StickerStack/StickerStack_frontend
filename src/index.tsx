import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/App/App';

import './index.scss';
import './vendor/normalize.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
