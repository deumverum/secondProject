//router.js
const express = require('express')
const passport = require('passport')
const { signUp , signIn , signOut} = require('./controller')
const router = express.Router()

router.post('/api/signup' , signUp)
router.post('/api/signin', passport.authenticate('local', { failureRedirect: '/login?error=1' }), signIn);
router.get('/api/signout', signOut)
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/myblogs', failureRedirect: '/login' }));


module.exports = router