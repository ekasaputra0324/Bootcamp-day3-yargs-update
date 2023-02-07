const validator = require('validator');
const fs = require('fs');
const yargs = require('yargs');
const contacts = require('./contacts')
const readline = require('readline');
const {
    resolve
} = require('path');


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
    dengan flag dan tipe data yang sudah di kita set di builder dengan output object
    */ 
    yargs.command({
        command: 'add',
        describe: 'add new contact',
        builder: {
            name: {
                describe: 'Contact Name',
                demandOption: true,
                type: 'string'
            },
            email: {
                describe: 'Contact Email',
                demandOption: false,
                type: 'string'
            },
            mobile: {
                describe: 'Contact Mobile',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            email = argv.email;
            mobile = argv.mobile;
            name = argv.name;
            //pengecekan value data dari handler yang telah kita inputkan 
            if (email === undefined) {
                if (validator.isMobilePhone(mobile, 'id-ID') == false) {
                    console.log("mobile is not valid");
                } else {
                    console.log("data saved successfully");
                    contacts.saveContact(argv.name, null , argv.mobile);
                }
            } else {
                if (validator.isEmail(argv.email) === false) {
                    console.log("email is not valid");
                } else if (validator.isMobilePhone(mobile, 'id-ID') == false) {
                    console.log("mobile is not valid");
                }else{
                    // menyimpan ke dalam contact.json dengan memangil function contact yang telah di bikin  
                    console.log("data saved successfully");
                    contacts.saveContact(argv.name, argv.email, argv.mobile);
                }
            }
        }
    });
}
main(); // initialize dari function main 
yargs.parse(); //instance dari yargs yang telah kita bikin agar dapat keluar ouput







