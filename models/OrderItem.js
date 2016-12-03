module.exports = function(sequelize, DataTypes) {
    var OrderItem = sequelize.define("OrderItem", {
    }, {
        tableName: 'order_item',
        comment: "주문",
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return OrderItem;
};