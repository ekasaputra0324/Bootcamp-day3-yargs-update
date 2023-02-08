const readline = require('readline');
const fs = require('fs');
const path = require('path');
const validator = require('validator');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var pathFile = "data/contact.json";

//function raeadline  
const questions = (ask) => {
    /*
    promise di gunakan sebagai agar si rl 
    lanjut ke pertanyaan brikutnya 
    */ 
    return new Promise((resolve) => {
        rl.question(ask, function (answer) {
            resolve(answer);
        });
    });
}
/*
functio deleted data menhapus 
berdasarkan deleted 
*/ 
const deleteContacts = (name) => {
    console.log(name);
    fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) throw err;
        if (!err) {
            
            let parse = JSON.parse(data);
            // find data berdasarkan naama yang telah di inputkan
            let get = parse.find(parse => parse.nama.toLowerCase() !== name.toLowerCase());
            // penimimpaan data dengan metode find
            let newData = JSON.stringify(get);
            console.log(get);
            fs.writeFile(pathFile,newData , 'utf8', (err, data) => {
                if (err) throw err;
                if (!err) {
                    console.log(`Data ${name} successfully deleted`);
                }
            });
            
        }
    });
}


/*
function listlistContact di gunakan untuk menampilkan list 
dari data
*/ 

const listContact = () => {
    fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) throw err;
        if (!err) {
            let parse = JSON.parse(data);
            console.log(parse);
            i = 1
            // forech mengeluarkan semua data yang aada di dalam array
            parse.forEach(data =>{
                console.log(i, data.nama  +" -- " +data.nomer);
              i++;
            });
        }
    })
}


/*
function update data berdasarkan
nama
*/ 
const updateContact = (oldName,newName, email,mobile) => {
    // mengambil data dari file contact.json
    const contact = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
    // find data berdasarkan index data
    const index = contact.findIndex((contact) =>contact.nama.toLowerCase() === oldName.toLowerCase());
    // jikan index < 0 brati contact tidak di temukan
    if (index < 0) {
        console.log("contact not found");
        process.exit(0)
    }
    // mengecek nama contact apakah sudah tersedia
    const cekName = contact.find((contact) => contact.nama.toLowerCase() === newName.toLowerCase());
    if (cekName) {
        console.log("contact already exists");
        process.exit(0)
    }
    contact[index].nama = newName;
    // valodator email
    console.log(newName);
    if (email) {
        if (!validator.isEmail(email)) {
              console.log("email is not valid");              
        }
    }
    contact[index].email = email;
    // validator nomer tlpn
    if (mobile) {
        if (!validator.isMobilePhone(mobile, 'id-ID')) {
              console.log("mobile number is not valid");              
        }
    }
    contact[index].nomer = mobile;
    // menyimpan ulang data contact 
    fs.writeFileSync(pathFile, JSON.stringify(contact))
    console.log(`data ${oldName} successfully updated`);
    
}

/*
find contact di gunakan untuk mencari data contac berdasarkan 
nama pengunna
*/
const findContact = (name) => {
    fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) throw err;
        if (!err) {
            
            let parse = JSON.parse(data);
            // find data berdasarkan naama yang telah di inputkan
            let get = parse.find(parse => parse.nama === name);
            // error hendling jika email kosong
            if (get.email === undefined) {
                console.log(
                    get.nama,
                    "email kosong", 
                    get.nomer
                    );
            }else{
                console.log(
                    get.nama,
                    get.email, 
                    get.nomer
                    );
            }
        }
    });
}


// function save contact
const saveContact = (name, email,mobile) => {
    console.log(name, email, mobile);
        /*
        mengecek file contact.json di directory data
        */ 
    fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        // jika data file ada data akan di tampung di dalam variabel json
        json = JSON.parse(data);
        console.log(json);
        /*
        pengecekan apakah ada nama yang sama di dalam 
        contact.json yang berisi array data
        */ 
        for (let i = 0; i < json.length; i++) {
        if (json[i].nama.toLowerCase() == name.toLowerCase()) {
                console.log("name already exists");
            }
        }       
        // pengecekan email null atau tidak 
        if (email == null) {
            json.push({
                nama: name,
                nomer: mobile
            }); 
        }else{
            json.push({
                nama: name,
                email: email,
                nomer: mobile
            });
        /*
        parse data menjadi string dan akan di masukan ke dalam file 
            contact.json yang berisi array dan obaject
            */ 
            let parse = JSON.stringify(json);
            console.log(parse);
            fs.writeFile(pathFile, parse, 'utf8', (err) => {
        
                if (err) {
                    console.log(err);
                }
            })        
    }
    
})
}

module.exports = {questions, saveContact, findContact, listContact, deleteContacts, updateContact};
