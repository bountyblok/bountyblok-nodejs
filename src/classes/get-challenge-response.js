'use strict';

const TaskProgress = require('./task-progress');
const toCamelCase = require('./to-camel-case');
const deepClone = require('./deep-clone');

/**
 * GetChallengeResponse class
 */
class GetChallengeResponse {

  /**
	 * Constructor
	 */
  constructor(data) {
    this.challengeId = null;
    this.challengeName = null;
    this.startDate = null;
    this.endDate = null;
    this.description = null;
    this.rewards = [];
    this.tasks = [];
    this.tasksRequired = null;
    this.tasksCompleted = null;
    
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
      throw new Error('Expecting object for GetChallengeResponse data');
    }


    data = deepClone(data);
    data = toCamelCase(data, ['substitutions', 'customArgs']);
    //console.log('data2', data);

    const {challengeId, challengeName, startDate, endDate, description, challengeRewards, tasks, tasksRequired, tasksCompleted} = data;

    this.setChallengeId(challengeId);
    this.setChallengeName(challengeName);
    this.setStartDate(startDate);
    this.setEndDate(endDate);
    this.setDescription(description);
    this.setChallengeRewards(challengeRewards);
    this.setTasks(tasks);
    this.setTasksRequired(tasksRequired);
    this.setTasksCompleted(tasksCompleted);
  }

 

  /**
   * Set challengeId
   */
  setChallengeId(challengeId) {
    this.challengeId = challengeId;
  }

  
  /**
   * Set challengeName 
   */
  setChallengeName(challengeName) {
    this.challengeName = challengeName;
  }

 /**
   * Set startDate
   */
  setStartDate(startDate) {
    this.startDate = startDate;
  }

  /**
   * Set endDate
   */
  setEndDate(endDate) {
    this.endDate = endDate;
  }

  /**
   * Set description
   */
  setDescription(description) {
    this.description = description;
  }

  /**
   * Set challengeRewards
   */
  setChallengeRewards(challengeRewards) {
    this.challengeRewards = challengeRewards;
  }

  /**
   * Set tasks
   */
  setTasks(tasks) {
    this.tasks = TaskProgress.create(tasks);
  }

  /**
   * Set tasksRequired
   */
  setTasksRequired(tasksRequired) {
    this.tasksRequired = tasksRequired;
  }
  
  /**
   * Set tasksCompleted
   */
  setTasksCompleted(tasksCompleted) {
    this.tasksCompleted = tasksCompleted;
  }
  
  /**
   * Create an GetChallengeResponse instance from given data
   */
  static create(data) {


    
    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of GetChallengeRequest class?
    if (data instanceof GetChallengeResponse) {
      return data;
    }

    //Create instance
    return new GetChallengeResponse(data);
  }
}

//Export class
module.exports = GetChallengeResponse;