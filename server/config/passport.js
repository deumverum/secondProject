const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local');

passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    function(email , password , done){
        User.findOne({email}).then(user => {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {return done(err)}
                console.log(result);
            });
        })
    }
))