var express = require('express');
var router = express.Router();
var standUpCtrl = require('../controllers/standup.server.controller.js');

/* GET home page. */
router.get('/', function (req, res, next) {

    return standUpCtrl.list(req, res);

});

// we have memeber filter
router.post('/', function (req, res, next) {

    return standUpCtrl.filterByMember(req, res);

});

router.get('/newnote', function (req, res) {

    return standUpCtrl.getNote(req, res)

});

router.post('/newnote', function (req, res) {

    return standUpCtrl.create(req, res);

});

module.exports = router;