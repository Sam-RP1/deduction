const SUCCESS = 'success'; // Query or action was successful
const FAIL = 'fail'; // Query or action failed for a possibly unknown reason
const EMPTY = 'empty'; // Query or action target returned nothing
const EXISTS = 'exists'; // Query or action target exists
const ERROR = 'error'; // Query or action encountered an error

module.exports = {
    SUCCESS,
    FAIL,
    EMPTY,
    EXISTS,
    ERROR,
};
