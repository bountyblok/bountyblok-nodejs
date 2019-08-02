'use strict';

/**
 * GetLevelsRequest class
 */
class GetLevelsRequest {

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
      throw new Error('Expecting object for GetLevelsRequest data');
    }

    //Extract appId and accountName
    const {appId, accountName} = data;

    this.setAppId(appId);
    this.setAccountName(accountName);
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
   * Set account name (optional)
   * API Will not return progress if account name is not specified or does not exist
   */
  setAccountName(accountName) {
    if (typeof accountName === 'undefined') {
      return;
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
	 * To JSON
	 */
  toJSON() {

    //Get properties
    const {appId, accountName} = this;

    const json = {appId};

    if (name !== '') {
      json.accountName = accountName;
    }

    //Return
    return json;
  }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create an GetLevelsRequest instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of GetLevelsRequest class?
    if (data instanceof GetLevelsRequest) {
      return data;
    }

    //Create instance
    return new GetLevelsRequest(data);
  }
}

//Export class
module.exports = GetLevelsRequest;