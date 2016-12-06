var express = require('express');
var router = express.Router();
var models = require('../../models');
var session = require('express-session');

// List
router.get('/', function(req, res) {
	models.ItemBrand.findAll({
        order : 'id ASC',
    }).then(function(itemBrandSvArr) {
        if(itemBrandSvArr) {
            res.contentType('application/json');
            res.send(itemBrandSvArr);
        }
        else
            res.send({error:true});
    });
});

// Create
router.post('/', function(req, res) {
	models.ItemBrand.findOne({
	    where: {
	        name: req.body.name
	    }
	}).then(function(itemBrand){
	    if (itemBrand === null) {
            models.ItemBrand.create(req.body).then(function() {
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
	models.ItemBrand.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(itemBrand) {
        if (itemBrand !== null) {
            res.contentType('application/json');
            res.send(itemBrand);
        } else {
            res.send({
                error: true
            });
        }
    });
});

//Update
router.put('/:id', loadUser, function(req, res) {
    models.ItemBrand.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(itemBrand) {
        if (itemBrand !== null) {
            itemBrand.updateAttributes(req.body).then(function() {
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
	models.ItemBrand.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(itemBrand) {
        if (itemBrand !== null) {
            itemBrand.destroy().then(function() {
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
