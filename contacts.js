const readline = require('readline');
const fs = require('fs');

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
            let get = parse.filter(parse => parse.nama.toLowerCase() !== name.toLowerCase());
            // penimimpaan data dengan metode find
            let newData = JSON.stringify(get);
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
const saveContact = (nama, email,nomerhp) => {
        /*
        mengecek file contact.json di directory data
        */ 
    fs.readFile(pathFile, 'utf8', (err, data) => {
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
                fs.writeFile(pathFile, parse, 'utf8', (err) => {
        
                    if (err) {
                        console.log(err);
                    }
                })        
            }       
        }
        
    })
}

module.exports = {questions, saveContact, findContact, listContact, deleteContacts};
