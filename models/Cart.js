module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
    }, {
        tableName: 'cart',
        comment: "장바구니",
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Cart;
};