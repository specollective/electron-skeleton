import { createRoot } from 'react-dom/client';
import LandingPage from './pages/LandingPage';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<LandingPage />);