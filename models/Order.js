module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "주문 시간"
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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