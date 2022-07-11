//import 
const express = require('express')
const sql = require('sqlite3');
const { open } = require('sqlite')
const uuid = require('uuid')
//init
const app = express()

//body data set
app.use(express.json({
    limit: "10mb"
}))


//3000
const port = 3000
//db
const db = open({
    filename: 'dp.sqlite',
    driver: sql.Database
})

//CRUD

//data ADD
app.post('/User/data/add', (req, res) => {
    const data = req.body;
    return db.then((e) => {
        e.get('SELECT email FROM USER WHERE email ="' + data.email + '"').then(tabeldata => {
            if (tabeldata === undefined) {
                const ID = uuid.v4(); //djfnsdfnfjdnsdkj
                e.exec(`INSERT INTO USER(Id,First_Name,Last_Name,username,email,phone) VALUES("${ID}","${data.firstname}","${data.lastname}","${data.username}","${data.email}","${data.phone}")`).then((e) => {
                    return res.send(ID)
                }).catch((e) => {
                    console.log(e);
                    return res.send("NOT ok")
                });

            } else {
                return res.send("email is exists")
            }
        })
    })
})
//data Delete
app.delete('/User/data/delet', (req, res) => { })
//data Update
app.put('/User/data/update', (req, res) => { })
//data read
app.get('/User/data/get/:ID', (req, res) => {
    const i = req.params.ID
    db.then(e => {
        e.get('SELECT * FROM USER WHERE Id="' + i + '"').then(data => {
            return res.json(data)
        })
    })
})

//starting server
app.listen(port, () => {
    db.then((e) => {
        e.exec(`CREATE TABLE IF NOT EXISTS USER (
            Id varcher(255),
            First_Name varcher(255),
            Last_Name varcher(255),
            username varcher(255),
            email varcher(255),
            phone int
        )`).then((e) => {
            console.log(e)
        })
    })

    console.log(`Example app listening on port ${port}`)
})
