How much gas do we use for each transaction when we call a contract function ?
--> depens on the lenght of code

Why can't we have more than 7 params in a function ? 
--> it's a solidity restriction

Why it return transaction: out of gas ?

How do I access solidity code from a contract address ? (see example with EOS)

In solidity we can't return an array, only tuples
Right now, we can only return tuples string and number

to optimize its better to break up the require into individual to avoid user spendgin too much gas. For example notes params will go first because it's likely to have more than 50 characters than email or name.

using require consume less gas than if

everytime we migrate truffle it does create a new contract on the blockchain

when declaring variable, it's better to group variable by type to save gas : string first, then uint...

Are we using mapping because if we use array it's less efficient ?

You can't return a struct

memory vs storage
storage does update variable/state
memory does read state
---> you use it for mapping and struct

what are the solution if you update a contract ? You create a new one, copy all the data from the previous one. But how do you update the address for users ? 
--> For example, you can have a state of the contract to know if it's active or not
Can you have specific address (admin) who call specific function ?
--> Yes, you can have function who could be invoked by the creator of the contract for example

You can use PGG to encrypt the data on the blockchain if you don't want to have sensitive data on blockchain

You can't have a fully decentralised application because the hosting of the interface will not be decentralised (yet). You have solution like IPFS but it will not store your html files.