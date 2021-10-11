require ("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const {add, list, edit, remove} = require("./utils");


//function that shows what data is accessed with each action
const main = () => {
    if (argv.add) {
        add(argv.title, argv.author, argv.genre);
    } else if (argv.edit) {
        edit(argv.id, argv.title, argv.author, argv.genre);
    } else if (argv.list) {
        list(argv.title, argv.author, argv.genre);
    } else if (argv.remove) {
        remove(argv.id);
    }
}
main();