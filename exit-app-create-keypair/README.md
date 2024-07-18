# Setup

This uses [ethers](https://docs.ethers.org/v6/) to generate a private-public key pair for the uHTTP exit application.

## Generation

* Nix users can simply run: `$ nix-shell --run 'yarn && ./generate.js'` to generate a private-public key pair.
* Others need to have Node.js installed and run `$ yarn && ./generate.js` or `$ yarn; node ./generate.js` to create a new private-public key pair.
