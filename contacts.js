const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

// function save contact
const saveContact = (nama, email,nomerhp) => {
        /*
        mengecek file contact.json di directory data
        */ 
    fs.readFile('data/contact.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        // jika data file ada data akan di tampung di dalam variabel json
        json = JSON.parse(data);
        /*
        pengecekan apakah ada nama yang sama di dalam 
        contact.json yang berisi array data
        */ 
        for (let i = 0; i < json.length; i++) {
        if (json[i].nama.toLowerCase() == nama.toLowerCase()) {
                console.log("name already exists");
            }else{
                // pengecekan email null atau tidak 
                if (email == null) {
                    json.push({
                        nama: nama,
                        nomer: nomerhp
                    }); 
                }else{
                    json.push({
                        nama: nama,
                        email: email,
                        nomer: nomerhp
                    });
                }
                /*
                parse data menjadi string dan akan di masukan ke dalam file 
                contact.json yang berisi array dan obaject
                */ 
                let parse = JSON.stringify(json);
                fs.writeFile('data/contact.json', parse, 'utf8', (err) => {
        
                    if (err) {
                        console.log(err);
                    }
                })        
            }       
        }
        
    })
}

module.exports = {questions, saveContact};
