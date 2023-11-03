const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local');
const GitHubStrategy = require('passport-github').Strategy;


passport.use(
    new GitHubStrategy(
      {
        clientID: '41c69ff363d993057df5',
        clientSecret: '0292e50c4b6338c77ce62357dcb437e06d1710c3',
        callbackURL: '/auth/github/callback', 
      },
      (accessToken, refreshToken, profile, done) => {

      }
    )
  );

passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    function(email , password , done){
        User.findOne({email}).then(user => {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {return done(err)}
                if(result) {return done(null , user)} 
            });
        }).catch(e => {
            {return done(e)}
        })
    }
))

passport.serializeUser(function(user , done) {
    console.log(user);
    done(null , user._id);
})

passport.deserializeUser(function(id, done) {
    User.findById(id).then(user => {
        done(null, user);
    }).catch(err => {
        done(err, null);
    });
});
