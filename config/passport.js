const LocalStrategy = require("passport-local").Strategy,
    JwtStrategy = require("passport-jwt").Strategy,
    { ExtractJwt } = require("passport-jwt"),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    { Strategy } = require('@superfaceai/passport-twitter-oauth2');


const { User } = require('../model');


const localStrategy = new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } })

            if (!user) {
                return done(null, false, {
                    message: 'Incorrect login credentials.'
                });
            };
            const passwordsMatch = await user.checkPassword(password)
            return passwordsMatch ?
                done(null, user) :
                done(null, false, { message: 'Incorrect login credentials.' })

        } catch (error) {
            done(error)
        }
    }
);


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findOne({ where: { userId: payload.userId } })
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => done(err));
}
);


const googleStrategy = new GoogleStrategy({
    clientID: '550594748551-25fipj3dp7ruoo7bh217e9ep7i8oookq.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:4000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    User.findOne({ where: { email: profile.emails[0].value } })
        .then(user => {
            if (user) {
                // If the user already exists, return the user
                done(null, user);
            } else {
                // If the user doesn't exist, create a new user and return it
                User.create({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: ''
                })
                    .then(newUser => {
                        done(null, newUser);
                    })
                    .catch(err => {
                        done(err, null);
                    });
            }
        })
        .catch(err => {
            done(err, null);
        });
})

// const twitterStrategy = new Strategy(
//     {
//         clientID: process.env.TWITTER_CLIENT_ID,
//         clientSecret: process.env.TWITTER_CLIENT_SECRET,
//         clientType: 'confidential',
//         callbackURL: `http://localhost:4000/api/auth/twitter/callback`,
//     },
//     // <3> Verify callback
//     (accessToken, refreshToken, profile, done) => {
//         console.log('Success!', { accessToken, refreshToken, profile });
//         return done(null, profile);
//     }
// )


const twitterStrategy = new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    clientID: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:4000/api/auth/twitter/callback'
}, async (token, tokenSecret, profile, done) => {
    User.findOne({ where: { twitterId: profile._json.id_str } })
        .then(user => {
            if (user) {
                // If the user already exists, return the user
                console.log('Fetched user')
                done(null, user);
            } else {
                // If the user doesn't exist, create a new user and return it
                User.create({
                    firstName: profile._json.name,
                    lastName: profile._json.name,
                    username: profile._json.screen_name,
                    password: '',
                    twitterId: profile._json.id_str
                })
                    .then(newUser => {
                        done(null, newUser);
                    })
                    .catch(err => {
                        done(err, null);
                    });
            }
        })
        .catch(err => {
            done(err, null);
        });
})



const passportStrategySetup = passport => {
    passport.use("local", localStrategy);
    passport.use("jwt", jwtStrategy);
    passport.use("google", googleStrategy);
    passport.use("twitter", twitterStrategy);
};

module.exports = { passportStrategySetup }
