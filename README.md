# uhttp docker setup

This repository contains the artifacts needed to deploy uHTTP using docker compose

## Requirements

- A VPS or cloud provider VM with docker and docker compose installed
- Open at least the P2P port (usually 9091) from your router( or internet gateway) to your VPS

## Setup hoprd node

Execute the following commands:

```
wget -O hoprd-node.zip https://github.com/hoprnet/hoprnet/archive/refs/heads/master.zip
unzip hoprd-node.zip "hoprnet-*/deploy/*" -d hoprd-node
mv hoprd-node/hoprnet-*/deploy/compose/{*,.*} hoprd-node
rm -rf hoprd-node.zip hoprd-node/hoprnet-*
```

Follow the instructions on how to setup a [hoprd node](./hoprd-node/README.md). Keep in mind to execute the commands mentioned in that guide within the `hoprd-node` folder.

## Setup exit-app

- Copy the `.env.sample` file into `.env` and override with your custome values.
- Follow instructions at [exit-app-create-keypair](./exit-app-create-keypair/README.md) to generate private-public key pair.
- Copy the `.env-secrets.sample` file into `.env-secrets` and override all parameters with your custom values and generated key pair.
- Send your public key to **uhttp@hoprnet.org** and request access to the discovery platform
- The support team will register your public key and grant you access to the discovery platform by providing you an access token which you will need to place in `.env-secrets` file.

### Profiles

The `docker compose` setup is profile driven. Based on which profiles are activated, functionality is unlocked, whereas each profile must be activated explicitly to allow that functionality.

The supported profiles are:

- `exit-app`: runs an uHTTP Exit App linked to hoprd node.

Profiles should be specified as a list of `,` separated values in the `COMPOSE_PROFILES` environment variable.

#### Examples

1. Run uHTTP Exit App and its hopr node

```shell
COMPOSE_PROFILES=exit-app docker compose up -d
```

The same list of `COMPOSE_PROFILES` should be supplied for the `docker compose down` command.
