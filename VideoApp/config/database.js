if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://root:test1234@ds229826.mlab.com:29826/video-app'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/video-app'
    }
}
