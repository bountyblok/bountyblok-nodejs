'use strict';

/**
 * LogAppRequest class
 */
class LogAppRequest {

  /**
	 * Constructor
	 */
  constructor(data) {

    //Construct from data
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * From data
   */
  fromData(data) {

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for GetChallengeRequest data');
    }

    const {appId, accountName, param, quantity} = data;

    this.setAppId(appId);
    this.setAccountName(accountName);
    this.setParam(param);
    this.setQuantity(quantity);
  }
 

  /**
   * Set appId (mandatory)
   */
  setAppId(appId) {
    if (typeof appId === 'undefined') {
      throw new Error('Must provide `appId`');
    }
    if (typeof appId !== 'string') {
      throw new Error('String expected for `appId`');
    }
    this.appId = appId;
  }

   /**
   * Set accountName (mandatory)
   */
  setAccountName(accountName) {
    if (typeof accountName === 'undefined') {
        throw new Error('Must provide `accountName`');
    }
    if (typeof accountName !== 'string') {
      throw new Error('String expected for `accountName`');
    }
    // Wrap name in quotes to address API issue
    const isQuoted = (accountName[0] === '\"') && (accountName[accountName.length - 1] === '\"');
    const shouldQuote = accountName.includes(',') && !isQuoted;
    this.accountName = shouldQuote ? `\"${accountName}\"` : accountName;
  }

  /**
   * Set param (mandatory)
   */
  setParam(param) {
    if (typeof param === 'undefined') {
        throw new Error('Must provide `param`');
    }
    /*if (typeof param !== 'string') {
      throw new Error('String expected for `param`');
    }
    // Wrap name in quotes to address API issue
    const isQuoted = (param[0] === '\"') && (param[param.length - 1] === '\"');
    const shouldQuote = param.includes(',') && !isQuoted;
    this.param = shouldQuote ? `\"${param}\"` : param;*/
    this.param = param;
  }

  
  /**
   * Set quantity (mandatory) - usually set to 1
   */
  setQuantity(quantity) {
    if (typeof quantity === 'undefined') {
      throw new Error('Must provide `quantity`');
    }
    if (isNaN(quantity)) {
      throw new Error('Number expected for `quantity`');
    }
    if (quantity < 1) {
        throw new Error('Positive number greater than 1 is required for `quantity`');
      }
    this.quantity = quantity;
  }

  /**
   * To JSON
   */
  toJSON() {
    const {appId, accountName, param, quantity}  = this;

    const json = {
        'app_id':appId,
        'account_name':accountName,
        'param':JSON.stringify(param),
        'quantity':quantity
    }

    return json;
  }


  /**
   * Create an LogAppRequest instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of LogAppRequest class?
    if (data instanceof LogAppRequest) {
      return data;
    }

    //Create instance
    return new LogAppRequest(data);
  }
}

//Export class
module.exports = LogAppRequest;