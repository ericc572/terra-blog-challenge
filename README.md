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

This was a fun and engaging project. Thanks to everyone who contributed here!

Here are some notes on my design/implementation, and also general observations along the way.

- Class Hierarchy/OOD: I don't like huge Ruby classes with over 150+ lines of code. For this reason, I thought it made sense to split out the logic/state (winning/game_over/draw, etc) of the *Board* into its own class, and have a *TicTacToe* class responsible for executing turns/switching players.
- I used a single array for the implementation of the Board. This is because Ruby _technically_ doesn't really have good support for 2-D arrays, but I could've also used a Hash of arrays of rows as well. This made the display_board method a little lengthier to implement, but had its own advantages in calculating_winning_combinations and move methods.
- Winning Combinations - It was a fun, interesting challenge to think about how we could generalize winning combinations for a n x n grid. I came up with the following:


  - Rows: split total board array by n, and grab each.

    i.e: n = 3; [0..15]/4 => [0, 1, 2, 3], [4, 5, 6, 7] ...
  - Columns: Transpose all the rows
  - Diagonals: For each row, grab every other index from the beginning, and from the end.

  This is all memoized for performance - if we have a 20x20, we don't want to be calculating the winning combinations on EVERY single turneither.

- Testing: I used Rspec in favor of Minitest because it's explicit about the failures and gives very verbose output. board_spec.rb tests the board implementation and that its helper methods change the behavior of the board as it intends. tic_tac_toe_spec.rb can be thought more of as an integration test, and checks conditions/edge cases of playing the game, ties, and wins.