module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "상품 이름"
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "상품 사이즈"
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "상품 가격"
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "상품 이미지"
        },
        explain: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "상품 설명"
        },
    }, {
        tableName: 'item',
        comment: "상품",
        classMethods: {
            associate: function(models) {
                Item.hasMany(models.Auction, {onDelete:'SET NULL', onUpdate:'CASCADE'});
                Item.hasMany(models.OrderItem, {onDelete:'CASCADE', onUpdate:'CASCADE'});
                Item.hasMany(models.Cart, {onDelete:'CASCADE', onUpdate:'CASCADE'});
            }
        }
    });
    return Item;
};