var express = require('express');
var router = express.Router();
var models = require('../../models');
var session = require('express-session');

models.Auction.belongsTo(models.Item);
models.Auction.belongsTo(models.User);
models.Item.belongsTo(models.ItemBrand);
models.Item.belongsTo(models.ItemType);


//Auction List
//Auction View
//Bid
//(admin)midify
//(admin)delete
//(admin)insert

// List
//auction에 itemId 조인, brandId typeId 조인
//오늘 날짜가 종료날짜보다 전인것만. 아니면 프론트딴에서 종료된건 disable하게
//select auction.*, item.title, item.size, item.price, item.photo, item.explain, item_brand.name, item_type.name from auction left join item on auction.ItemId = item.id left join item_brand on item.ItemBrandId = item_brand.id left join item_type on item.ItemTypeId = item_type.id
router.get('/', function(req, res) {
	models.Auction.findAll({
        order : 'id ASC',
        include: {
            model: models.Item,
            attributes: ['title', 'size', 'price', 'photo'],
            include: [{
                model: models.ItemBrand,
                attributes: ['name']
            }, {
                model: models.ItemType,
                attributes: ['name']
            }]
        }
    }).then(function(auctionSvArr) {
        var auctionCliArr = [];
        auctionSvArr.forEach(function(auctionSv){
            var auctionCli = {};
            auctionSv = auctionSv.dataValues;
            auctionSv.Item = auctionSv.Item.dataValues;
            auctionCli.id = auctionSv.id;
            auctionCli.bidPrice = auctionSv.bidPrice;
            auctionCli.auctionStart = auctionSv.auctionStart;
            auctionCli.auctionEnd = auctionSv.auctionEnd;
            auctionCli.ItemId = auctionSv.ItemId;
            auctionCli.UserId = auctionSv.UserId;
            auctionCli.title = auctionSv.Item.title;
            auctionCli.size = auctionSv.Item.size;
            auctionCli.price = auctionSv.Item.price;
            auctionCli.photo = auctionSv.Item.photo;
            auctionCli.itemBrandName = auctionSv.Item.ItemBrand.dataValues.name;
            auctionCli.itemTypeName = auctionSv.Item.ItemType.dataValues.name;

            auctionCliArr.push(auctionCli);
        })

        res.contentType('application/json');
        res.send(auctionCliArr);
    });
});

// Read
router.get('/:id', function(req, res) {
    models.Auction.findOne({
        order : 'id ASC',
        where : {id : req.params.id},
        include: {
            model: models.Item,
            attributes: ['title', 'size', 'price', 'photo'],
            include: [{
                model: models.ItemBrand,
                attributes: ['name']
            }, {
                model: models.ItemType,
                attributes: ['name']
            }]
        }
    }).then(function(auctionSv) {
        var auctionCli = {};
        auctionSv = auctionSv.dataValues;
        auctionSv.Item = auctionSv.Item.dataValues;
        auctionCli.id = auctionSv.id;
        auctionCli.bidPrice = auctionSv.bidPrice;
        auctionCli.auctionStart = auctionSv.auctionStart;
        auctionCli.auctionEnd = auctionSv.auctionEnd;
        auctionCli.ItemId = auctionSv.ItemId;
        auctionCli.UserId = auctionSv.UserId;
        auctionCli.title = auctionSv.Item.title;
        auctionCli.size = auctionSv.Item.size;
        auctionCli.price = auctionSv.Item.price;
        auctionCli.photo = auctionSv.Item.photo;
        auctionCli.itemBrandName = auctionSv.Item.ItemBrand.dataValues.name;
        auctionCli.itemTypeName = auctionSv.Item.ItemType.dataValues.name;
        
        res.contentType('application/json');
        res.send(auctionCli);
    });
});

//입찰
router.put('/:id', function(req, res) {
    models.Auction.findOne({
        where: {
            id: req.params.id,
        }
    }).then(function(auction) {
        if (auction !== null) {
            auction.updateAttributes(req.body).then(function() {
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

// Create
router.post('/admin', function(req, res) {
    req.body.bidPrice=0;
    console.log(req.body);
    models.Auction.create(req.body).then(function() {
        res.send({
            error: false
        });
    }).catch( function ( error ) {
        if(error)
            res.send({ error: true });
        else
            res.send({ error: false});
    });
});

router.put('/admin/:id', function(req, res) {
    models.Auction.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(auction) {
        if (auction !== null) {
            auction.updateAttributes(req.body).then(function() {
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
router.delete('/admin/:id', function(req, res) {
	models.Auction.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(auction) {
        if (auction !== null) {
            auction.destroy().then(function() {
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
