var StandUp = require('../models/standUp.server.model.js');

exports.list = function (req, res) {
    var query = StandUp.find();
    query.sort({
        createOn: 'desc'
    }).limit(12).exec(function (err, results) {
        res.render('index', {
            title: 'StandUp - List',
            notes: results
        });
    });
};

exports.filterByMember = function (req, res) {
    var query = StandUp.find();
    var filter = req.body.memberName;

    query.sort({
        createOn: 'desc'
    });

    if (filter.length > 0) {
        query.where({
            memberName: filter
        });
    }

    query.exec(function (err, results) {
        res.render('index', {
            title: 'StandUp - List',
            notes: results
        });
    });
};

exports.create = function (req, res) {
    var entry = new StandUp({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });

    entry.save();

    res.redirect(301, '/');
};

exports.getNote = function (req, res) {
    res.render('newnote', {
        title: 'StandUp - New Note'
    });
};