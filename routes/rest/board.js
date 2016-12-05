var express = require('express');
var router = express.Router();
var models = require('../../models');
var session = require('express-session');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var multer = require('multer');
var config = require('../../config/config.json')[process.env.NODE_ENV || "development"];
var moment = require('moment');
var async = require('async');

//storage destination
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    cb(null, config.db.upload_path);
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: _storage }, {limits: 1024 * 1024 * 20})

models.Attachment.belongsTo(models.Board);

// list 출력을 위해서, contents, attachment 불필요
router.get('/list/?*', function(req, res) {
 
     models.Board.findAll({
        order : 'id DESC',
        where: { type: req.query.type }
        /*include: {
            model: models.Attachment,
            attributes: ['file_name', 'path'],
            order: [['createdAt', 'DESC']]
        }   */    
    }).then(function(boardSvArr) {
        var boardCliArr = [];

        boardSvArr.forEach(function(boardSv) {
            var boardCli = {
                id: boardSv.id,
                title: boardSv.title,
                author: boardSv.author,
                type: boardSv.type,
                time: moment(boardSv.updatedAt).format("YYYY-MM-DD")
            };
            /*if(boardSv.Attachments[0]){
                boardCli.file_name = boardSv.Attachments[0].dataValues.file_name;
                boardCli.path = boardSv.Attachments[0].dataValues.path;
            }*/
            boardCliArr.push(boardCli);
        });
        res.contentType('application/json');
        res.send(boardCliArr);
    });
});

// Create
// 일반 사용자가 공지사항, FAQ에 글 못쓰게 예외처리 필요
router.post('/', upload.single('file'), function(req, res,file) {
    var result = {};
    req.body.UserId = req.session.user.id;
    req.body.author = req.session.user.name;

    models.Board.create(req.body).then(function(boardPost) {
        async.each([req.file], function(file, callback) {
            if (file) {
                if (file.isFileSizeLimit) {
                    callback("파일 사이즈가 초과하였습니다. ( 최대 20MB )");
                } else {
                    var file_name = Date.now() + "-" + file.originalname;
                    var file_path = path.join(config.db.upload_path, 'attachment', file_name);
                    req.file.filename = file_name;

                    mkdirp(path.join(config.db.upload_path, 'attachment'), function(err) {
                        if (!err) {
                            fs.rename(file.path, file_path, function(err) {
                                if (!err) {
                                    req.body.BoardId = boardPost.id
                                    req.body.name = file.originalname;
                                    req.body.path = file_path;
                                    req.body.type = file.mimetype;
                                    req.body.size = file.size;
                                    models.Attachment.create(req.body).then(function(boardfile) {
                                        callback();
                                    });
                                } else callback(err);
                            });
                        } else callback(err);
                    });
                }
            } else callback();
        }, function(err) {
            if (!err) {
                res.send({
                    error : false,
                    id: boardPost.id
                });
            } else {
                boardPost.destroy().then(function() {
                    if (req.file) fs.unlinkSync(req.file.path);
                    res.send({
                        error : true,
                        text: err
                    });
                });
            }
        });
    });
});
 
router.get('post/:id', function(req, res) {
    models.Board.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: models.Attachment,
            attributes: ['file_name', 'path'],
            order: [['createdAt', 'DESC']]
        }
    }).then(function(boardCli) {
        if (boardCli !== null) {
            var boardPost = {
                id : boardCli.id,
                title : boardCli.title,
                contents : boardCli.contents,
                author : boardCli.author,
                type : boardCli.type,
                updatedAt : boardCli.updatedAt
            }
            if(boardCli.answer)
                boardPost.answer = boardCli.answer;

            if(boardCli.Attachments[0]){
                boardPost.file_name = boardCli.Attachments[0].dataValues.name;
                boardPost.path = boardCli.Attachments[0].dataValues.path;
            }
            res.send(boardPost);

            /*async.parallel({
                files: function(callback) {
                    models.sequelize.query(
                        'select file_name,path,type,size,downs,id from attachment where PostId=' + boardPost.id + ' order by id limit 0,2'
                    ).then(function(files) {
                        files=files[0];
                        if (files !== null) {
                            //files.forEach(function(file) {
                            //    file.link = '/file/' + path.basename(file.path);
                            //    delete file.path;
                            //});
                            callback(null, files);
                        } else callback(null, null);
                    });
                }
            },
            function(err, results) {
                models.sequelize.query('update post set cnt=cnt+1 where id=' + boardPost.id).then(function() {
                    boardPost.dataValues.time = moment(boardPost.updatedAt).format("YYYY-MM-DD");
                    boardPost.dataValues.files = results.files;
                    boardPost.cnt++;
                    boardPost.dataValues.error = false;
                    res.send(boardPost);
                });
            });*/
        }
        else {
            res.send({
                error: true
            });
        }
    });
});
 
// Update
// 일반사용자가 공지사항,FAQ를 수정하지 못하게 예외처리 필요
router.put('/:id', upload.single('file'), function(req, res,file) {
    models.Board.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(boardPost){
        boardPost.update(req.body);
        async.each([req.file], function(file, callback) {
            if (file) {
                var file_name = Date.now() + "-" + file.originalname;
                var file_path = path.join(config.db.upload_path, 'attachment', file_name);
                if (file.isFileSizeLimit) {
                    callback("파일 사이즈가 초과하였습니다. ( 최대 1GB )");
                } else {
                    mkdirp(path.join(config.db.upload_path, 'attachment'), function(err) {
                        if (!err) {
                            fs.rename(file.path, file_path, function(err) {
                                if (!err) {
                                    req.body.BoardId = boardPost.id
                                    req.body.name = file.originalname;
                                    req.body.path = file_path;
                                    req.body.type = file.mimetype;
                                    req.body.size = file.size;
                                    models.Attachment.findOne({
                                        where: {
                                            id: req.body.id                                            
                                        }
                                    }).then(function(boardFile){
                                        if(boardFile !==null) {
                                            boardFile.updateAttributes(req.body);
                                            callback(); 
                                        }
                                        else{
                                            models.Attachment.create(req.body).then(function(boardFile) {
                                                callback(); 
                                            });
                                        }
                                    });
                                } else callback(err);
                            });
                        } else callback(err);
                    });
                }
            } else callback();
        }, function(err) {
            if (!err) {
                res.send({
                    error : false,
                });
            } else {
                boardPost.destroy().then(function() {
                    if (req.file) fs.unlinkSync(req.file.path);
                    res.send({
                        error : true,
                        text: err
                    });
                });
            }
        });
    });
});

// Delete
// 일반사용자가 공지사항,FAQ를 삭제하지 못하게 예외처리 필요
router.delete('/:id', function(req, res, next) {
    models.Board.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(boardPost) {
        if (boardPost !== null) {
            boardPost.destroy().then(function() {
                res.send({
                    error: false,
                });
            });
        } else {
            res.send({
                error: true
            });
        }
    });
});


// File

router.get('/file/:file_name', function(req, res, next) {
    models.Attachment.findOne({
        where: {
            name: req.params.file_name
        }
    }).then(function(boardFile) {
        if (boardFile !== null)
            res.download(boardfile.path, boardfile.name);
        else next();
    });
});

/*router.delete('/file/:BoardPostId/:file_name', loadUser, function(req, res) {
    models.Attachment.findOne({
        where: {
            BoardPostId: req.params.id
        }
    }).then(function(boardFile) {
        if (boardFile !== null) {
            fs.unlinkSync(boardFile.path);
            boardFile.destroy().then(function() {
                res.send({
                    error: false,
                });
            });
        } else {
            res.send({
                error: true
            });
        }
    });
});
*/
function loadUser(req,res,next) {
    if(req.session.user){
        if(req.session.user.type == 0){ //관리자
            next();
        }else{ //일반 사용자
            res.redirect('"/main#/"');
        }
    }
    else {
        res.redirect('"/main#/"');
    }
}

module.exports = router;
