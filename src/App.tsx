import React from 'react';
import { BotaniDashboard } from './components/BotaniDashboard';
import { LanguageProvider } from './context/LanguageContext';

export function App() {
  return (
    <LanguageProvider>
      <BotaniDashboard />
    </LanguageProvider>
  );
}

export default App;
