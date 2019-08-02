**This library allows you to easily use the bountyblok.io APIs via Node.js.**

bountyblok.io is a gamification engine built and powered by the EOS blockchain.

This library is a quick and easy way to Log tasks for challenges as well as retrieve progresses/badges/achievements and more. We will keep updating this library to expose our API calls in the future!

Thanks for your support! 

# Installation

## Prerequisites

- Node.js version 6, 7 or 8

## Obtain an API Key

Grab your API Key from the [bountyblok.io UI](https://app.bountyblok.io/settings/api_keys).

## Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x, therefore, you likely already have it.

```sh
npm install --save bountyblok
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add bountyblok
```

<a name="general"></a>
## Examples

```js
const client = require('bountyblok')
const { 
    classes: {
        GetChallengeRequest,
        GetLevelsRequest,
        LogAppRequest
    }
} = require('bountyblok')
```

## /v1/log_app

```js
const request = new LogAppRequest({
    appId: '<< app_id >>',
    accountName: 'user123',
    quantity: 1,
    param:{
        orderside: 'sell',
        ordertype: 'mkt',
        exchange: 'us'
    }
})

client.logAppAsync(request).then((res) => console.log(res) )
```

## /v1/get_all_levels_progress

```js
const request = new GetLevelsRequest({
    appId: '<< app_id >>',
    accountName: 'user123'
})

client.getAllLevelsProgressAsync(request).then((res)=>{
    
    // returns GetLevelsResponse
    console.log(res.levels[0].challenges[0].tasks[0].taskName)
    console.log(res.levels[0].challenges[0].tasks[0].quantityRequired)
})
```

<a name="license"></a>
# License
[The MIT License (MIT)](https://github.com/bountyblok/bountyblok-nodejs/blob/master/LICENSE.md)
