const helper = {}
const readline = require('readline');

helper.reproduce = (times,data) => {
    let customData = ""    
    for(let i = 0; i<times; i++){
        customData = customData + data        
    }
    return customData
}

helper.verify = (outgoing,incoming) =>{
    const match = outgoing === incoming
    if(match){
        console.log("Outgoing and stored data matches")
    }else{
        console.log("Data do not match")
    }
}

helper.askQuestion = async(query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    }); 

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

helper.createRandomString = (strLength) =>{
    strLength = typeof(strLength) === 'number' && strLength >0 ? strLength :false
    if(strLength){
        //Define  all the possible characters that could  go into a string
        const possibleCharacters = 'abcdef0123456789'

        //Start the final string
        let str = ''

        for(let i =1; i<= strLength; i++){
            //Get the random charachter from the possibleCharacters string
            const randomCharacter = possibleCharacters.charAt(Math.floor(Math.random()*
            possibleCharacters.length))
            //Append this character to the final string
            str += randomCharacter
        }
        return str
    }else{
        return false
    }
}

helper.generateKeys = i => {
    const privateKeys = []
    for(k=1;k<=i;k++){
      let randomHexKey = helper.createRandomString(64)
      const bufferRandomKey = Buffer.from(randomHexKey,'hex')    
      privateKeys.push(bufferRandomKey)
    }
    //console.log(privateKeys)
    return privateKeys
}

helper.verifyDesiredRate = (desiredRateTx) => {
    desiredRateTx = parseInt(desiredRateTx)
    if(desiredRateTx && desiredRateTx>0 && isFinite(desiredRateTx) ){
        return desiredRateTx //achieves the desired tx rate per second
    }else {
        console.log("invalid rate transaction")
        process.exit()
    }
}

helper.verifyTestime = testTime => {
    testTime = parseFloat(testTime)
    if(testTime && testTime>0 && isFinite(testTime)) {
        return testTime
    }

    console.log("invalid testTime")
    process.exit()
}

helper.verifyAmountData = amountData => {
    amountData =  parseInt(amountData)
    if(amountData>=0 && isFinite(amountData)){
        return amountData
    }

    console.log("invalid data to add on each transaction")
    process.exit()
}

module.exports = helper