const { Router } = require('express');
const router = new Router();
const passport = require('../utils/passportSetup');


router.get("/failed", (req, res) => res.send("Failed"))
router.get("/success", (req, res) => res.status(200).redirect(`http://192.168.1.11:8080/main/token/${req.user.accessToken}`).end())
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/failed', successRedirect: '/success', }),);
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/login');
})


module.exports = router;