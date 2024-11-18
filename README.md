# CKB Address Maker

A lightweight and efficient tool designed for bulk generation of CKB wallet addresses.

## Features

This project is a command-line tool to generate Nervos CKB wallets. It supports generating wallets using the BIP-39 mnemonic standard and the BIP-32 hierarchical deterministic key derivation method. Wallets are saved in a CSV file with fields for mnemonic, seed, private key, and CKB address.

- **BIP-39 Mnemonic Support**: Generate a secure 12-word mnemonic phrase.
- **BIP-32 Key Derivation**: Use hierarchical deterministic key derivation with the BIP-44 path for Nervos CKB (`m/44'/309'/0'/0/0`).
- **CSV Export**: Save wallets to a timestamped CSV file.
- **Command-Line Interface**: Specify the number of wallets to generate via CLI.

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js**: Version 14 or higher
- **npm**: Comes with Node.js installation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fatfingererr/ckb-address-maker.git
   cd ckb-address-maker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Command-Line Execution

1. Run the tool to generate wallets:
   ```bash
   npm run start -- <number_of_wallets>
   ```

   Replace `<number_of_wallets>` with the number of wallets you want to generate. For example:
   ```bash
   npm run start -- 5
   ```
   This will generate 5 wallets and save them to a CSV file named `wallets_yyyymmdd_HHMMSS.csv`.

2. Open the generated CSV file to view the wallet information.

```text
mnemonic,seed,privateKey,address
grant short ... minimum release, e3138681....947d5d4a, 0x72b.....0b27a, ckb1qyqq....taqkh
fury elephant ... seat melody,   8fb49c7....115d8,     0xe62...80d5a7,  ckb1qyqr...c0ah3
```

### Example Output

Command:
```bash
npm run start -- 5
```

Console Output:
```
Wallet addresses saved to wallets_20241118_153045.csv
```

Generated CSV (`wallets_20241118_153045.csv`):
```csv
mnemonic,seed,privateKey,address
"grunt drama cute ...", "3bcce6f...", "0x6ed98a7...", "ckb1qyq..."
"vault ladder brisk ...", "8ae93fa...", "0xf2cd89c...", "ckb1qyq..."
...
```
## Code Overview

### Key Functions

#### `generateWalletWithMnemonic()`

Generates a single wallet and returns an object containing:
- `mnemonic`: A 12-word mnemonic phrase.
- `seed`: The seed derived from the mnemonic (hexadecimal format).
- `privateKey`: The private key derived using the BIP-32 method (hexadecimal format).
- `address`: The CKB address derived from the private key.

#### `getFormattedDate()`

Returns the current date and time formatted as `yyyymmdd_HHMMSS`. Used for naming the CSV file.

#### `generateWalletsToCSV(n)`

Generates `n` wallets and saves them to a CSV file with the following fields:
- `mnemonic`
- `seed`
- `privateKey`
- `address`

### File Structure

```plaintext
.
├── generateWallets.js   # Main script to generate wallets and export to CSV
├── package.json         # npm configuration file
└── node_modules/        # Installed dependencies
```

### Dependencies

This project relies on the following libraries:

| Dependency                                                                 | Purpose                                                  |
|----------------------------------------------------------------------------|----------------------------------------------------------|
| [bip39](https://github.com/bitcoinjs/bip39)                                | For generating mnemonics and converting them to seeds.   |
| [bip32](https://github.com/bitcoinjs/bip32)                                | For hierarchical deterministic key derivation (BIP-32).  |
| [tiny-secp256k1](https://github.com/bitcoinjs/tiny-secp256k1)              | ECC operations for key management.                       |
| [@nervosnetwork/ckb-sdk-core](https://github.com/nervosnetwork/ckb-sdk-js) | Nervos SDK for deriving CKB addresses from private keys. |

### Configuration

The wallet derivation follows the **BIP-44 standard** and uses the path for Nervos CKB:
```
m / 44' / 309' / 0' / 0 / 0
```
This is the recommended path for Nervos blockchain wallets.

## Development

### Enhancements

The following features can be added to improve the tool:
- **Encryption**: Encrypt the private keys in the CSV file for security.
- **Custom Derivation Path**: Allow users to specify a custom derivation path.
- **Address Verification**: Validate addresses using Nervos blockchain.

### Testing

To test the wallet generation process, you can manually verify:
1. The mnemonic can be restored using BIP-39 tools.
2. The address is valid on the Nervos CKB blockchain.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, open an issue first to discuss your ideas.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [BitcoinJS](https://github.com/bitcoinjs) for their excellent libraries.
- [Nervos](https://github.com/nervosnetwork) for the CKB SDK.
- The broader blockchain development community for inspiration and support.