module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "이메일"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "유저 이름"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "비밀번호 sha256 hash 사용"
        },
        wallet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "가상지갑 금액"
        },
        mileage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "마일리지 금액"
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "유저 휴대전화 번호"
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "유저 집 주소"
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "유저 권한(관리자, 일반사용자)"
        }
    }, {
        tableName: 'user',
        comment: "유저",
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Board, {onDelete:'SET NULL', onUpdate:'CASCADE'});
                User.hasMany(models.Auction, {onDelete:'SET NULL', onUpdate:'CASCADE'});
                User.hasMany(models.Order, {onDelete:'SET NULL', onUpdate:'CASCADE'});
                User.hasMany(models.Cart, {onDelete:'CASCADE', onUpdate:'CASCADE'});                
            }
        }
    });
    return User;
};