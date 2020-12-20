const SUCCESS = 'SUCCESS'; // Query or action was successful
const FAIL = 'FAIL'; // Query or action failed for a possibly unknown reason
const EMPTY = 'EMPTY'; // Query or action target returned nothing
const EXISTS = 'EXISTS'; // Query or action target exists
const ERROR = 'ERROR'; // Query or action encountered an error

module.exports = {
    SUCCESS,
    FAIL,
    EMPTY,
    EXISTS,
    ERROR,
};
