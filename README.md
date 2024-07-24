# uHTTP exit gateway

This repository contains the artifacts needed to deploy uHTTP alongside hoprd and hopr-admin using docker compose.

## Requirements

- A VPS or cloud provider VM with docker and docker compose installed
- Open at least the P2P port (usually 9091) from your router( or internet gateway) to your VPS

## Prepare hoprd

Follow the [onboarding guide](https://docs.hoprnet.org/node/start-here) to get a Safe and register the node in the network.

## Prepare exit-app

Follow the instructions at [exit-app-create-keypair](./exit-app-create-keypair/README.md) to generate a private-public key pair.

## Setup docker compose

- Copy the `.env.sample` file into `.env` and override with your custom values.
- Copy the `.env-secrets.sample` file into `.env-secrets` and override all parameters with your custom values and generated key pair.
- Send your public key to <uhttp@hoprnet.org> and request access to the discovery platform.
- The support team will register your public key and grant you access to the discovery platform by providing you an access token, which you will need to place in the `.env-secrets` file.

## Run docker compose

Run uHTTP exit gateway (hoprd, exit-app, hopr-admin) like this:

```sh
docker compose up -d
```
