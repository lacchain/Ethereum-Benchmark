# TRANSACTIONS PER SECOND RATE TEST IN BESU NETWORK

## PURPOSE

<p>Determine how much transactions can be stored on each block
</p>
<p> Establish limitations of Hyperledger Besu when it is exposed to a stress test.</p>


## Preliminary concepts

1. Gas
2. Data with transactions
3. Block Period Seconds
4. Gas Limit

## TERMINOLOGY

1. Stimulus: Transactions that are sent to a node in a period of time at some rate(transactions per second) and each transaction containing a certain amount of gas.
2. Source: The node which sends the stimulus to some node in a Besu network.
3. Response: The receipts that are sent back to the source; in this test the time that each response takes to be done and how much receipts are sent from the tested node will be measured.

## REQUIREMENTS

* You must have docker and docker-compose installed on the machine you want to run the program.

## HOW TO USE

* Clone the repository
* Enter into the folder ethereum-node-benchmark/server
* run npm install
* Create the folder logs into the server folder:

    ```shell
    mkdir logs
    ```

* Located in the root folder open **docker-compose.yml**; there you will have the posibility to SET the following enviroment variables:

    ```shell
      - TEST_TYPE=1 # 0: ether sending test, 1: smart contract test
      - SMART_CONTRACT_OPTION=1 #0: lightweigth Smart Contract test (33314 gas/tx), 1: Heavy contract test (213890 gas/tx), 2: Falcon Signature test (64100 gas/tx), 3: Relat PQ Meta Tx
      - DESIRED_RATE_TX=1 #Rate in tx/s
      - TEST_TIME_MINUTES=0.1 #choose the time
      - RPC_URL=http://RPC_URL:PORT
      - MAX_GAS_PER_TX=1000000
      - NUMBER_OF_CONTAINERS=1
      - STORE_DATA=TRUE
    ############ SETTING FOR ETHER TESTING (IF REQUIRED) ##############      
      - AMOUNT_DATA_BYTES=0 #only set this value if you choose TEST_TYPE=0
    ############ SETTING FOR SMART CONTRACT TESTING ##############
      #- SMART_CONTRACT_ADDRESS=0x8eC60639166f38Fb1455f77F956761Bc9c14FD6b # DO NOT COPY PASTE - to avoid deploying a contract again
    ```
    
    Where: 
    1. TEST_TYPE=<0,1> : If you choose "0" then only ether send transactions will be simulated. Otherwise if you choose 1 then you should also configure the type of smart contract to send (indicated in the next step)
    1. SMART_CONTRACT_OPTION=<0,1>: If you choose 0 then a new contract with a setter method that consumes 33314 gas/tx will be deployed. Otherwise if you choose "1" then a more complex contract is deployed, in that contract a method that consumes 213890 gas/tx will be used for the subsequent test.
    1. DESIRED_RATE_TX : Is the rate at which pantheon node will receive transactions in a period of one second.
    1. AMOUNT_DATA_BYTES : Is The amount of bytes to add on each transaction.
    1. TEST_TIME_MINUTES :  Is the period of time, in minutes, at which Pantheon will be exposed to a bunch of transactions sent from this code when it is running.
    1. RPC_URL : the rpc url that point to the pantheon node to test
    1. MAX_GAS_PER_TX is the maximum amount of allowed gas per transaction; in our case it is set to 1 million gas, because for our configuration it is the maximum allowed per transaction; beyond that point the transactions are put in a queue and starts consuming ram. It is worth to say to not touch this value during this test.
    1. NUMBER_OF_CONTAINERS is the number of containers you have configured on this docker-compose file.
    1. STORE_DATA : Only set to true on the first container; in te rest of copies set to false.

    Be mindful that you can run as many containers as you want; and also on each of those; you can customize
    different RPC URLs.

    Note: This project is created whith the assumption that all containers runs with the same rate(DESIRED_RATE_TX).

    If you want to simulate data(AMOUNT_DATA>0) for a long time,then it is recommended to run a test for one minute verifying that the amount of data is not too big that takes the stimulus be done in more than a minute; if so, you can reduce the amount of data(bytes) to be sent per transaction on each container and increment the number of containers in such way you reach the your desired rate.

* Now you are ready to run the project by using:

    ```shell
    docker-compose up --build
    ```

* After tests have finished the results will be created at server/logs directory; it can be used to plot a graph with that data.

## Results

Find an article about conclusions <a href="https://medium.com/everis-blockchain/key-considerations-when-configuring-private-ethereum-networks-15c63f50f23a">here</a>

## Copyright 2020 LACChain

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
