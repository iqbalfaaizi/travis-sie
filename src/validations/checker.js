const { User } = require('../models/mongoSchema')

exports.checkEmail = async (value) => {
    return await User
        .findOne({ email: value })
        .catch(err => {
            return h.response({ auth: false, message: err })
        })
}

exports.checkUsername = async (value) => {
    return await User
        .findOne({ username: value })
        .catch(err => {
            return h.response({ auth: false, message: err })
        })
}

exports.checkPinUser = async (value) => {
    return await User
        .find({ pinUser: value })
        .catch(err => {
            return h.response({ auth: false, message: err })
        })
}
