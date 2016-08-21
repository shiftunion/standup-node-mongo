var StandUp = require('../models/standUp.server.model.js');

exports.list = function(req, res) {
    var query = StandUp.find();

    query.sort({ createdOn: 'desc'})
        .limit(12)
        .exec(function(err, results){
            res.render('index', {title: 'standUp - List', notes: results});
        });

};

exports.filterByMember = function(req, res) {
    var query = StandUp.find();
    var filter = req.body.memberName;

    query.sort({ createdOn: 'desc' });

    if (filter.length > 0)
    {
        query.where({ memberName: filter})
    }

    query.exec(function(err, results) {
        res.render('index', { title: 'standUp - List', notes: results });
    });
};


exports.create = function(req, res) {
    var entry = new StandUp({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });

    entry.save(function (err) {
        if (err) {
            var errMsg = 'Sorry, there was an error saving the stand-up meeting note. ' + err;
            res.render('newnote', { title: 'standUp - New Note (error)', message: errMsg });
        }
        else {
            console.log('Stand-up meeting note was saved!');
            // Redirect to the home page to display list of notes...
            res.redirect(301, '/');
        }
    });

};

exports.getNote = function (req, res) {
    res.render('newnote', { title: 'standUp - New Note'});
}