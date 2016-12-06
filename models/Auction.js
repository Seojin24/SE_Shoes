module.exports = function(sequelize, DataTypes) {
    var Auction = sequelize.define("Auction", {
        bidPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "경매 입찰금액"
        },
        auctionStart: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "경매 시작 날짜"
        },       
        auctionEnd: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "경매 종료 날짜"
        }
    }, {
        tableName: 'auction',
        comment: "경매",
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Auction;
};