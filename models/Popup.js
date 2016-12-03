module.exports = function(sequelize, DataTypes) {
    var Popup = sequelize.define("Popup", {
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "팝업 출력 시작 날짜"
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "팝업 출력 종료 날짜"
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "팝업 이미지"
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
            comment: "팝업 클릭시 이동 링크"
        }
    }, {
        tableName: 'popup',
        comment: "팝업",
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Popup;
};