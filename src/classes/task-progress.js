'use strict';

const toCamelCase = require('./to-camel-case');
const deepClone = require('./deep-clone');

/**
 * TaskProgress class
 */
class TaskProgress {
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

    data = deepClone(data);
    data = toCamelCase(data, ['substitutions', 'customArgs']);

    //console.log(data)

    const {taskId, taskName, quantityRequired, quantityCompleted} = data;

    this.setTaskId(taskId);
    this.setTaskName(taskName);
    this.setQuantityRequired(quantityRequired);
    this.setQuantityCompleted(quantityCompleted);
  }
 
  /**
   * Set taskId
   */
  setTaskId(taskId) {
    this.taskId = taskId;
  }

  /**
   * Set taskName
   */
  setTaskName(taskName) {
    this.taskName = taskName;
  }

  /**
   * Set quantityRequired
   */
  setQuantityRequired(quantityRequired) {
    this.quantityRequired = quantityRequired;
  }

  /**
   * Set quantityCompleted
   */
  setQuantityCompleted(quantityCompleted) {
    this.quantityCompleted = quantityCompleted;
  }      

   /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create an TaskResponse instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of TaskProgress class?
    if (data instanceof TaskProgress) {
      return data;
    }

    //Create instance
    return new TaskProgress(data);
  }

}

//Export class
module.exports = TaskProgress;