const client = require('./index')
const { 
    classes: {
        GetChallengeRequest,
        GetLevelsRequest,
        LogAppRequest
    }
} = require('./index')



// Set API KEY
client.setApiKey('<< API KEY >>'); // STORE IN ENV


/**
 * Get Challenge Progress
 */
const request = new GetChallengeRequest({
    challengeId: '<< challengeId from bountyblok.io >>',
    accountName: 'user123'
})

client.getChallengeProgressAsync(request).then((res)=>{
    // returns GetChallengeResponse
    console.log(res)
})


/**
 * Get All Levels Progress
 */
const request = new GetLevelsRequest({
    appId: '<< appId from bountyblok.io >>',
    accountName: 'user123'
})

client.getAllLevelsProgressAsync(request).then((res)=>{
    
    // returns GetLevelsResponse
    console.log(res.levels[0].challenges[0].tasks)
})


/**
 * Log challenges by appId
 */
const request = new LogAppRequest({
    appId: '<< appId from bountyblok.io >>',
    accountName: 'user123',
    quantity: 1,
    param:{
        symbol: 'PEP',
        exchange: 'US'
    }
})

client.logAppAsync(request).then((res) => console.log(res) )