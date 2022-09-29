/*
 * Validate the passed in variable
 * @param {any} value - the value being validated
 * @param {string} type - the type the value should be
 * @param {number} size - the size an array should be
 * @returns {boolean} true if validated OK, false otherwise
 */
const validator = (value, type, size = 1) => {

  /* Check if the passed in value is actually set and then check
   * the type to run the appropriate checks and return true or false
   * based on the result of the validation */
  if(!value){
    return false;
  } else {

    if(type === 'array'){

      if(Array.isArray(value) && value.length >= size){
        return true;
      } else {
        return false;
      }

    } else {

      if(typeof value === type){
        return true;
      } else {
        return false;
      }

    }

  }


};


module.exports = {
  validator,
}
