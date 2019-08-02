'use strict';

const GetChallengeResponse = require('./get-challenge-response');
const toCamelCase = require('./to-camel-case');
const deepClone = require('./deep-clone');

/**
 * LevelProgress class
 */
class LevelProgress {

  /**
	 * Constructor
	 */
  constructor(data) {
    this.levelId = null;
    this.name = null;
    this.description = null;
    this.score = null;
    this.challenges = [];
    

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
      throw new Error('Expecting object for LevelProgress data');
    }


    data = deepClone(data);
    data = toCamelCase(data, ['substitutions', 'customArgs']);
    //console.log('data2', data);

    const {levelId, name, description, score, challenges} = data;

    this.setLevelId(levelId);
    this.setName(name);
    this.setDescription(description);
    this.setScore(score);
    this.setChallenges(challenges);
  }

 

  /**
   * Set levelId
   */
  setLevelId(levelId) {
    this.levelId = levelId;
  }

  
  /**
   * Set name 
   */
  setName(name) {
    this.name = name;
  }

 /**
   * Set description
   */
  setDescription(description) {
    this.description = description;
  }

  /**
   * Set score
   */
  setScore(score) {
    this.score = score;
  }

  /**
   * Set challenges
   */
  setChallenges(challenges) {
    this.challenges = GetChallengeResponse.create(challenges);
  }

 /**
   * Create an LevelProgress instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of GetChallengeRequest class?
    if (data instanceof LevelProgress) {
      return data;
    }

    //Create instance
    return new LevelProgress(data);
  }
}

//Export class
module.exports = LevelProgress;