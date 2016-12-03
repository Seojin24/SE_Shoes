module.exports = function(sequelize, DataTypes) {
    var ItemBrand = sequelize.define("ItemBrand", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "브랜드 이름"
        }
    }, {
        tableName: 'item_brand',
        comment: "상품 브랜드",
        classMethods: {
            associate: function(models) {
                ItemBrand.hasMany(models.Item, {onDelete:'CASCADE', onUpdate:'CASCADE'});
            }
        }
    });
    return ItemBrand;
};