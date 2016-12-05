var express = require('express');
var router = express.Router();
var models = require('../../models');
var session = require('express-session');

models.Cart.belongsTo(models.Item);
models.Cart.belongsTo(models.User);

// 특정 유저의 카트 정보 session 이용
router.get('/', function(req, res) {
	models.Cart.findAll({
        order : 'id ASC',
        where : {UserId : req.session.user.id},
        include: {
            model: models.Item,
            attributes: ['title', 'size', 'price', 'photo'],
            order: [['createdAt', 'DESC']]
        }
    }).then(function(cartSvArr) {
        var cartCliArr = [];
        cartSvArr.forEach(function(cartSv) {
            var cartCli = {};
            cartCli.id = cartSv.id;
            cartCli.itemId = cartSv.ItemId;
            cartCli.userId = cartSv.UserId;
            cartCli.title = cartSv.title;
            cartCli.size = cartSv.size;
            cartCli.price = cartSv.price;
            cartCli.photo = cartSv.photo;
            cartCli.createdAt = cartSv.createdAt;
            cartCli.updatedAt = cartSv.updatedAt;
            userCliArr.push(cartCli);
        });
        res.contentType('application/json');
        res.send(cartCliArr);
    });
});

// 카트 추가
router.post('/', function(req, res) {
    if (req.session.user !== null) {
        req.body.UserId = req.session.user.id;

        models.Cart.create(req.body).then(function() {
            res.send({
                error: false
            });
        }).catch( function ( error ) {
            res.send({ error : true });
        });
    } else {
    	res.send({ error : true });
    }
});

// 카트에 상품 삭제
router.delete('/:id', function(req, res) {
	models.Cart.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(cart) {
        if (cart !== null) {
            cart.destroy().then(function() {
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

module.exports = router;