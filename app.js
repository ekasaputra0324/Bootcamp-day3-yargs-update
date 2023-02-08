const validator = require('validator');
const fs = require('fs');
const yargs = require('yargs');
const contacts = require('./contacts')
const readline = require('readline');
const {
    resolve
} = require('path');
const { constants } = require('buffer');


// pengecekan folder data dan file json
var folderName = "data"
var filename = "data/contact.json";
if (!fs.existsSync(folderName)) {
console.log("create folder: " + folderName);
fs.mkdirSync(folderName);
fs.writeFileSync(filename, JSON.stringify([]));
}







// main app untuk menjalankan semmua printah dan fuction yang sudah di bikin  
const main = async () => {
    /*
    yargs command untuk membuat inputan dari di command line sesuai 
    dengan flag dan tipe data yang sudah di kita set di builder dengan output object / array
    */ 
    yargs.command({
        command: 'detail',
        describe: 'get detail contact',
        builder: {
            name: {
                describe: 'Contact Name',
                demandOption: true,
                type: 'string'
            },
        },
        handler: (argv) => {
            
            name = argv.name;
            // pemangilan fungsi find contact di main 
            contacts.findContact(name);
            
        }
    });
}
main(); // initialize dari function main 
yargs.parse(); //instance dari yargs yang telah kita bikin agar dapat keluar ouput







