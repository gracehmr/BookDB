const fs = require("fs");
const path = require("path");
const { nanoid, customAlphabet } = require("nanoid");
const dataPath = path.join(process.env.DATA_LOCATION, "data.json");

//for writing json files
const saveInfo = (data) => {
    try {
        if (!fs.existsSync(process.env.DATA_LOCATION)) {
            fs.mkdirSync(process.env.DATA_LOCATION);
        }
        fs.writeFileSync(dataPath, JSON.stringify(data))
    } catch(error){
        console.log(error);
    }
};

//for loading json files
const loadInfo = () => {
    try {
        return JSON.parse(fs.readFileSync(dataPath).toString());
    } catch(error) {
        return [];
    }
};




//create the unique ID for each piece of data
const makeID = () => customAlphabet(process.env.CHARACTERS, parseInt(process.env.LENGTH))();

const id = makeID;

//add the data (title, author, genre, and id (which is made by makeID function) )
const add = (title, author, genre) => {
    saveInfo([...loadInfo(), { id, title, author, genre }])
};


//displays the data added to the JSON file
const list = (title, author, genre) => {
    console.log(loadInfo());
};


//allows us to edit any data added to the JSON file
const edit = (title, author, genre) => {
    const book = remove(title);
    if (title !== book.title) {
        add(title)
    } else if (author !== book.author){
        add(author)
    } else if (genre !== book.genre) {
        add(genre)
    }
};


//removes data from the JSON file by the id provided - filters through the data
const remove = (id) => {
    const book = loadInfo().find((book) => book.id === id);
    const bookId = (book) => book.id !== id;
    saveInfo(loadInfo().filter(bookId));
    return book;
};


module.exports = {add, list, edit, remove};