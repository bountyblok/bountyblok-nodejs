const client = require('./index')
const { 
    classes: {
        GetChallengeRequest,
        GetLevelsRequest,
        LogAppRequest
    }
} = require('./index')


/**
 * Get Challenge Progress
 */

// set apikey
client.setApiKey('BB.t+tmOmaJVyt+08k3ovJcs1s/Ep8fQMhEPiHcsl6fr2E=')

// build GetChallengeRequest object
let request = new GetChallengeRequest({
    challengeId: '0b4d3edb-0fb2-4af8-800e-1315ab2297c8',
    accountName: 'diminiko2222'
})

// make the request
client.getChallengeProgressAsync(request)
.then((res)=>{
    // returns GetChallengeResponse
    //console.log(res)
})

/**
 * Get All Levels Progress
 */
client.setApiKey('BB.6PWUYlORY0ZJSxSfV5mHT8pBv+EhVdEMrAGwNj5Y81o=')

request = new GetLevelsRequest({
    appId: '3850a27d-d60f-4b5e-87a3-a020d9423afe',
    accountName: 'diminiko2222'
})

client.getAllLevelsProgressAsync(request)
.then((res)=>{
    // returns GetLevelsResponse
    //console.log(res.levels[0].challenges[0].tasks)
})


/**
 * Get All Levels Progress
 */
client.setApiKey('BB.6PWUYlORY0ZJSxSfV5mHT8pBv+EhVdEMrAGwNj5Y81o=')

request = new GetLevelsRequest({
    appId: '3850a27d-d60f-4b5e-87a3-a020d9423afe',
    accountName: 'diminiko2222'
})

client.getAllLevelsProgressAsync(request)
.then((res)=>{
    // returns GetLevelsResponse
    //console.log(res.levels[0].challenges[0].tasks)
})



/**
 * Log challenges by appId
 */
client.setApiKey('<< API KEY >>')

request = new LogAppRequest({
    appId: '3850a27d-d60f-4b5e-87a3-a020d9423afe',
    accountName: 'diminiko2222',
    quantity:1,
    param:{
        do:'task',
        symbol:'PEP',
        exchange:'US'
    }
})

client.logAppAsync(request).then((res) => console.log(res) )