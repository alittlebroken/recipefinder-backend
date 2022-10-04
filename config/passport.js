/*
 * Import any required modules
 */
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const userModel = require('../models/userModel');


/*
 * Set a passport handler for logging in a user locally.
 * The username and password will be retrieved via form values submitted
 * by the client when a user wihses to login
 */
passport.use(
  /* Set an identifier for this handler */
  'login-local',
  /* Which Strategy to use for the login */
  new localStrategy(
    /* Callback function that will handle getting the details from the DB and
     * checking they are correct
     */
    async (email, password, done) => {

      /*
       * Check the passed in credentials
       */
      try {

        /* Find the user within the DB, check it is a valid user and if not
        reject the login attempt */
        const user = await userModel.findByEmail(email);
        if(!user){
          return done(null, false, { message: 'email not registered'});
        }

        /* Now check the passwords match and again if not reject the login
        attempt */
        const userValidated = await userModel.verify(password, user.password);
        if(!userValidated){
          return done(null, false, { message: 'supplied password does not match'});
        }

        /* User credentials are valid we can go ahead and say the user is now
         logged in */

        // TODO: Update the last login time here

        /* generate a user object to send back */
        const authedUser = {
          id: user.id,
          username: user.username,
          email: user.email,
          roles: user.roles,
          forename: user.forename,
          surname: user.surname
        };
        return done(null, authedUser, { message: 'login successful'});

      } catch(e) {
        return done(e);
      }

    }
  )
);


/*
 * Sets a handler for registering a new user into the system
 */
passport.use(
  /* Set the handlers indetifier */
  'register',
  /* Main callback function */
  async (email, password, done) => {

    /* Register the user via the userModel */
    try {

      const result = userModel.insert(email,password, email);
      if(result){
        return done(null, user);
      } else {
        return done(null, false, { message: 'Unable to reguster user'});
      }

    } catch(e) {
      let error = new Error('There was an issue regustering the user');
      return done(error);
    }

  }
)


/* Handler for verifying a JWT token */
passport.use(
  /* Specify the strategy to use */
  new JWTstrategy(
    /* Set the options for this strategy */
    {
      secretOrKey: process.env.JWT_TOKEN_SECRET,
      jwtFromRequest: ExtractJWT.fromExtractors([
        ExtractJWT.fromUrlQueryParameter('secret_token'),
        ExtractJWT.fromHeader('secret_token'),
        ExtractJWT.fromAuthHeaderAsBearerToken()
      ])
    },
    /* Callback used to process the strategy */
    async (token, done) => {
      try{
        return done(null, token.user);
      } catch(e) {
        return done(error);
      }
    }
  )
);