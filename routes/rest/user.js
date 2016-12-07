var express = require('express');
var router = express.Router();
var models = require('../../models');
var sha256 = require('sha256');
var session = require('express-session');

// List
router.get('/', function(req, res) {
	models.User.findAll({
        order : 'id ASC'
    }).then(function(userSvArr) {
        var userCliArr = [];
        userSvArr.forEach(function(userSv) {
        	delete userSv.password;
            var userCli = {};
            userCli.id = userSv.id;
            userCli.name = userSv.name;
            userCli.email = userSv.email;
            userCli.wallet = userSv.wallet;
            userCli.mileage = userSv.mileage;
            userCli.phone = userSv.phone;
            userCli.address = userSv.address;
            userCli.type = userSv.type;
            userCli.createdAt = userSv.createdAt;
            userCli.updatedAt = userSv.updatedAt;
            userCliArr.push(userCli);
        });
        res.contentType('application/json');
        res.send(userCliArr);
    });
});

// Create
//input value(email,name,password,phone,address)
router.post('/', function(req, res) {
	models.User.findOne({
	    where: {
	        email: req.body.email
	    }
	}).then(function(user){
	    if (user === null) {
	        req.body.password = sha256(req.body.password);
            req.body.type = 1;
            req.body.mileage = 1000;

            models.User.create(req.body).then(function(user) {
                res.send({
                    error: false
                });
            }).catch( function ( error ) {
                res.send({ error: true, msg:error });
            });
	    } else {
	    	res.send({ error: true, msg: 'emailConflict' });
	    }
	});
});

// Read
router.get('/:email', function(req, res) {
	models.User.findOne({
        where: {
            email: req.params.email
        }
    }).then(function(userSv) {
        if (userSv !== null) {
            var userCli ={};
            userCli.id = userSv.id;
            userCli.name = userSv.name;
            userCli.email = userSv.email;
            userCli.wallet = userSv.wallet;
            userCli.mileage = userSv.mileage;
            userCli.phone = userSv.phone;
            userCli.address = userSv.address;
            userCli.type = userSv.type;
            userCli.createdAt = userSv.createdAt;
            userCli.updatedAt = userSv.updatedAt;

            res.contentType('application/json');
            res.send(userCli);
        } else {
            res.send({
                error: true
            });
        }
    });
});

// 개인정보 변경
//input value(password+@)
//세션이용으로 변경
router.put('/:email', function(req, res) {
	req.body.password = sha256(req.body.password);
    models.User.findOne({
        where: {
            email: req.params.email,
			password: req.body.password
        }
    }).then(function(user) {
        if (user !== null) {
            user.updateAttributes(req.body).then(function() {
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

//password 변경
//세션이용으로 변경
router.put('/password/:email', function(req, res) {
    models.User.findOne({
        where: {
            email: req.params.email,
            password: sha256(req.body.oldPassword)
        }
    }).then(function(user) {
        var result = {};
        req.body.password = sha256(req.body.password);
        if (user !== null) {
            user.updateAttributes(req.body).then(function() {
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

//회원 자체 탈퇴
//비밀번호를 쳐야 탈퇴가능
router.delete('/', function(req, res) {
    models.User.findOne({
        where: {
            email: req.session.user.email,
            password: sha256(req.body.password)
        }
    }).then(function(user) {
        if (user !== null) {
            user.destroy().then(function() {
                delete req.session.user;
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

//admin 기능
router.put('/admin/:email', loadUser, function(req, res) {
    models.User.findOne({
        where: {
            email: req.params.email
        }
    }).then(function(user) {
        if(req.body.password)
            req.body.password = sha256(req.body.password);
        if (user !== null) {
            user.updateAttributes(req.body).then(function() {
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

// Delete - admin 쪽 회원 탈퇴
router.delete('/:email', loadUser, function(req, res) {
	models.User.findOne({
        where: {
            email: req.params.email
        }
    }).then(function(user) {
        if (user !== null) {
            user.destroy().then(function() {
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