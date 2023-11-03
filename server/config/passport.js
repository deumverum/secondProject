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
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Используйте функцию findOne без обратного вызова
          const user = await User.findOne({ githubId: profile.id });
          if (user) {
            // Если пользователь уже существует, войдите в систему
            return done(null, user);
          } else {
            // Если пользователь не существует, создайте нового пользователя
            const newUser = new User({
              githubId: profile.id,
              full_name: profile.username,
              // Другие поля профиля, которые вы хотите сохранить
            });
  
            // Сохраните нового пользователя в базе данных
            await newUser.save();
            return done(null, newUser);
          }
        } catch (err) {
          return done(err);
        }
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
