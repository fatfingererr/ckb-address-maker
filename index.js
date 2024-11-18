// Import required libraries
const fs = require('fs'); // For working with the file system
const bip39 = require('bip39'); // For generating and working with mnemonics
const { BIP32Factory } = require('bip32'); // For deriving hierarchical deterministic keys (BIP32)
const ecc = require('tiny-secp256k1'); // For elliptic curve cryptography operations
const CKB = require('@nervosnetwork/ckb-sdk-core').default; // Nervos CKB SDK for blockchain operations

// Initialize the BIP32 factory with the ECC implementation
const bip32 = BIP32Factory(ecc);

/**
 * Generates a new wallet containing a mnemonic, seed, private key, and CKB address.
 *
 * @returns {Object} An object containing:
 *   - `mnemonic`: The generated mnemonic phrase (BIP-39 standard).
 *   - `seed`: The hexadecimal representation of the seed derived from the mnemonic.
 *   - `privateKey`: The private key in hexadecimal format.
 *   - `address`: The CKB address derived from the private key.
 */
function generateWalletWithMnemonic() {
    // Generate a new mnemonic phrase using BIP-39
    const mnemonic = bip39.generateMnemonic();

    // Convert the mnemonic phrase to a seed (binary format)
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // Derive the BIP32 root key from the seed
    const root = bip32.fromSeed(seed);

    // Derive a child key following the BIP44 path for Nervos CKB
    // Path format: m / purpose' / coin_type' / account' / change / address_index
    const child = root.derivePath("m/44'/309'/0'/0/0");

    // Extract the private key from the derived child key in hexadecimal format
    const privateKey = '0x' + Buffer.from(child.privateKey).toString('hex');

    // Initialize the Nervos CKB SDK
    const ckb = new CKB();

    // Derive the CKB address from the private key
    const address = ckb.utils.privateKeyToAddress(privateKey);

    // Return the wallet information
    return {
        mnemonic,           // The mnemonic phrase
        seed: seed.toString('hex'), // The hexadecimal representation of the seed
        privateKey,         // The private key in hexadecimal format
        address             // The CKB address
    };
}

/**
 * Returns the current date and time formatted as `yyyymmdd_HHMMSS`.
 *
 * @returns {string} A string representing the current timestamp.
 */
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Concatenate components into the desired format
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

/**
 * Generates multiple wallets and saves them to a CSV file.
 *
 * @param {number} n - The number of wallets to generate.
 */
function generateWalletsToCSV(n) {
    const wallets = [];

    // Generate `n` wallets
    for (let i = 0; i < n; i++) {
        wallets.push(generateWalletWithMnemonic());
    }

    // Create a filename using the current timestamp
    const filename = `wallets_${getFormattedDate()}.csv`;

    // Define the CSV header
    const header = 'mnemonic,seed,privateKey,address\n';

    // Map wallet data into CSV rows
    const rows = wallets.map(wallet =>
        `${wallet.mnemonic},${wallet.seed},${wallet.privateKey},${wallet.address}\n`
    ).join('');

    // Write the CSV data to a file
    fs.writeFileSync(filename, header + rows, 'utf8');

    // Log the result to the console
    console.log(`Wallet addresses saved to ${filename}`);
}

// Parse the number of wallets to generate from the command-line arguments
const args = process.argv.slice(2);
const count = parseInt(args[0], 10);

// Validate the user input
if (isNaN(count) || count <= 0) {
    console.error('Please provide a valid number of wallets to generate.');
    process.exit(1);
}

// Generate the specified number of wallets and save them to a CSV file
generateWalletsToCSV(count);