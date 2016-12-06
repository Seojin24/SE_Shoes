var express = require('express');
var router = express.Router();
var models = require('../../models');
var config = require('../../config/config.json')[process.env.NODE_ENV || "development"];
var session = require('express-session');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var multer = require('multer');
var async = require('async');

var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.db.upload_path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: _storage }, {limits: 1024 * 1024 * 20});

models.Item.belongsTo(models.ItemBrand);
models.Item.belongsTo(models.ItemType);

// List
router.get('/', function(req, res) {
	models.Item.findAll({
        order : 'id ASC',
        include: [{
            model: models.ItemType,
            attributes: ['name']
        },{
            model: models.ItemBrand,
            attributes: ['name']
        }]
    }).then(function(itemSvArr) {
        var itemCliArr = [];
        itemSvArr.forEach(function(itemSv){
            itemSv = itemSv.dataValues;
            itemSv.ItemTypeName = itemSv.ItemType.dataValues.name;
            itemSv.ItemBrandName = itemSv.ItemBrand.dataValues.name;
            delete itemSv.ItemType;
            delete itemSv.ItemBrand;
            itemCliArr.push(itemSv);
        });
        res.contentType('application/json');
        res.send(itemCliArr);
    });
});

// Create
router.post('/', upload.single('file'), function(req, res) {
    var newFilePath = path.join(config.db.upload_path, 'item', Date.now()+'-'+req.file.originalname);
    req.body.photo = newFilePath;
    models.Item.create(req.body).then(function(row) {
        mkdirp(path.join(config.db.upload_path, 'item'), function( err ) {
            if( err ) {
                row.destroy();
                res.send({error: true});
            }            
            fs.rename(req.file.path, newFilePath, function(err) {
                if( err ) {
                    row.destroy();
                    res.send({error: true});
                }
                else {
                    res.send({error: false});
                }
            });
        });
    }).catch(function() {
        res.send({error: true});
    });
});

// Read
router.get('/:id', function(req, res) {
	models.Item.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: models.ItemType,
            attributes: ['name']
        },{
            model: models.ItemBrand,
            attributes: ['name']
        }]
    }).then(function(itemSv) {
        itemSv = itemSv.dataValues;
        itemSv.ItemTypeName = itemSv.ItemType.dataValues.name;
        itemSv.ItemBrandName = itemSv.ItemBrand.dataValues.name;
        delete itemSv.ItemType;
        delete itemSv.ItemBrand;

        res.contentType('application/json');
        res.send(itemSv);
    });
});

//Update
router.put('/:id', function(req, res) {
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
router.delete('/:id', function(req, res) {
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
