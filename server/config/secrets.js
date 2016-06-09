module.exports = {
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || require('../../AuthSecrets.js').facebook,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || require('../../AuthSecrets.js').google,
    EMAIL_SECRET: process.env.EMAIL_SECRET || require('../../AuthSecrets.js').email,
    JWT_SECRET: process.env.JWT_SECRET || require('../../AuthSecrets.js').jwt,
    SMPT_PASS: process.env.SMPT_PASS || require('../../AuthSecrets.js').smpt,
}