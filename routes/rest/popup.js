var express = require('express');
var router = express.Router();
var models = require('../../models');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var multer = require('multer');
var config = require('../../config/config.json')[process.env.NODE_ENV || "development"];
var moment = require('moment');
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

// popup과 관련된 서버사이드 함수
router.get('/', function(req, res) {
    models.Popup.findAll({
        order: 'id DESC'
    }).then(function (popupList) {
        popupList.forEach( function (val) {
            var getDateStr = function (date) {
                var dateStr = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                return dateStr;
            };
            val.startDate = getDateStr(val.startDate);
            val.endDate = getDateStr(val.endDate);
        });
        res.send(popupList);
    });
});

router.get('/today', function(req, res, next) {
    models.Popup.findAll({
        where: {
            startDate: {$lte: models.sequelize.fn('CURDATE')},
            endDate: {$gte: models.sequelize.fn('CURDATE')} 
        }
    }).then(function(popupList) {
        res.send(popupList);
    }).catch(function() {
        res.send({error: false});
    });
});

router.post('/', upload.single('file'), loadUser, function(req, res) {
    models.Popup.create({
        title: req.body.title,
        picture: "temp",
        link: req.body.link,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }).then(function(row) {
        mkdirp(path.join(config.db.upload_path, 'popup'), function( err ) {
            if( err ) {
                row.destroy();
                res.send({error: true});
            }
            var newFilePath = path.join(config.db.upload_path, 'popup', Date.now()+'-'+req.file.originalname);
            fs.rename(req.file.path, newFilePath, function(err) {
                if( err ) {
                    row.destroy();
                    res.send({error: true});
                }
                else {
                    row.update({picture: newFilePath});
                    res.send({error: false});
                }
            });
        });
    }).catch(function() {
        res.send({error: true});
    });
});

router.delete('/:id', loadUser, function(req, res) {
    models.Popup.findOne({where: {id: req.params.id}}).then(function (popup) {
        if( popup != null)
            popup.destroy();
        else
            res.send({error: true});
    });
    res.send({error: false});
});

router.put('/:id', loadUser, function(req, res) {
    models.Popup.findOne({where: {id: req.params.id}}).then(function (popup) {
        if( popup != null)
            row.update(req.body);
        else
            res.send({error: true});
    });
    res.send({error: false});
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