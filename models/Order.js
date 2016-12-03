module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "주문 시간"
        }
    }, {
        tableName: 'order',
        comment: "주문",
        classMethods: {
            associate: function(models) {
                Order.hasMany(models.OrderItem, {onDelete:'CASCADE', onUpdate:'CASCADE'});
            }
        }
    });
    return Order;
};