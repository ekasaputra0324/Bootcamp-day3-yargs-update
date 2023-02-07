const yargs = require('yargs');
const contacts = require('./contacts')
yargs.command({
    command:'add',
    describe: 'add new contact',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type:'string'
        },
        email: {
            describe: 'Contact Email',
            demandOption: false,
            type:'string'
        },
        mobile: {
            describe: 'Contact Mobile',
            demandOption: true,
            type:'string'
        }
    },
    handler: (argv) => {
        
        contacts.saveContact(argv.name, argv.email, argv.mobile);
        console.log(contacts);
    }
});
yargs.parse();