var configValues = require('./configValues');

module.exports = {
    getDBConnectionString: function () {
        return `mongodb://${configValues.uname}:${configValues.pwd}@ds139219.mlab.com:39219/fbcommcenter`;
    }
};