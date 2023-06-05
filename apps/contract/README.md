# Contract

## Deploy Mewo contract

Locate yourself in the `/apps/contract` directory.

```sh
source .env; \
forge create \
    --private-key $PRIVATE_KEY \
    --verify \
    src/Mewo.sol:Mewo
```

## Deploy Faucet contract

Locate yourself in the `/apps/contract` directory. Get the Mewo contract address from above.

```sh
source .env; \
MEWO_CONTRACT_ADDRESS=[ENTER_ADDRESS_HERE];
forge create \
    --private-key $PRIVATE_KEY \
    --verify \
    src/Faucet.sol:Faucet \
    --constructor-args $MEWO_CONTRACT_ADDRESS
```

## Configure faucet

Make a write request `addFaucet` to the Mewo contract with the Faucet address.