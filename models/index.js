const { DataTypes } = require("sequelize");
const { connection } = require("../connection")

const Author = connection.define("Author", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
        indexes: [{unique: true, fields: ["name"]}]
});

const Genre = connection.define("Genre", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, { });
    
const Book = connection.define("Book", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["name"]}]
});

Book.belongsTo(Author, {onDelete: "cascade"});

module.exports = { Author, Genre, Book };