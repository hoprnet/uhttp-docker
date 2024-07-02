#!/usr/bin/env node
const { Wallet, SigningKey } = require("ethers");

console.log("generating random private public key pair");
const wallet = Wallet.createRandom();
const compressedPubkey = SigningKey.computePublicKey(wallet.publicKey, true);
const output = {
  UHTTP_EA_PRIVATE_KEY: wallet.privateKey,
  UHTTP_EA_PUBLIC_KEY: compressedPubkey,
};
console.log(JSON.stringify(output));
