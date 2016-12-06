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
            include: {
                model: models.ItemBrand,
                attributes: ['name']
            },
            include: {
                model: models.ItemType,
                attributes: ['name']
            }
        }
    }).then(function(auctionSvArr) {
        console.log(auctionSvArr);
        res.send(auctionSvArr);
        /*var auctionCliArr = [];
        auctionSvArr.forEach(function(auctionSv) {
            var auctionCli = {
                id : auctionSv.id,
                bidPrice : auctionSv.bidPrice,
                auctionStart : auctionSv.auctionStart,
                auctionEnd : auctionSv.auctionEnd,
                itemId : auctionSv.ItemId,
                title : auctionSv.Items[0].title,
                size : auctionSv.Items[0].size,
                photo : auctionSv.Items[0].photo,
                price : auctionSv.Items[0].price,
                brandName : auctionSv.Items[0].ItemBrands[0].name,
                typeName : auctionSv.Items[0].ItemTypes[0].name
            };
            auctionCliArr.push(auctionCli);
        });
        res.contentType('application/json');
        res.send(auctionCliArr);*/
    });
});

// Read
router.get('/:id', function(req, res) {
    models.Auction.findOne({
        order : 'id ASC',
        where : 'id : req.params.id',
        include: {
            model: models.Item,
            attributes: ['title', 'size', 'price', 'photo'],
            include: {
                model: models.ItemBrand,
                attributes: ['name']
            },
            include: {
                model: models.ItemType,
                attributes: ['name']
            }
        }
    }).then(function(auctionSv) {
        console.log(auctionSv);
        res.send(auctionSv);
        /*
        var auctionCli = {
            id : auctionSv.id,
            bidPrice : auctionSv.bidPrice,
            auctionStart : auctionSv.auctionStart,
            auctionEnd : auctionSv.auctionEnd,
            title : auctionSv.Items[0].title,
            size : auctionSv.Items[0].size,
            photo : auctionSv.Items[0].photo,
            price : auctionSv.Items[0].price,
            brandName : auctionSv.Items[0].ItemBrands[0].name,
            typeName : auctionSv.Items[0].ItemTypes[0].name
        };
        res.contentType('application/json');
        res.send(userCli);*/
    });
});

//입찰
router.put('/:id', function(req, res) {
    req.body.password = sha256(req.body.password);
    models.User.findOne({
        where: {
            user_id: req.params.id,
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

// Create
router.post('/admin', loadUser, function(req, res) {
    models.User.findOne({
        where: {
            user_id: req.body.user_id
        }
    }).then(function(user){
        if (user === null) {
            req.body.password = sha256(req.body.password);
            req.body.type = 1;

            models.User.create(req.body).then(function() {
                res.send({
                    error: false
                });
            }).catch( function ( error ) {
                res.send({ emailConflict: true });
            });
        } else {
            res.send({ idConflict: true });
        }
    });

});

router.put('/admin/:id', loadUser, function(req, res) {
    models.User.findOne({
        where: {
            user_id: req.params.id
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
router.delete('/:id', loadUser, function(req, res) {
	models.User.findOne({
        where: {
            user_id: req.params.id
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
            res.redirect('"/main#/"');
        }
    }
    else {
        res.redirect('"/main#/"');
    }
}

module.exports = router;
