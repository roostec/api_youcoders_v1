const { Router } = require('express');
const router = new Router();
const passport = require('../utils/passportSetup');


router.get("/failed", (req, res) => res.send("Failed"))
router.get("/success", (req, res) => {
    const { accessToken } = req.user
    const profile = { ...req.user.profile._json }
    profile.id = profile.sub
    profile.picture = encodeURIComponent(profile.picture)
    delete profile.sub
    res.status(200).redirect(`${process.env.CLIENT_URL}/main/${JSON.stringify(profile)}/${accessToken}`)
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/failed', successRedirect: '/success', }),);
router.delete("/logout", (req, res) => {
    req.logout();
    res.status(200)
})


module.exports = router;