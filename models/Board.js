module.exports = function(sequelize, DataTypes) {
    var Board = sequelize.define("Board", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "글의 제목"
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "글의 내용"
        },       
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "작성자 이름"
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "게시판 타입 1:공지사항 2:QnA 3:환불/교환문의"
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "환불 교환문의에 한해 답변"
        }
    }, {
        tableName: 'board',
        comment: "게시판_게시글",
        classMethods: {
            associate: function(models) {
                Board.hasMany(models.Attachment,{onDelete:'SET NULL',onUpdate:'CASCADE'});
            }
        }
    });
    return Board;
};