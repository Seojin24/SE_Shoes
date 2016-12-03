module.exports = function(sequelize, DataTypes) {
    var ItemType = sequelize.define("ItemType", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "상품 항목 이름"
        }
    }, {
        tableName: 'item_type',
        comment: "상품 항목",
        classMethods: {
            associate: function(models) {
                ItemType.hasMany(models.Item, {onDelete:'CASCADE', onUpdate:'CASCADE'});
            }
        }
    });
    return ItemType;
};