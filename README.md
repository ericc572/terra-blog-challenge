# My First Terra DApp: Message Wall!

## Introduction
This is my implementation of a Dapp Blog written with Terra Smart Contracts.
Each post will be written to the Terra blockchain, and requires some gas.

It's super simple to use! All you need to do is:

1. Connect your wallet 
2. Create a post, and sign the transaction in your wallet of choice
3. See it get written to the Message Wall!

## Demo
https://terra-dapp.vercel.app/ 

## Local Setup/Tools

I used:
- terrain 
- rustup 1.24.3

This is currently working on *both* testnet and localTerra (running the nodes locally!)


## Notes/Learnings

This was super exciting and engaging to work on! Thanks to everyone who contributed to the docs, and the tooling here.

Here are some notes on my design/implementation, and also general observations along the way:

- Rust: Found it to be a steep learning curve in the beginning, but eventually got used to it. It reminds me of C++ and I ran into some memory issues with copying vs cloning the String values, but it sorted out! 
I actually grew fond of the helpful errors thrown at compile time, when turning the .rs files in the deploy step to bytecode wasm. 

- Tooling/Process: 
    - bash/general: Needed to source bash multiple times after installing the tools following the initial setup [here](https://docs.terra.money/docs/develop/dapp/quick-start/initial-setup.html). Great callouts to error messages that happen, but should remind people to `source ~/.zshrc` or restart Terminal! Especially newbies.
    - terrad: Docs were extensive, and really good but it was a little hard to know to navigate [here](https://docs.terra.money/docs/develop/how-to/terrad/install-terrad.html), and setting up Go binaries on a new machine is always fun :P
    - LocalTerra: Was relatively easy to get set up, but a callout to non-native Docker frens is to start the daemon! I know it's mentioned but maybe highlighting it more, especially since the error wasn't clear.
    - Testnet: Ran into the account sequence mismatch quite a bit. I then figured out this was related to the `config.terrain.json`, so calling that out would've been helpful too!


- I based the smart contract architecture off the initial counter implementation. Instead of having a count though, a user is able to submit a Post with a title and text body. Then in the front end, they'll see the posts rendered in the wall. This isn't persistent though, as I don't store state and disappears when the user refreshes the browser. 

I think if I were to design it better, I'd have something like this:

```
pub struct PostFeed { 
 struct Post
}
```

to nests posts underneath a parent Feed struct.

- Testing: Didn't have a chance but understand the severity/importance of doing so!