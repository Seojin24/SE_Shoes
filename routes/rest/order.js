var express = require('express');
var router = express.Router();
var models = require('../../models');
var session = require('express-session');
var sequelize = require('sequelize');

models.OrderItem.belongsTo(models.Item);
models.OrderItem.belongsTo(models.Order);
models.Order.belongsTo(models.User);

// one orderList
router.get('/:id', function(req, res) {
	models.OrderItem.findAll({
        order : 'id ASC',
        where : {OrderId:id},
        include: {
            model: models.Item,
            attributes: ['title', 'size', 'price', 'photo'],
            order: [['createdAt', 'DESC']]
        }
    }).then(function(orderItemSvArr) {
        var orderItemCliArr = [];
        orderItemSvArr.forEach(function(orderItemSv) {
            var orderItemCli = {};
            orderItemCli.id = orderItemSv.id;
            orderItemCli.itemId = orderItemSv.ItemId;
            orderItemCli.title = orderItemSv.Items[0].dataValues.title;
            orderItemCli.size = orderItemSv.Items[0].dataValues.size;
            orderItemCli.price = orderItemSv.Items[0].dataValues.price;
            orderItemCli.createdAt = orderItemSv.createdAt;
            orderItemCli.updatedAt = orderItemSv.updatedAt;
            orderItemCliArr.push(orderItemCli);
        });
        res.contentType('application/json');
        var orderItemList = {
            id : orderItemCliArr[0].id,
            orderItem : orderItemCliArr
        }
        res.send(orderItemList);
    });
});

// many orderList
// session user id로 order list 가져와서 orderItem 테이블과 join그리고 item 테이블과 join
router.get('/list', function(req, res) {
    models.OrderItem.findAll({
        order : 'id ASC',
        where : {OrderId:id},
        include: {
            model: models.Item,
            attributes: ['title', 'size', 'price', 'photo'],
            order: [['createdAt', 'DESC']]
        }
    }).then(function(orderItemSvArr) {
        var orderItemCliArr = [];
        orderItemSvArr.forEach(function(orderItemSv) {
            var orderItemCli = {};
            orderItemCli.id = orderItemSv.id;
            orderItemCli.itemId = orderItemSv.ItemId;
            orderItemCli.title = orderItemSv.Items[0].dataValues.title;
            orderItemCli.size = orderItemSv.Items[0].dataValues.size;
            orderItemCli.price = orderItemSv.Items[0].dataValues.price;
            orderItemCli.createdAt = orderItemSv.createdAt;
            orderItemCli.updatedAt = orderItemSv.updatedAt;
            orderItemCliArr.push(orderItemCli);
        });
        res.contentType('application/json');
        var orderItemList = {
            id : orderItemCliArr[0].id,
            orderItem : orderItemCliArr
        }
        res.send(orderItemList);
    });
});

// Create
// input itemList, price, discount
router.post('/', function(req, res) {
    var orderInput = {
        UserId : req.session.user.id,
        price : req.body.price,
        discount : req.body.discount
    };
    console.log(orderInput);
    models.Order.create(orderInput)
    .then(function(row) {
        req.body.itemList.forEach(function(itemCli) {
            models.OrderItem.create({
                ItemId:itemCli.ItemId,
                OrderId:row.id
            });
        });
    })
    .then(function(){
        models.Cart.destroy({
            where:{Userid : req.session.user.id}
        });
    }).catch(function(err){
        res.send({error:true, msg:err});
    });
    res.send({error:false});
    /*sequelize.transaction(function(t){
            req.body.itemList.forEach(function(itemCli) {
                models.OrderItem.create({
                    ItemId:itemCli.id,
                    OrderId:order.id
                }, {transaction:t});
            }).catch(function(err){
                t.rollback()
                res.send({error:true});
            });

            t.done(function(){
                console.log("transaction done");
                res.send({error:false});
            })
        })*/
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
