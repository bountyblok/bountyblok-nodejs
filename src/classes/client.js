'use strict';

/**
 * Dependencies
 */
const http = require('request');
const pkg = require('../../package.json');
const mergeData = require('./merge-data');
const ResponseError = require('./response-error');
const {GetChallengeRequest, GetChallengeResponse, GetLevelsRequest, GetLevelsResponse, LogAppRequest} = require('./index');

/**
 * Bountyblok REST Client
 */
class Client {

  /**
   * Constructor
   */
  constructor() {

    //API key
    this.apiKey = '';

    //Default headers
    this.defaultHeaders = {
      'Accept': 'application/json',
      //'User-agent': 'sendgrid/' + pkg.version + ';nodejs',
    };

    //Empty default request
    this.defaultRequest = {
      json: true,
      baseUrl: 'https://api.bountyblok.io/',
      url: '',
      method: 'GET',
      headers: {},
      port: 443,
    };
  }

  /**
   * Set API key
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Set default header
   */
  setDefaultHeader(key, value) {
    this.defaultHeaders[key] = value;
    return this;
  }

  /**
   * Set default request
   */
  setDefaultRequest(key, value) {
    this.defaultRequest[key] = value;
    return this;
  }

  /**
   * Create headers for request
   */
  createHeaders(data) {

    //Merge data with default headers
    const headers = mergeData(this.defaultHeaders, data);

    //Add API key, but don't overwrite if header already set
    if (typeof headers.Authorization === 'undefined' && this.apiKey) {
      headers.Authorization = 'Bearer ' + this.apiKey;
    }

    //Return
    return headers;
  }

  /**
   * Create request
   */
  createRequest(data) {

    //Keep URL parameter consistent
    if (data.uri) {
      data.url = data.uri;
      delete data.uri;
    }

    //Merge data with empty request
    const request = mergeData(this.defaultRequest, data);

    //Add headers
    request.headers = this.createHeaders(request.headers);
    return request;
  }

  /**
   * Do a request
   */
  request(data, cb) {

    //Create request
    const request = this.createRequest(data);

    //Perform request
    const promise = new Promise((resolve, reject) => {
      http(request, (error, response, body) => {

        //Request error
        if (error) {
          return reject(error);
        }

        //Response error
        if (response.statusCode >= 400) {
          return reject(new ResponseError(response));
        }

        //Successful response
        resolve([response, body]);
      });
    });

    // Throw and error incase function not passed
    if (cb && typeof cb !== 'function') {
      throw new Error('Callback passed is not a function.');
    }

    //Execute callback if provided
    if (cb) {
      return promise
        .then(result => cb(null, result))
        .catch(error => cb(error, null));
    }

    //Return promise
    return promise;
  }

  /**
   * logAppAsync logs user tasks for app-wide challenges currently running and are active.
   */
  async logAppAsync(data){
    if (!(data instanceof LogAppRequest)) {
        return Error('Object of type LogAppRequest is required.');
    }

    const body = data.toJSON();

    const request = {
      method: 'POST',
        url: '/v1/log_app',
        body
    };
    return await this.request(request)
        .then(([response, body]) => {

        console.log('body:', body)
        return body;
    })
  }

  /**
   * getChallengeProgressAsync returns a challenge progress response.
   */
  async getChallengeProgressAsync(data){
    if (!(data instanceof GetChallengeRequest)) {
        return Error('Object of type GetChallengeRequest is required.');
    }

    const {challengeId, accountName} = data;

    const request = {
    method: 'GET',
        url: '/v1/get_challenge_progress?challenge_id=' + challengeId + '&account_name=' + accountName,
    };
    return await this.request(request)
        .then(([response, body]) => {

        return new GetChallengeResponse(body)
    })
  }

  /**
   * getAllLevelsProgressAsync returns a challenge progress response.
   */
  async getAllLevelsProgressAsync(data){
    if (!(data instanceof GetLevelsRequest)) {
        return Error('Object of type GetLevelsRequest is required.');
    }

    const {appId, accountName} = data;

    const request = {
    method: 'GET',
        url: '/v1/get_all_levels_progress?app_id=' + appId + '&account_name=' + accountName,
    };
    return await this.request(request)
        .then(([response, body]) => {

        return new GetLevelsResponse(body)
    })
  }

}




//Export class
module.exports = Client;