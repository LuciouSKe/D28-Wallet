# D28Wallet - Ethereum Wallet

A modern, user-friendly Ethereum wallet built with React Native and Expo. This wallet allows users to create, import, and manage Ethereum wallets with a beautiful and intuitive interface.

## Features

- 🎨 Modern, responsive UI
- 🔐 Secure wallet creation and import
- 💰 Real-time balance tracking
- 📱 QR code generation for easy sharing
- 💸 Send and receive ETH
- 🔄 Testnet support (Goerli)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/D28Wallet.git
cd D28Wallet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Open the app:
- Press 'w' to open in web browser
- Scan QR code with Expo Go app on your phone
- Press 'a' to open in Android emulator
- Press 'i' to open in iOS simulator

## Configuration

Before using the wallet, you need to:

1. Get an Infura API key from [Infura](https://infura.io)
2. Replace `YOUR_INFURA_KEY` in `contexts/WalletContext.tsx` with your actual Infura API key

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Screenshots

[Add screenshots here]

## Security

- Private keys are stored securely using AsyncStorage
- All transactions are signed locally
- No private keys are ever transmitted to external servers

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository. 