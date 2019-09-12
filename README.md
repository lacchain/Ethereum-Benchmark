## TRANSACTIONS PER SECOND RATE TEST IN PANTHEON NETWORK ##
### PURPOSE ###
<p>This code is aimed to measure how pantheon behaves when a stimulus(a bunch of transactions) are sent, in different time intervals, to a Blockchain Pantheon node.
</p>
<p>To achieve this goal a testing network of two nodes where configured with the following configuration (similar configuration to Lacchain) :</p>

1. 4 vCPUs, 15 GB memory

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
* You must have docker and docker-compose installed on the machine you want to run the program.
* Clone the repository
* Enter into the folder ethereum-node-benchmark/server
* run npm install
* Go back to the root folder and open **docker-compose.yml**; there you will have the posibility to SET the following enviroment variables:
    ```shell
    - DESIRED_RATE_TX=50
    - AMOUNT_DATA_BYTES=0
    - TEST_TIME_MINUTES=1
    - RPC_URL=http://localhost:1234
    - NUMBER_OF_CONTAINERS=2
    - STORE_DATA=TRUE
    ```
    Where: 
    1. DESIRED_RATE_TX : Is the rate at which pantheon node will receive transactions in a period of one second.
    2. AMOUNT_DATA_BYTES : Is The amount of bytes to add on each transaction.
    3. TEST_TIME_MINUTES :  Is the period of time, in minutes, at which Pantheon will be exposed to a bunch of transactions sent from this code when running.
    4. RPC_URL : the rpc url that point to the pantheon node to test
    5. NUMBER_OF_CONTAINERS is the number of containers you have configured on this docker-compose file.
    6. STORE_DATA : Only set to true on the first container; in te rest of copies set to false.

    Be mindful that you can run as many containers as you want; and also on each of those; you can customize
    different RPC URLs.

    This project is created whith the assumption that all containers runs with the same rate(DESIRED_RATE_TX) and all containers points to the same RPC URL.

* Create the folder logs into the server folder:
    ```shell
    mkdir logs
    ```
* Now you are ready to run the project by using:
    ```shell
    docker-compose up --build
    ```
### PUSPOSE ###
1. Determine how much transactions (with and without data), can be stored on each block
2. Establish limitations of Pantheon when it is exposed to a stress test.

### GENERAL KNOWLEDGE ###
1. Gas
2. Data with transactions
3. Block Period Seconds
4. Gas Limit

### METODOLOGY ###
1. Determine how much data can be stored on each block.
2. Establish a relation between gas and data on each transaction.
3. 
4. Expose a node to a different scenarios with different transaction rates at some interval of time.

### PROCESS ###
1. Running the code with 1tx/s and iterating over the amount of data sent on each transaction, we can find that Pantheon supports as much as 146500 bytes per transaction.

2. After many tests, sending different transaction(with no data), with different rates and different periods of time, the maximum rate at which pantheon can bear without  significant delays is 200tx/s (with no data)

3. Sending the maximum amount of data on each transaction(146500 bytes) at a rate of 200tx/s; allows us to measure how much transactions can be stored on each transaction at that rate: In our case is 80tx on each block; with the amount of 99,3% gas; with those values it is easy to infer that each transaction has (9 983 000 gas).

4. Now we can infer that 146500 bytes are equivalent to 9 983 000 gas; then we can conclude that 68 units of gas are involded to enter one byte into Pantheon.
```shell
AMOUNT_GAS_ONE_BYTE=68
```

5. We can infer that for a certain amount of bytes that we want to enter into Pantheon we can use:
```shell
AMOUNT_GAS_DATA=AMOUNT_GAS_ONE_BYTE*NUMBER_OF_BYTES
```

6. Using the same methodology but sending transactions without data, we can infer that to enter one transaction without data, 21004 units of gas are involved.
```shell
AMOUNT_GAS_TRANSACTION_EMPTY=21004
```
7. We can establish the following:
```shell
GAS_PER_TX = AMOUNT_GAS_TRANSACTION_EMPTY  + AMOUNT_GAS_DATA
```
8. Now we can determine how much transactions can be stored on each block on Pantheon:
```shell
GAS_LIMIT=GAS_PER_TX * RATE_TX_PER_SECOND * BLOCK_PERIOD_SECONDS
```
From the previous we can conclude:
```shell
MAX_GAS_PER_TX = GAS_LIMIT/(RATE_TX_PER_SECOND*BLOCK_PERIOD_SECONDS)
```
9. Experimentally we have noticed that pantheon do not perform at a 100%; that is, so in order to obtain a sustained response from Pantheon we can fill transactions at 10% of the MAX_GAS_PER_TX.
```shell
ADJUSTED_GAS_PER_TX=10%(MAX_GAS_PER_TX)
ADJUSTED_GAS_PER_TX=(10%)GAS_LIMIT/(RATE_TX_PER_SECOND*BLOCK_PERIOD_SECONDS)
```

#### EXAMPLES ####
1. If you want to send at 150tx/sec then you can calculate the maximum amount of gas and DATA allowed on that transaction by using:
    * ADJUSTED_GAS_FOR_150_TX_PER_SEC=(10%)*GAS_LIMIT/(RATE_TX_PER_SECOND*BLOCK_PERIOD_SECONDS)
    then: ADJUSTED_GAS_FOR_150_TX_PER_SEC = (10%)*(800 000 000)/(**150***2)
         ADJUSTED_GAS_FOR_150_TX_PER_SEC = 266 667

    Also: ADJUSTED_GAS_FOR_150_TX_PER_SEC = AMOUNT_GAS_TRANSACTION_EMPTY  + AMOUNT_GAS_DATA
    then AMOUNT_GAS_DATA=ADJUSTED_GAS_FOR_150_TX_PER_SEC - AMOUNT_GAS_TRANSACTION_EMPTY
        AMOUNT_GAS_DATA = 266 667 - 21004
        AMOUNT_GAS_DATA=245663
         
    Also:
          BYTES_PER_TRANSACTION = AMOUNT_GAS_DATA/AMOUNT_GAS_ONE_BYTE
          BYTES_PER_TRANSACTION = 245663 / 68
          BYTES_PER_TRANSACTION = 3612

    Finally: 
    Then we can send 3kB of data at a rate of 150tx/s

    * ADJUSTED_GAS_FOR_100_TX_PER_SEC=(10%)*GAS_LIMIT/(RATE_TX_PER_SECOND*BLOCK_PERIOD_SECONDS)
    then: ADJUSTED_GAS_FOR_100_TX_PER_SEC = (10%)*(800 000 000)/(**100** *2)
        ADJUSTED_GAS_FOR_100_TX_PER_SEC = 400 000

    Also: ADJUSTED_GAS_FOR_100_TX_PER_SEC = AMOUNT_GAS_TRANSACTION_EMPTY  + AMOUNT_GAS_DATA
    then AMOUNT_GAS_DATA=ADJUSTED_GAS_FOR_100_TX_PER_SEC - AMOUNT_GAS_TRANSACTION_EMPTY
        AMOUNT_GAS_DATA = 400 000 - 21004
        AMOUNT_GAS_DATA=378996
         
    Also:
          BYTES_PER_TRANSACTION = AMOUNT_GAS_DATA/AMOUNT_GAS_ONE_BYTE
          BYTES_PER_TRANSACTION = 378 996 / 68
          BYTES_PER_TRANSACTION = 5.5kb

    Finally: 
    Then we can send 5.5kB of data at a rate of 100tx/s

    * ADJUSTED_GAS_FOR_50_TX_PER_SEC=(10%)*GAS_LIMIT/(RATE_TX_PER_SECOND*BLOCK_PERIOD_SECONDS)
    then: ADJUSTED_GAS_FOR_50_TX_PER_SEC = (10%)*(800 000 000)/(**50** *2)
        ADJUSTED_GAS_FOR_50_TX_PER_SEC = 800 000

    Also: ADJUSTED_GAS_FOR_50_TX_PER_SEC = AMOUNT_GAS_TRANSACTION_EMPTY  + AMOUNT_GAS_DATA
    then AMOUNT_GAS_DATA=ADJUSTED_GAS_FOR_50_TX_PER_SEC - AMOUNT_GAS_TRANSACTION_EMPTY
        AMOUNT_GAS_DATA = 800 000 - 21004
        AMOUNT_GAS_DATA=778 996
         
    Also:
          BYTES_PER_TRANSACTION = AMOUNT_GAS_DATA/AMOUNT_GAS_ONE_BYTE
          BYTES_PER_TRANSACTION =778 996 / 68
          BYTES_PER_TRANSACTION = 11.5kB

    Finally: 
    Then we can send 11.5kB of data at a rate of 50tx/s


    * ADJUSTED_GAS_FOR_10_TX_PER_SEC=(10%)*GAS_LIMIT/(RATE_TX_PER_SECOND*BLOCK_PERIOD_SECONDS)
    then: ADJUSTED_GAS_FOR_10_TX_PER_SEC = (10%)*(800 000 000)/(**10** *2)
        ADJUSTED_GAS_FOR_150_TX_PER_SEC = 4 000 000

    Also: ADJUSTED_GAS_FOR_10_TX_PER_SEC = AMOUNT_GAS_TRANSACTION_EMPTY  + AMOUNT_GAS_DATA
    then AMOUNT_GAS_DATA=ADJUSTED_GAS_FOR_10_TX_PER_SEC - AMOUNT_GAS_TRANSACTION_EMPTY
        AMOUNT_GAS_DATA = 4 000 000 - 21004
        AMOUNT_GAS_DATA=3 978 996
         
    Also:
          BYTES_PER_TRANSACTION = AMOUNT_GAS_DATA/AMOUNT_GAS_ONE_BYTE
          BYTES_PER_TRANSACTION =3 978 996 / 68
          BYTES_PER_TRANSACTION = 58.5k

    Finally: 
    Then we can send 58.5kB of data at a rate of 10tx/s

    

### GRAPHS ###
* 150tx/s with 3kb  bytes on each transaction (266 667 gas). The following graph  show how a regular node was exposed during 30 minutes.

* 100tx/s with  5.5 bytes on each transaction (400 000 gas). The following graph  show how a regular node was exposed during 30 minutes.

* 50tx/s with 11.5kB  bytes on each transaction (800 000 gas). The following graph  show how a regular node was exposed during 30 minutes.

* 10tx/s with 58.5kB on each transaction (4 000 000). The following graphic show how a regular node was exposed during 30 minutes.

### CONCLUSIONS ###
1. Block period seconds and gas limit has a direct influence in how much transactions can be stored on Pantheon.

2. It is recommended to not to send too much transactions per second (maximum 200tx/s with 10% of gas limit each block period second)