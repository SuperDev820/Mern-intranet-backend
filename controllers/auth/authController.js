// const jwt = require('jsonwebtoken');
const User = require('../../models/User');

/**
 * Register a new user
 * @param {*} request
 * @param {*} response
 * @return {*} created user or error
 */
const register = async (request, response) => {

    const email = request.body.user.email || '';
    const password = request.body.user.password || '';

    console.log('register')

    if(email && password) {
        User.findOne({email: email}, (error, user) => {
            // check if user exist
            if (error) {
                console.log(error);
                response.status(401).send({
                    success: false,
                    message: error.message,
                });
            }
            console.log(user);
            if(!user) {
                newUser = new User(request.body.user);
                newUser.save((error) => {
                    if (error) {
                        console.log(error);
                        response
                            .status(401)
                            .send({
                                success: false,
                                message: error.message,
                            });
                    } else {
                      response
                          .status(200)
                          .send({
                            success: true,
                            user: newUser,
                          });
                    }
                  });
            } else {
                console.log('error');
                response
                .status(401)
                .send({
                    success: false,
                    message: 'Already exist',
                });
            }

        });
    }
};

/**
 * User login
 * @param {*} request
 * @param {*} response
 * @return {*} logged existant user or error
 */
const login = (request, response) => {
  const email = request.body.user.email || '';
  const password = request.body.user.password || '';
  console.log(request.body);
  if (email && password) {
    User.findOne({email: email}, (error, user) => {
      // check if user exist
      if (error) {
        console.log('pass')
        return response
                .status(401).send({
                success: false,
                message: error.message,
                });
      } else {
        if (!user) {
            console.log('pass')
          return response
                .status(401).send({
                success: false,
                message: 'USER_NOT_EXIST',
          });
        } else {
            if(user.password == password) {
                console.log(user)
                return response
                    .status(200)
                    .send({
                        success: true,
                        user: user
                    });
                
            } else {
                console.log('pass')
                return response
                    .status(401)
                    .send({
                        success: false,
                        message: 'WRONG_PASSWORD',
                    });
            }
            
          // check if password matches
        //   user.comparePassword(password, (error, isMatch) => {
        //     if (isMatch && !error) {
        //       // if user is found and password is right create a token
        //       // algorithm: process.env.JWT_TOKEN_HASH_ALGO
        //       const token = jwt.sign(
        //           user.toJSON(),
        //           process.env.JWT_SECRET_OR_KEY, {
        //             expiresIn: process.env.JWT_TOKEN_EXPIRATION,
        //           });

        //       // return the information including token as JSON
        //       response
        //           .status(200)
        //           .send({
        //             success: true,
        //             user: user,
        //             // token: `${process.env.JWT_TOKEN_PREFIX} ${token}`,
        //           });
        //     } else {
        //       response
        //           .status(401)
        //           .send({
        //             success: false,
        //             message: 'WRONG_PASSWORD',
        //           });
        //     }
        //   });
        }
      }
    });
  } else {
    console.log('pass')
    return response
        .status(401)
        .send({
          success: false,
          message: 'VERIFY_REQUIRED_INFORMATION',
        });
  }
  console.log('sended logedin user')
};

const checkSubdomain = async (request, response) => {
    console.log(request);
    let subdomain = request.body.subdomain || ''

    if (subdomain) {
        User.findOne({ name: subdomain }, function(err, user) {
            if(user) {
                return response
                    .status(200)
                    .send({
                        success: true,
                        subdomain: user.name,
                    })
            } else {
                return response
                    .status(200)
                    .send({
                        success: false,
                    })
            }
        })
    } else {
        return response
            .status(201)
            .send({
                success: false,
            })
    }
    
}

// logout user will be on front part
// remove token

const AuthController = {
  register,
  login,
  checkSubdomain
};

module.exports = AuthController;
