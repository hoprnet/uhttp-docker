# Setup

This uses [ethers](https://docs.ethers.org/v6/) to generate a public private key pair for uHTTP exit application.

## Generation

* Nix users can simply run: `$ nix-shell --run ./generate.js` to generate a public private key pair.
* Others need to have nodejs installed and run `$ ./generate.js` or `$ node ./generate.js` to create a new public private key pair.
