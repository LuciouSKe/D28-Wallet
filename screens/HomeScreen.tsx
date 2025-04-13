// screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import WalletCard from '../components/WalletCard';
import ActionButtons from '../components/ActionButtons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <WalletCard />
      <ActionButtons />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
});
