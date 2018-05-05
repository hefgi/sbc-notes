bitcoin is not turing complete

does eth smart contract are limited because of gas ? probably yes ?

full node is a copy of the blockchain

a wallet run by a client is not a full node. but its a node.

(need to check diff full node vs wallet)

do not paste HTTP into metamask for custom RPC

so blockchain is like a database where we can store everything.

multiple open source project for blockchain : https://www.hyperledger.org/ its an other type of blockchain, competitors to ETH.

# Solidity 

public
	- you can access it inside the contract, outside the contract, if you extend the contract with another contract then you can access those public variable/functions
	- automatically create a getter for a public variable

private 
	- you can only access the function or variable inside the contract, not outside

internal
	- you can only access the function or variable inside the contract OR a contract that extends that contracts, not outside

external 
	- you can only accesss the function or variable outside the contract

# Remix

https://remix.ethereum.org/

We can compile
We can deploy
We can export data from smart contract like ABI.
On example, we can insert ABI and contract address into index.html to load data from smartcontract.

What does ABI standfor ? application binary interface
What are all the datas while you click detail of a smart contract ? (where we access ABI)