// components/Header.tsx
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Header = () => {
  return (
    <View>
      <Text style={styles.logo}>D28 Wallet</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});
