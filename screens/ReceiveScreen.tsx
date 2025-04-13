import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { getOrCreateWallet } from '../utils/wallet';

const ReceiveScreen = () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const loadAddress = async () => {
      const wallet = await getOrCreateWallet();
      setAddress(wallet.address);
    };

    loadAddress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wallet Address</Text>
      {address ? <QRCode value={address} size={200} /> : null}
      <Text style={styles.address}>{address}</Text>
    </View>
  );
};

export default ReceiveScreen;
