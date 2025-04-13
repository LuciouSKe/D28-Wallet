// App.tsx
import React from 'react';
import { WalletProvider } from './contexts/WalletContext';
import { WalletScreen } from './screens/WalletScreen';

export default function App() {
  return (
    <WalletProvider>
      <WalletScreen />
    </WalletProvider>
  );
}
