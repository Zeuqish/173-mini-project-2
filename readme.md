# CS 173 Mini Project 2

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

## How To Use

1. The Owner (in this implementation is also the admin) and the Counterparty deposits funds.
2. Depending on the time (before or after March 30, 2023), only the Counterparty (before) or the Owner/Admin (after) may claim all the funds in the escrow.
3. Should the two parties wish to revert their deposits, the Owner/Admin must allow both parties to revert. Once that is done, both parties must agree to revert. Once that is also done, the admin may finally allow the funds to be returned to their respective owners.
