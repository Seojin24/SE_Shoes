var express = require('express');
var router = express.Router();
var models = require('../../models');
var session = require('express-session');

// List
router.get('/', function(req, res) {
	models.ItemType.findAll({
        order : 'id ASC',
    }).then(function(itemTypeSvArr) {
        if(itemTypeSvArr) {
            res.contentType('application/json');
            res.send(itemTypeSvArr);
        }
        else
            res.send({error:true});
    });
});

// Create
router.post('/', function(req, res) {
	models.ItemType.findOne({
	    where: {
	        name: req.body.name
	    }
	}).then(function(itemType){
	    if (itemType === null) {
            models.ItemType.create(req.body).then(function() {
                res.send({
                    error: false
                });
            }).catch( function ( error ) {
                res.send({ error: true });
            });
	    } else {
	    	res.send({ error: true });
	    }
	});
});

// Read
router.get('/:id', function(req, res) {
	models.ItemType.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(itemType) {
        if (itemType !== null) {
            res.contentType('application/json');
            res.send(itemType);
        } else {
            res.send({
                error: true
            });
        }
    });
});

//Update
router.put('/:id', loadUser, function(req, res) {
    models.ItemType.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(itemType) {
        if (itemType !== null) {
            itemType.updateAttributes(req.body).then(function() {
                res.send({
                    error: false
                });
            });
        } else {
            res.send({
                error: true
            });
        }
    });
});

// Delete
router.delete('/:id', loadUser, function(req, res) {
	models.ItemType.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(itemType) {
        if (itemType !== null) {
            itemType.destroy().then(function() {
                res.send({
                    error: false
                });
            });
        } else {
            res.send({
                error: true
            });
        }
    });
});

function loadUser(req,res,next) {
    if(req.session.user){
        if(req.session.user.type == 0){ //관리자
            next();
        }else{ //일반 사용자
            res.redirect('"/#/"');
        }
    }
    else {
        res.redirect('"/#/"');
    }
}

module.exports = router;