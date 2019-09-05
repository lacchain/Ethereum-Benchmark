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

module.exports = helper