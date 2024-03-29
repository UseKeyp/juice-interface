# Development

## Quick Links

- [Internationalization](internationalization.md)
- [DevOps](devops.md)
- [Codebase architecture](architecture/)

## Installation

1. Create a [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) of this repository.
1. Clone your fork and navigate to the root directory.
1. Install project dependencies.

   ```bash
   yarn install
   ```

1. Create a `.env` file in the root directory which mirrors the `.example.env` file. Learn how to define each field in the `.env` file in [Setup](#setup).

## Setup

`juicebox-interface` relies on a number of services for development. Create an account for each of the following services:

- [Infura](https://infura.io)
- [Piñata](https://pinata.cloud)

The following sections describe how to set up each service for local development.

### Infura

Juicebox uses [Infura](https://infura.io) to connect to an Ethereum network (mainnet, or one of the testnets).

Take the following steps to create an Infura project for local development:

1. Select **Create New Key** to begin creating a new Infura project.
1. Select the **Web 3 API** option from the **Network** dropdown.
1. Enter a **Name** (for example, `juicebox-local`).
1. Select **Create** to create the project.

Next, copy the following fields into your `.env` file:

- **Project ID**. In the `.env` file, copy the **Project ID** into the `NEXT_PUBLIC_INFURA_ID` variable.
- **Endpoint**. This is the Ethereum network that will be used for testing. If you don't know which endpoint to use, select **mainnet**. In the `.env` file, copy the network name (e.g. 'mainnet', not the url) into the `NEXT_PUBLIC_INFURA_NETWORK` variable.

#### Infura IPFS gateway

1. Select **Create new key** to begin creating a new Infura project.
1. Select **IPFS** from the **NETWORK** dropdown.
1. Enter a **Name** (for example, `juicebox-ipfs-local`).
1. Select **Create** to create the project.

Next, copy the following fields into your `.env` file:

- **PROJECT ID**. In the `.env` file, copy the **Project ID** into the `INFURA_IPFS_PROJECT_ID` variable.
- **API KEY SECRET**. In the `.env` file, copy the **API KEY SECRET** into the `INFURA_IPFS_API_SECRET` variable.
- **DEDICATED GATEWAY SUBDOMAIN**. In the `.env` file, copy the **DEDICATED GATEWAY SUBDOMAIN** into the `NEXT_PUBLIC_INFURA_IPFS_HOSTNAME` variable *without the `https://` prefix*.

### Piñata

Juicebox uses [Piñata](https://pinata.cloud) to store project metadata. Juicebox projects set a name, description, logo, and other details when creating the project. These details are saved on IPFS as a JSON file using Piñata, and the CID gets stored on-chain with the Juicebox project.

Take the following steps to set up Piñata for local development:

1. Create a Piñata API key ([learn more](https://docs.pinata.cloud/#your-api-keys)).
   - Enable the **Admin** toggle in the **Admin** field.
1. Copy the following fields into your `.env` file:
   - **API Key**. In the `.env` file, copy the **API Key** into the `PINATA_PINNER_KEY` variable.
   - **API Secret**. In the `.env` file, copy the **API Secret** into the `PINATA_PINNER_SECRET` variable.

Note: Once you pass Piñata's free tier of 1GB of storage, you'll need to get access to the premium `PINATA_PINNER_KEY` and `PINATA_PINNER_SECRET` keys. Contact the Peel team in Discord to get access. Piñata will constantly give a 429 error if the free tier of API requests has been reached.

### The Graph

Juicebox uses [The Graph](https://thegraph.com) to query the Ethereum network using a GraphQL API.

Take the following steps to set up Juicebox's subgraph for local development:

1. Join [Peel's discord server](https://discord.gg/akpxJZ5HKR).
2. Inquire about mainnet and Goerli subgraph URLs in the [`#dev` channel](https://discord.com/channels/939317843059679252/939705688563810304).
3. Copy the URL into the `NEXT_PUBLIC_SUBGRAPH_URL` variable of the `.env` file.

## Usage

1. Run the app in dev mode

   ```bash
   yarn dev
   ```

2. Build a production build

   ```bash
   yarn build
   ```

3. Run a production build locally

   ```bash
   yarn build
   yarn start
   ```

## Transaction simulation

In development, you can simulate transactions using [Tenderly](https://tenderly.co/). Tenderly produces a stacktrace that you can use to debug failing transactions.

Set up Tenderly for your development environment using the following steps:

1. Create a Tenderly account
2. Set the following variables in your `.env` file (**without the comments**):

   ```
   # .env
   NEXT_PUBLIC_TENDERLY_API_KEY= # your user tenderly api key
   NEXT_PUBLIC_TENDERLY_PROJECT_NAME= # your tenderly project
   NEXT_PUBLIC_TENDERLY_ACCOUNT=  # your user account name
   ```

3. Start your development server.

   ```bash
   yarn dev
   ```

Once set up, every transaction that you submit will be simulated using Tenderly.

When a simulation fails, an error is logged to the development console. This log contains a link to the simulation in Tenderly.

> Note: there is a 50 simulation per month limit per account.