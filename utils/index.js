const { Author, Genre, Book } = require("../models");


const add = async ({add, name, id}) => {
    if (add === "author") {
        await Author.create({name});
    } else if (add === "genre") {
        const author = await Author.findByPk(id);
        await Genre.create({name, AuthorId: author.id});
    } else if (add === "book") {
        const genre = await Genre.findByPk(id);
        await Book.create({name, GenreId: genre.id});
    }
}


const list = async ({list}) => {
   let results = [];

   if (list === "authors") {
       results = await Author.findAll({attributes: ["id", "name"]});
   } else if (list === "genres") {
       results = await Genre.findAll({attributes: ["id", "name"]});
   } else if (list === "books") {
       results = await Book.findAll({attributes: ["id", "name"]});
   }
   console.log(results.map(result => result.dataValues));
}

const update = async ({update, id, name, genre, author}) => {
    if (update === "author") {
        const author = await Author.findByPk(id);
        await Author.update({ name: name || author.name }, { where: {id} })
    } else if (update === "genre") {
        const text = await Genre.findByPk(id);
        await Genre.update({ name: name || text.name, AuthorId: author || text.AuthorId }, { where: {id} });
    } else if (update === "book") {
        const book = await Book.findByPk(id);
        await Book.update({ name: name || book.name, GenreId: genre || book.genreId }, {where: {id} });
    }
}

const remove = async ({remove, id}) => {
    if (remove === "author") {
        await Author.destroy({ where: { id } });
    } else if (remove === "genre") {
        await Genre.destroy({ where: { id } });
    } else if (remove === "book") {
        await Book.destroy({ where: { id } });
    }    
}; 

module.exports = {add, list, update, remove};