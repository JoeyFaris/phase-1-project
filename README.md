# phase-1-project
Phase 1 Project

Group 3:

Christopher Babb, Joey Faris, Loren Wilks

Sudoku

We would like to present a Sudoku game, for users to interact with. The basic functionality of which would allow users to play a game of Sudoku by filling in the empty squares in a nine-block grid, each block containing nine squares with numbers. The goal would be to work with a few prefilled numbers, to complete the entire grid, while never duplicating a number in any single row, column or block.

Our users should be able to: 
Generate a new game with prepopulated default numbers to work with so users can start the game.

Clear a game using a button, so users can restart any game if they had difficulty and they want to take another swing.

Create a unique ID to return to a specific game if the user does not finish and wants to continue at another time.

Reference the amount of time each game has taken with a timer that is initiated once the game has begun, and halted when the game is completed.

Check against our API when all of the squares are full to see if their answers are correct and victory has been achieved.

The API that we will be using is the “Solve-Sudoku” API and can be found at https://rapidapi.com/sosier/api/solve-sudoku/ . It will be used to populate our numbers in the squares, for users to have a clear path to victory; after all, you can’t play a game of Sudoku that does not have numbers to play from. It will also be used in checking our user’s answers at the end of each game to ensure they are correct.

We expect difficulty in a few areas, but think mainly that saving user ID’s with their specific game might throw a wrench in our spokes. We might also have difficulty iterating through our arrays populating our game in a way that provides different challenges for users. A few extra steps will be needed, but it shouldn’t prove too difficult.

We will be meeting our projects requirements by creating our game, using front end development, in a single page, using a public API to generate data, by iterating through data to populate the gameboard for our users to interact with. We will use listeners, for users, to generate a game, clear out a game, save a game for later completion and for a timer to keep track of how long each game takes.

Extra deliverables for the user to be able to:

Choose their difficulty of the game.

Use a registration form to create a profile which would save stats, and games.

Be provided with hints, highlighting when they are making mistakes on the board, which would correspond with the level of difficulty provided.

Be notified with a popup and sound when victory is achieved.