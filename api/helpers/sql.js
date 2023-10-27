const { BadRequestError } = require("../expressError");

/** Helper function for making selective update queries.
 */
const sqlForPartialUpdate = (dataToUpdate, jsToSql) => {
  /** get an array of keys from the dataToUpdate object
   * if the array is empty, throw an error
   */
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  /** map over the keys array and return an array of strings that are
   * the column names and the values to be updated
   * with the column names in the correct format
   * and the values as $1, $2, etc.
   * {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2'] */
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  /** return an object with the setCols property as a string of the column names
   * and sql syntax for updating the values
   * and the values property as an array of the values to be updated
   */
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
};

module.exports = { sqlForPartialUpdate };
