## TRANSACTIONS PER SECOND RATE TEST IN PANTHEON NETWORK ##
### PURPOSE ###
<p>This code is aimed to measure how pantheon behaves when a stimulus(a bunch of transactions) are sent, in different time intervals, to a Blockchain Pantheon node.
</p>
<p>To achieve this goal a testing network of two nodes where configured with the following configuration (similar configuration to Lacchain) :</p>

1. 4 vCPUs, 15 GB memory

2. Transaction details: 
Transactions are sent in an environment of zero ether and non additional data.


3. Genesis details:
```shell
{
    "config" : {
            "chainId" : 2018,
            "constantinoplefixblock" : 0,
            "ibft2" : {
            "blockperiodseconds" : 2,
            "epochlength" : 30000,
            "requesttimeoutseconds" : 4
            }
    },
    "nonce" : "0x0",
    "timestamp" : "0x58ee40ba",
    "gasLimit" : ** "0x2FEFD800" **,
    .
    .
    .
}
```
### HOW TO USE ###

* Clone the repository
* Enter into the folder ethereum-node-benchmark/server
* run npm install
* Go back to the root folder and open docker-compose.yml; there you will have the posibility to set the following enviroment variables which aplies for all containers:
    ```shell
    - DESIRED_RATE_TX=50
    - AMOUNT_DATA_BYTES=0
    - TEST_TIME_MINUTES=1
    - RPC_URL=http://localhost:1234
    ```
    Where: 
    1. DESIRED_RATE_TX : Is the rate at which pantheon node will receive transactions in a period of one second.
    2. AMOUNT_DATA_BYTES : Is The amount of bytes to add on each transaction.
    3. TEST_TIME_MINUTES :  Is the period of time, in minutes, at which Pantheon will be exposed to a bunch of transactions sent from this code when running.
    4. RPC_URL : the rpc url that point to the pantheon node to test

    Be mindful that you can run as many containers as you want; and also on each of those; you can customize
    different RPC URLs.

    It is recommended to set each container with the following considerations:
    1. Set DESIRED_RATE_TX up to 50 tx/s if you send from 0 to 10kB (AMOUNT_DATA_BYTES)
    2. Set DESIRED_RATE_TX up to 20 tx/s if you send from 10kB to 100kB (AMOUNT_DATA_BYTES)
    3. Set DESIRED_RATE_TX up to 10 tx/s if you send from 100kB to 146.5kB (AMOUNT_DATA_BYTES); take into consideration that 146.5kB is aproximately the maximun amount of data you can send in Pantheon with the specified gas limit in the genesis.json, shown above.

* Create the folder logs into the project folder:
    ```shell
    mkdir logs
    ```
* Now you are ready to run the project by using:
    ```shell
    docker-compose --build
    ```

### OBSERVATIONS AFTER RUNNING THE SCRIPT ###
* When a bunch of transactions are sent to a regular node that is not connected to a validator, then those transactions are not processed, even when later that regular connects to a validator.

* On each block, pantheon can store aproximately 950 transactions (transactions with zero ether and non additional data) at a rate of 963tx/s during 0.986seconds; pantheon response is in aproximately than 7 seconds.

* Graphics: