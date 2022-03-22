const { existsOrError, notExistsOrError } = require('../utils/servicesValidation');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


class AccountController {
    static async authenticateAuth2(req, res) {
        let token = ""
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://app-youcoders-v1.herokuapp.com/auth/callback",
            passReqToCallback: true
        },
            (request, accessToken, refreshToken, profile, done) => {
                User.findOrCreate({ googleId: profile.id }, function (err, user) {
                    return done(err, user);
                });
            }
        ));
        passport.authenticate('google', { scope: ['email', 'profile'] })
        res.json({ token }).end();
    }
}

module.exports = AccountController;