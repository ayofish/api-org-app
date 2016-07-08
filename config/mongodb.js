/**
 * mongodb configuration
 */
module.exports = {
    // MongoDB connection options
    mongo: {
        //add in the port to the uri as needed
        uri: 'mongodb://localhost/yoyotest-dev'
    },
    options: {
        db: {
            safe: true
        },
        //fill in with user and password
        user: "",
        pass: ""
    }
};
