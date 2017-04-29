const argv = require('yargs').argv;

exports.MONGODB = {
    uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/NodePress`,
    username: argv.db_username || 'DB_username',
    password: argv.db_password || 'DB_password'
}

exports.EMAIL = {
    account: argv.email_account || 'your email address like : admin@surmon.me',
    password: argv.email_password || 'your email password'
}

exports.APP = {
    ROOT_PATH: __dirname,
    LIMIT: 10,
    PORT: 3000
}

exports.INFO = {
    name: 'NodePress',
    version: '1.0.0',
    author: 'Surmon',
    site: 'https://surmon.me',
    powered: ['Vue2', 'Nuxt.js', 'React', 'Angular4', 'Bootstrap4', 'jQuery', 'Video.js', 'Node.js', 'MongoDB', 'Express', 'Nginx']
}
