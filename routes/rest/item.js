var express = require('express');
var router = express.Router();
var models = require('../../models');
var session = require('express-session');

models.Item.belongsTo(models.ItemBrand);
models.Item.belongsTo(models.ItemType);

// List
router.get('/', function(req, res) {
	models.Item.findAll({
        order : 'id ASC',
        include: {
            model: models.ItemBrand,
            attributes: ['name']
        },
        include: {
            model: models.ItemType,
            attributes: ['name']
        }
    }).then(function(itemSvArr) {
        var itemCliArr = [];
        itemSvArr.forEach(function(itemSv) {
            var itemCli = {};
            itemCli.id = itemSv.id;
            itemCli.title = itemSv.title;
            itemCli.size = itemSv.size;
            itemCli.price = itemSv.price;
            itemCli.photo = itemSv.photo;
            itemCli.explain = itemSv.explain;
            itemCli.createdAt = itemSv.createdAt;
            itemCli.brandName = itemSv.ItemBrands[0].dataValues.name;
            itemCli.typeName = itemSv.ItemTypes[0].dataValues.name;
            itemCliArr.push(itemCli);
        });
        res.contentType('application/json');
        res.send(itemCliArr);
    });
});

// Create
router.post('/', function(req, res) {
	models.Item.findOne({
	    where: {
	        title: req.body.title
	    }
	}).then(function(item){
	    if (item === null) {
            models.Item.create(req.body).then(function() {
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
	models.Item.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: models.ItemBrand,
            attributes: ['name']
        },
        include: {
            model: models.ItemType,
            attributes: ['name']
        }
    }).then(function(itemSv) {
        if (itemSv !== null) {
            var itemCli = {};
            itemCli.id = itemSv.id;
            itemCli.title = itemSv.title;
            itemCli.size = itemSv.size;
            itemCli.price = itemSv.price;
            itemCli.photo = itemSv.photo;
            itemCli.explain = itemSv.explain;
            itemCli.createdAt = itemSv.createdAt;
            itemCli.updatedAt = itemSv.updatedAt;
            itemCli.brandName = itemSv.ItemBrands[0].dataValues.name;
            itemCli.typeName = itemSv.ItemTypes[0].dataValues.name;

            res.contentType('application/json');
            res.send(itemCli);
        } else {
            res.send({
                error: true
            });
        }
    });
});

//Update
router.put('/:id', loadUser, function(req, res) {
    models.Item.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(item) {
        if (item !== null) {
            item.updateAttributes(req.body).then(function() {
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
	models.Item.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(item) {
        if (item !== null) {
            item.destroy().then(function() {
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
