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
        command: 'update',
        describe: 'update contact',
        builder: {
            Oldname: {
                describe: 'Contact Oldname',
                demandOption: true,
                type: 'string'
            },
            Newname: {
                describe: 'Contact Newname',
                demandOption: false,
                type: 'string'
            },
            email: {
                describe: 'Contact email',
                demandOption: false,
                type: 'string'
            },
            mobile: {
                describe: 'Contact mobile',
                demandOption: false,
                type: 'string'
            },
        },
        handler: (argv) => {
            contacts.updateContact(argv.Oldname, argv.Newname, argv.email,argv.mobile);
        }
    });
    // command add contact
    yargs.command({
        command: 'add',
        describe: 'add contact',
        builder: {
            name: {
                describe: 'Contact Oldname',
                demandOption: true,
                type: 'string'
            },
            email: {
                describe: 'Contact email',
                demandOption: true,
                type: 'string'
            },
            mobile: {
                describe: 'Contact mobile',
                demandOption: true,
                type: 'string'
            },
        },
        handler: (argv) => {
                contacts.saveContact(argv.name ,argv.email,argv.mobile);
        }
    });
    // commands deleted contact
    yargs.command({
        command: 'delete',
        describe: 'delete  contact',
        builder: {
            name: {
                describe: 'Contact Oldname',
                demandOption: true,
                type: 'string'
            },
            
        },
        handler: (argv) => {
            contacts.deleteContacts(argv.name);
        }
    });
}
main(); // initialize dari function main 
yargs.parse(); //instance dari yargs yang telah kita bikin agar dapat keluar ouput







