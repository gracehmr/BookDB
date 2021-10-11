const fs = require("fs");
const path = require("path");
const { title } = require("process");
const dataPath = path.join(process.env.DATA_LOCATION, "data.json");

//for writing a JSON file
const saveInfo = (info) => {
    try {
        if (!fs.existsSync(process.env.DATA_LOCATION)) {
            fs.mkdirSync(process.env.DATA_LOCATION);
        }
        fs.writeFileSync(dataPATH, JSON.stringify(info))
    } catch (error) {
        console.log(error)
        
    }
};

//for loading JSON files
const loadInfo = () => {
    try {
        return JSON.parse(fs.readFileSync(datapath).toString());    
    } catch (error) {
        return [];
    }
};

//add new information
const add = (title, author, genre) => {
    saveInfo([loadInfo(), {title, author, genre}])
};


//show all of the information added
const list = (title, author, genre) => {
    console.log(loadInfo());
}

//edit data added to the JSON file
const edit = (id, title, author, genre) => {
    const book = remove(title);
    if (title !== book.title) {
        add(title)
    } else if (author !== book.author){
        add(author)
    } else if (genre !== book.genre) {
        add(genre)
    }
}

//remove data from the JSON file when provide the information
const remove = (title, author, genre) => {
    const book = loadInfo().find((book) => book.title === title);
    const bookMatch = (book) => {
        book.title !== title;
        saveInfo(loadInfo().filter(bookMatch));
        return book;
    }
};

