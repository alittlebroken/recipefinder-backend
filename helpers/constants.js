/*
 * Common error and informational messages used by
 * the API.
 */

const INFO_RECORD_CREATED = "Record successfully created";
const INFO_RECORD_UPDATED = "Record successfully updated";
const INFO_RECORD_REMOVED = "Record successfully removed";

const ERROR_MISSING_VALUES = "One or more required values are missing or incorrect";
const ERROR_GENERIC_RESOURCE = "There was a problem with the resource, please try again later";
const ERROR_SIMULATE = "Lost connection to the database";

module.exports = {
  INFO_RECORD_CREATED,
  INFO_RECORD_REMOVED,
  INFO_RECORD_UPDATED,
  ERROR_MISSING_VALUES,
  ERROR_GENERIC_RESOURCE,
  ERROR_SIMULATE
}
