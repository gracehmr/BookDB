require ("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { connection } = require("./connection");
const { Book } = require("./models");
const argv = yargs(hideBin(process.argv)).argv;
const {add, list, update, remove} = require("./utils/");

const main = async () => {
    try {
        await connection.authenticate();
        await Book.sync({alter: true});
        console.log(`Connection to ${process.env.DB_HOST} established`)
        
        if (argv.add) {
        await add(argv.title, argv.author, argv.genre);
    } else if (argv.list) {
        await list();
    } else if (argv.remove) {
        await remove(argv.id);
    } else if (argv.update) {
      await update(argv.id, argv.title, argv.author, argv.genre);
    }
        await connection.close();
    } catch (error) {
        console.error(`Unable to connect to the DB ${error}`);
    }
    
    process.exit();
}

main();
