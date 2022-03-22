const { Router } = require('express');
const router = new Router();

router.get('/', (req, res) => res.send('Api google auth2'));

module.exports = router;