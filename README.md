# uhttp docker setup

This repository contains the artifacts needed to deploy uHTTP using docker compose

## Requirements

- A VPS or cloud provider VM with docker and docker compose installed
- Open at least the P2P port (usually 9091) from your router( or internet gateway) to your VPS

## Setup

The `docker compose` deployment is multi-faceted allowing different combinations of tooling and extensions and different types of usage for the deployment.

- Clone this repository
- Follow the guide to run a [Hopr node](https://docs.hoprnet.org/node/start-here)
- Convert the `.env.sample` file into `.env` and override with your custome values.
- Convert the `.env-secrets.sample` file into `.env-secrets` and override all parameters with your custom values.
- Edit the file hoprd.cfg.yaml and override with the data taken from the onboarding process at https://hub.hoprnet.org
  - Set your public IP at `hopr.host.address`
  - Set your custom RPC provider at `hopr.chain.provider`
  - Set your safe address created in the onboarding process at `hopr.safe_module.safe_address`
  - Set your module address created in the onboarding process at `hopr.safe_module.module_address`
- The Hoprd identity file should be located at `./hopr.id`
- Setup the exit-app:
    - Generate the private-public key and update the `.env-secrets` file accordingly
    - Send your public key to **uhttp@hoprnet.org** and request access to the discovery platform
    - The support team will register your public key and grant you access to the discovery platform by providing you an access token which you will need to place in `.env-secrets` file.  

### Profiles

The `docker compose` setup is profile driven. Based on which profiles are activated, functionality is unlocked, whereas each profile must be activated explicitly to allow that functionality.

The supported profiles are:

- `hoprd`: runs a single hoprd node with configuration taken from config file
  - requires the `./hoprd.cfg.yaml` to be edited with relevant information
  - requires the `./hopr.id` file to be supplied inside the directory
- `admin-ui`: runs a `hopr-admin` frontend
- `exit-app`: runs an uHTTP Exit App linked to hoprd node.
- `metrics`: utilites exporting system, docker and node metrics
- `metrics-push`: a utility cronjob to publish metrics to an external prometheus push gateway
- `metrics-vis`: visualization tools for the metrics (containing the prometheus and grafana setup with default dashboards)

Profiles should be specified as a list of `,` separated values in the `COMPOSE_PROFILES` environment variable.

#### Examples

Inside the copied compose directory:

1. Run only the hopr node

```shell
COMPOSE_PROFILES=hoprd docker compose up -d
```

2. Run the `hopr-admin` and a hopr node

```shell
COMPOSE_PROFILES=hoprd,admin-ui docker compose up -d
```

Access the website: http://localhost:8080 being HOPR_ADMIN_PORT=8080
The default hoprd endpoint will be http://localhost:3001 being HOPRD_API_PORT=3001


3. Run hopr node with a full internal monitoring system (Prometheus and Grafana)

```shell
COMPOSE_PROFILES=hoprd,metrics-vis docker compose up -d
```
To acess Prometheus go to: http://localhost:9090 being PROMETHEUS_PORT=9090
To access Grafana go to: http://localhost:3030/dashboards being GRAFANA_PORT=3030.
Grafana credentials are stored in ./grafana/config.monitoring

4. Run hopr node with an external monitoring system using Prometheus pushgateway

Before running this profile, make sure that you modify the variable `METRICS_PUSH_URL` to point to your prometheus pushgateway instance and that you name your hoprd node accordingly among other nodes.

```shell
COMPOSE_PROFILES=hoprd,metrics-push docker compose up -d
```

5. Run uHTTP Exit App and its hopr node

```shell
COMPOSE_PROFILES=hoprd,exit-app docker compose up -d
```

6. Run everything

```shell
COMPOSE_PROFILES=hoprd,admin-ui,metrics,metrics-vis,exit-app docker compose up -d
```

The same list of `COMPOSE_PROFILES` should be supplied for the `docker compose down` command.


