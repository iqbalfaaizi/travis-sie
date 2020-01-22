const {
      User
} = require('../models/mongoSchema')
const {
      checkEmail,
      checkUsername
} = require('../validations/checker')

exports.signup = async (request, h) => {
      if ((await checkEmail(request.payload.email)) === null) {
            try {
                  const id = Math.floor(Math.random() * (10 **16))
                  Object.assign(request.payload, {id: id})
                  const newUser = new User(request.payload)
                  await newUser.save()
                  return h.response('success')
            } catch (err) {
                  return h.response('failed').code(401)
            }

      } else {
            return h.response('Email already used').code(403)
      }
}


exports.login = async (request, h) => {
      try {
            const email = request.payload.email;
            const password = request.payload.password;
            const userData = await User.findOne({
                  email: email
            }).lean();
            const currTime = Date.now();
            if (userData !== null) {
                  let failedAttempt = userData.failed_attempt;
                  if (userData.locked_until.getTime() > currTime) {
                        return h.response({
                              auth: false,
                              message: "Your account is locked for 15 minutes"
                        }).code(401)
                  }
                  if (password === userData.password) {
                        const result = await User.findOneAndUpdate({
                              email: email
                        }, {
                              failed_attempt: 0
                        }, {
                              new: true
                        }).lean();
                        return h.response({
                              auth: true,
                              user: result,
                              message: "Login success"
                        }).code(200)
                  } else {
                        failedAttempt++;
                        if (failedAttempt > 2) {
                              let lockedUntil = currTime + (15 * 60000);
                              const result = await User.findOneAndUpdate({
                                    email: email
                              }, {
                                    locked_until: lockedUntil,
                                    failed_attempt: 0
                              }, {
                                    new: true
                              }).lean();
                              return h.response({
                                    auth: false,
                                    user: result,
                                    message: 'Your account has been locked for 15 minutes'
                              }).code(401)
                        }
                        const result = await User.findOneAndUpdate({
                              email: email
                        }, {
                              failed_attempt: failedAttempt
                        }, {
                              new: true
                        }).lean();
                        return h.response({
                              auth: false,
                              user: result,
                              message: `Invalid email or password, you have ${3 - failedAttempt} attempt(s) left`
                        }).code(401)
                  }
            } else if (userData === null) {
                  return h.response({
                        auth: false,
                        message: 'Email not registered'
                  }).code(404)
            }
      } catch (err) {
            return h.response({
                  message: "uncaught error"
            }).code(400)
      }
}

exports.setpin = async (request, h) => {
      try {
            const result = await User.findOneAndUpdate({
                  email: request.payload.email
            }, {
                  pinUser: request.payload.pinUser
            }, {
                  new: true
            })
            return result
      } catch (err) {
            return h.response(
                  [{
                        auth: false,
                        message: err
                  }]
            )
      }
}