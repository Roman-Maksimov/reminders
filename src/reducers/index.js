const errors = require('./errors');
const settings = require('./settings');
const viewport = require('./viewport');

export default {
    ...errors,
    ...settings,
    ...viewport
}