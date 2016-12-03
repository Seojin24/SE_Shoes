module.exports = function(sequelize, DataTypes) {
    var Attachment = sequelize.define("Attachment", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "파일 제목"
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "파일 경로"
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "파일 타입(=확장자)"
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "파일 크기"
        }
    }, {
        tableName: 'attachment',
        comment: "게시판 첨부파일",
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Attachment;
};