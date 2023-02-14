const LocalStrategy = require("passport-local").Strategy,
    JwtStrategy = require("passport-jwt").Strategy,
    { ExtractJwt } = require("passport-jwt");

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
    secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findByPk(payload.sub)
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => done(err));
}
);

module.exports = passport => {
    passport.use("local", localStrategy);
    passport.use("jwt", jwtStrategy);
};
