const { Book } = require("../models");


const add = async (title, author, genre) => {
    await Book.create({title, author, genre});
};


const list = async () => {
    const books = await Book.findAll();
        console.log("\n");
        for(book of books) {
            console.log(`ID:\t${book.id}\nTitle:\t${book.title}\nAuthor:\t${book.author}\nGenre:\t${book.genre}\n\n`)
    }
}

const update = async (id, title, author, genre) => {
    const book = Book.findAll({where: {id}});
    await Book.update({
        title: title || book.title,
        author: author || book.author,
        genre: genre || book.genre
    }, {
        where: {id}
    });
}

const remove = async (id) => {
    await Book.destroy({ where: { id } });
};

module.exports = {add, list, update, remove};