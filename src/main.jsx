import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppToaster } from './components/ui/AppToaster.jsx'
import { SettingsProvider } from './context/SettingContext.jsx'

try {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark')
  }
} catch {}

const queryClient = new QueryClient();

async function enableMocking() {
  if (!import.meta.env.DEV) return;
  if (import.meta.env.VITE_USE_MOCKS !== "true") return;
  const { worker } = await import('./mocks/browser.js');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

try {
  await enableMocking()
} catch (err) {
  console.error('Failed to start MSW:', err)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <App />
        <AppToaster />
      </SettingsProvider>
    </QueryClientProvider>
  </StrictMode>
)