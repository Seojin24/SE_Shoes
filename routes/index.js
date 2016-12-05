var express = require('express');
var router = express.Router();
var models = require('../models');
var config = require('../config/config.json')[process.env.NODE_ENV || "development"];
var sha256 = require('sha256');
var session = require('express-session');
var nodemailer = require('nodemailer');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout/mainLayout');
});

// 로그인
router.post('/login', function(req, res, next) {
    models.User.findOne({ // 유저 검색
        where: {
          	email: req.body.email,
            password: sha256(req.body.password)
        }
    }).then(function(user) {
        if (user !== null) {
            req.session.user = user.dataValues; // 세션 추가 등록
            req.session.user.time = new Date();
            req.session.user.ip = req.connection.remoteAddress;
            delete req.session.user.password;
            res.send(req.session.user);
        } else {
            res.send({
                error: true
            });
        }
    });
});

// 로그아웃
router.get('/logout', function(req, res, next) {
    req.session.user = {};
    delete req.session.user;
    res.send({
        error: false 
    });
});

router.get('/getSession', function(req, res, next) {
    if(req.session.user)
        res.send(req.session.user);
    else
    	res.send({error:true});
});

//찾기
//input value(name, phone)
router.post('/finding', function(req, res, next) {
    models.User.findOne({ // 유저 검색
        where: {
            name: req.body.name,
            phone: req.body.phone
        }
    }).then(function(user) {
        if(user !==null) 
            res.send({email:user.email});
        else
            res.send({result: false});
    });
});

router.post('/findPw', function(req, res, next) {
    models.User.findOne({
        where: {
            email: req.body.email,
            name: req.body.name
        }
    }).then(function(user) {
        if( user === null) 
            res.send({ error: true });
        else {
            function getRandomPassword(length) {
                var password = "";
                for(var i=0; i<length; i++) {
                    var baseChar;
                    var randNum = Math.floor(Math.random()*3);
                    if( randNum == 0 )
                        baseChar = "0".charCodeAt(0);
                    else if( randNum == 1 )
                        baseChar = "a".charCodeAt(0);
                    else
                        baseChar = "A".charCodeAt(0);

                    if( randNum != 0 )
                        randNum = Math.floor(Math.random()*26);
                    else
                        randNum = Math.floor(Math.random()*10);


                    baseChar += randNum;
                    password += String.fromCharCode(baseChar);
                }

                return password;
            }

            // 랜덤한 비밀번호를 만들고 DB에 입력
            var newPassword = getRandomPassword(8);
            user.set('password', sha256(newPassword));

            // SMTP를 이용해 생성된 비밀번호 메일로 전송
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.email.id,
                    pass: config.email.password
                }
            });
            transporter.sendMail({
                 to: user.email,
                 subject: '[SE Shoes] ' + user.name + '님의 임시 비밀번호입니다.',
                 text: newPassword + ' 로 로그인 하신 후 비밀번호를 변경해주세요.'
            }, function (error, response) {
                var resData;
                // 이상없이 메일이 갔을 경우 DB 내용 최종 변경, 아닐 경우 에러처리
                if( error ) {
                    resData = { mailSuccess : false };
                    console.log(error);
                } else {
                    resData = { mailSuccess : true };
                    user.save();
                }
                transporter.close();
                res.send(resData);
            });
        }
    });

});

router.post('/uploader', multipartMiddleware, function(req, res) {
    fs.readFile(req.files.upload.path, function (err, data) {
        var file_name = Date.now() + "-" + req.files.upload.name;
        var file_path = path.join(config.db.upload_path, 'images', file_name);
        mkdirp(path.join(config.db.upload_path, 'images'), function(err) {
            fs.writeFile(file_path, data, function (err) {
                if(!err) {
                    html = "";
                    html += "<script type='text/javascript'>";
                    html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                    html += "    var url     = \"/"+file_path.split("\\").join("/")+"\";";
                    html += "    var message = \"Uploaded file successfully\";";
                    html += "";
                    html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                    html += "</script>";
                    res.send(html);
                }
            });
        });
    });
});

module.exports = router;
