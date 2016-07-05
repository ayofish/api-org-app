/**
 * mongodb configuration
 */
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/yoyotest-dev'
    },
    options: {
      db: {
        safe: true
      }
    }
};
