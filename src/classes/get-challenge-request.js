'use strict';

/**
 * GetChallengeRequest class
 */
class GetChallengeRequest {

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

    //Extract challengeId and accountName
    const {challengeId, accountName} = data;

    this.setChallengeId(challengeId);
    this.setAccountName(accountName);
  }

 

  /**
   * Set challengeId (mandatory)
   */
  setChallengeId(challengeId) {
    if (typeof challengeId === 'undefined') {
      throw new Error('Must provide `challengeId`');
    }
    if (typeof challengeId !== 'string') {
      throw new Error('String expected for `challengeId`');
    }
    this.challengeId = challengeId;
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
    const {challengeId, accountName} = this;

    const json = {challengeId};

    if (accountName !== '') {
      json.accountName = accountName;
    }

    //Return
    return json;
  }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create an GetChallengeRequest instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of GetChallengeRequest class?
    if (data instanceof GetChallengeRequest) {
      return data;
    }

    //Create instance
    return new GetChallengeRequest(data);
  }
}

//Export class
module.exports = GetChallengeRequest;