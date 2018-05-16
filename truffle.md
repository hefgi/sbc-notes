# Initialisation

## Default 

Will use the Metacoin box : http://truffleframework.com/boxes/metacoin

`truffle init`

## Boxes 

A box is a boilerplate and example applications. 
You can initiate a project with any kind of boxes : http://truffleframework.com/boxes

`truffle unbox <box-name>`

A nice box is the tutorialtoken http://truffleframework.com/boxes/tutorialtoken which use OpenZepplin (open source framework to build secure smart contract in solidity)


# Structure

Once completed, you'll now have a project structure with the following items:

- `contracts/`: Directory for Solidity contracts
- `migrations/`: Directory for scriptable deployment files
- `test/`: Directory for test files for testing your application and contracts
- `truffle.js`: Truffle configuration file

# Compile 

Compile will compile solidity smart-contract

```truffle compile```

# Migrate 

## Command 
Migrate will deploy the solidity smart contract.

```truffle migrate --reset```

or to migrate to a specific network define in `truffle.js`

```truffle migrate --network dev```

## Files
### Naming
The numbered prefix is required in order to record whether the migration ran successfully. The suffix is purely for human readability and comprehension.

# Network - Ethereum Client

Here's a list of solution to run a ethereum node (local, private or live).
You can tell truffle to switch network, edit the `truffle.js` and then run `truffle migrate --network dev`

## Local (on your machine)

### Ganache

It's a GUI. Runs on `http://127.0.0.1:7545`
http://truffleframework.com/ganache/

### Ganache CLI

Instead of the GUI, you can use CLI. 
https://github.com/trufflesuite/ganache-cli/

Notes : `ethereum-testRPC` have been renamed `ganacche-cli`. It could be really confusing since a lot of documentation, guides or links found on the internet reffer to testRPC. Source : https://github.com/trufflesuite/ganache-cli/issues/432

#### Installation 
```sudo npm install -g ganache-cli```

#### Run
```ganache-cli -p 7545```

It will run on `http://127.0.0.1:7545`

Even better to specify a mnemonic phrase, like that, there's no need c/c in metamask :

```ganache-cli -p 7545 -m "enter snack service song clump clown chronic favorite dizzy robot exclude digital"```

### Truffle Develop

Really similar to ganache but you can't configure that much. Runs on `http://127.0.0.1:9545`

```truffle develop```

It open a console and you can type directly the action without `truffle` prefix.
For example, instead of typing `truffle compile`, you need to only type `compile`.

## Live 
??

### Geth

## Private

??





