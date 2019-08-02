'use strict';

const LevelProgress = require('./level-progress');
const toCamelCase = require('./to-camel-case');
const deepClone = require('./deep-clone');

/**
 * GetChallengeResponse class
 */
class GetLevelsResponse {

  /**
	 * Constructor
	 */
  constructor(data) {
    this.levels = [];
    
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
      throw new Error('Expecting object for GetLevelsResponse data');
    }


    data = deepClone(data);
    data = toCamelCase(data, ['substitutions', 'customArgs']);
    //console.log('data2', data);

    const {levels} = data;

    this.setLevels(levels);
  }

  /**
   * Set levels
   */
  setLevels(levels) {
    this.levels = LevelProgress.create(levels);
  }

 /**
   * Create an GetLevelsResponse instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of GetChallengeRequest class?
    if (data instanceof GetLevelsResponse) {
      return data;
    }

    //Create instance
    return new GetLevelsResponse(data);
  }
}

//Export class
module.exports = GetLevelsResponse;