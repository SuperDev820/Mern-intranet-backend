const express = require('express');
const router = express.Router();


router.route('/').get(function(req, res) {
    res.end('ok');
});

module.exports = router;