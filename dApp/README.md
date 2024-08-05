# Voting dApp

This is a simple decentralized voting application built with Cartesi rollups. You can create a poll, along with the question and options, various people can cast their votes and finally, the result of the poll can be viewed.

## About

The voting dApp allows users to create polls, cast votes, and view poll results in a decentralized and secure manner.

## Getting Started

Below you'll find instructions on how setting up this dapp locally.

### Prerequisites

Here are some packages you need to have installed on your PC:

* [nodejs](https://nodejs.org/en), [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

* [docker](https://docs.docker.com/get-docker/)

* [cartesi-cli](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)

  ```sh
  npm install -g @cartesi/cli
  ```

### Installation

1. Clone this repo
   ```sh
   git clone https://github.com/GideonBature/voting-dapp.git
   ```
2. Change directory
   ```sh
   cd dApp
   ```
3. Install NPM packages
   ```sh
   yarn install
   ```
4. Build and run the dapp via `cartesi-cli`
   ```sh
   cartesi build
   ```
   and
   ```sh
   cartesi run
   ```
## Usage

Here you can access the examples of dapp communication and resources consume.

There are these resources available on this dapp:

### Advanced handlers
* #### createPoll
  ```js
    description — create a poll.
    param data — {creator: address ("0x..."), question: string, options: [string]}
  ```
  data sample
  ```json
    {
        "action":"createPoll",
        "data":{
            "creator":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "question":"Which programming language should be learned first?",
            "options":["JavaScript", "Python", "C++", "Java"]
        }
    }
  ```
  hex sample
  
  ```
  0x7b22616374696f6e223a22637265617465506f6c6c222c202264617461223a7b2263726561746f72223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c20227175657374696f6e223a2257686963682070726f6772616d6d696e67206c616e67756167652073686f756c64206265206c6561726e65642066697273743f222c20226f7074696f6e73223a5b224a617661536372697074222c2022507974686f6e222c2022432b2b222c20224a617661225d7d7d
  ```
  interact
    - *via `cartesi cli`*, access your terminal in another window and input these instructions below:

    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a22637265617465506f6c6c222c202264617461223a7b2263726561746f72223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c20227175657374696f6e223a2257686963682070726f6772616d6d696e67206c616e67756167652073686f756c64206265206c6561726e65642066697273743f222c20226f7074696f6e73223a5b224a617661536372697074222c2022507974686f6e222c2022432b2b222c20224a617661225d7d7d
    ```
    - *via `cast`*, access your terminal in another window and input this single line instruction below:

    ```sh
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0x7b22616374696f6e223a22637265617465506f6c6c222c202264617461223a7b2263726561746f72223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c20227175657374696f6e223a2257686963682070726f6772616d6d696e67206c616e67756167652073686f756c64206265206c6561726e65642066697273743f222c20226f7074696f6e73223a5b224a617661536372697074222c2022507974686f6e222c2022432b2b222c20224a617661225d7d7d --mnemonic 'test test test test test test test test test test test junk'
    ```

* #### castVote
  ```js
    description — add a vote to the poll.
    param required — {pollId: UUID, voterId: address ("0x..."), option: string}
    param not required — {createdAt: timestamp, question: string}
  ```
  data sample
  ```json
    {
        "action": "castVote",
        "data": {
            "pollId": "c8c7030e-144b-4164-af37-1d46bdcaea55",
            "voterId": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb884842",
            "option": "C++"
        }
    }
  ```
  hex sample
  ``` 
  0x7b22616374696f6e223a202263617374566f7465222c202264617461223a207b22706f6c6c4964223a202263386337303330652d313434622d343136342d616633372d316434366264636165613535222c2022766f7465724964223a202230786633394664366535316161643838463646346365366142383832373237396366664662383834383432222c20226f7074696f6e223a2022432b2b227d7d
  ```
  interact
    - *via `cartesi cli`*, access your terminal in another window and input these instructions below:

    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a202263617374566f7465222c202264617461223a207b22706f6c6c4964223a202263386337303330652d313434622d343136342d616633372d316434366264636165613535222c2022766f7465724964223a202230786633394664366535316161643838463646346365366142383832373237396366664662383834383432222c20226f7074696f6e223a2022432b2b227d7d
    ```
    - *via `cast`*, access your terminal in another window and input this single line instruction below:

    ```sh
    cast send 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb884842 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b22616374696f6e223a202263617374566f7465222c202264617461223a207b22706f6c6c4964223a202263386337303330652d313434622d343136342d616633372d316434366264636165613535222c2022766f7465724964223a202230786633394664366535316161643838463646346365366142383832373237396366664662383834383432222c20226f7074696f6e223a2022432b2b227d7d --mnemonic 'test test test test test test test test test test test junk'
    ```

### Inspect handlers 
* #### getAllPolls
  ```js
    description — get all polls.
  ```
  returned hex sample
  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        "processed_input_count": 1
    }
  ```
  converted payload sample
  ```json 
    [
      {
        "id":"d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5",
        "creator":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "createdAt":8046,
        "question":"Which programming language should be learned first?",
        "options":["JavaScript","Python","C++","Java"],
        "votes":[["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb884842","C++"]]
      }
    ]

  ```
  interact
    - access the cartesi inspect endpoint on your browser
  ```sh 
  http://localhost:8080/inspect/getAllPolls
  ```
* #### getPollById
  ```js
    description — get a poll by given id.
    param data — shelf id (UUID)
  ```
  returned hex sample
  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        "processed_input_count": 1
    }
  ```
  converted payload sample
  ```json 
    {
        {
        "id":"d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5",
        "creator":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "createdAt":8046,
        "question":"Which programming language should be learned first?",
        "options":["JavaScript","Python","C++","Java"],
        "votes":[["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb884842","C++"]]
      }
    }
  ```
  interact
    - access the cartesi inspect endpoint on your browser
  ```sh 
  http://localhost:8080/inspect/getPollById/$pollId
  ```

## Contributing
We welcome contributions from the community! If you'd like to contribute to Bshelf, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with descriptive commit messages.
- Push your changes to your forked repository.
- Submit a pull request to the main repository.
- Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
Bshelf is released under the MIT License.

## Acknowledgments
Voting dApp is built on top of the Cartesi platform and utilizes various open-source libraries and tools. I would like to express my gratitude to the developers and contributors of the cartesi rollups and open-source projects.
