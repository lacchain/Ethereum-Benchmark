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
* Enter into the folder ethereum-node-benchmark
* run npm install
* Go to pantheon_utils/web3.js and modify the httpProvider pointing to the rpc url of the node you want to test.
    ```shell
    const web3 = new Web3(new Web3.providers.HttpProvider('http://YOUR_IP_NODE:RPC_PORT'))
    ```
* Now you are ready to run the script index.js, but take into consideration the following syntax:
    ```shell
    node index.js number_of_transactions_to_send amount_bytes_to_send_on_each_transaction
    ```

### OBSERVATIONS AFTER RUNNING THE SCRIPT ###
* When a bunch of transactions are sent to a regular node that is not connected to a validator, then those transactions are not processed, even when later that regular connects to a validator.

* On each block, pantheon can store aproximately 950 transactions (transactions with zero ether and non additional data) at a rate of 963tx/s during 0.986seconds; pantheon response is in aproximately than 7 seconds.

* Sending too much transactions(>2500) can reduce the performance of a pantheon node. It is worth to say those transactions have zero ether and non additional data.
    1. Pantheon will take 2 minutes to process 2500 transactions which are sent at a rate of  1394tx/s during 1.793 seconds.
    2. Pantheon will take 5 minutes to process 5000 transactions which are sent at a rate of  1669tx/s during 2.995 seconds; **nevertheless errors appears at this point**.

* Sending 1000 transactions with 20kB of data at a rate of  161tx/s during 6.2 seconds will be processed by pantheon in 17 seconds.

* Sending 2500 transactions with 20kB of data at a rate of  28tx/s during 87 seconds will be processed by pantheon in 2 minutes.
