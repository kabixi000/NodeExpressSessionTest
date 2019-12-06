const express = require('express')
const ejs = require('ejs')
const bodyParser = require("body-parser")
const session = require("express-session");

const app = express()

app.set('ejs', ejs.renderFile)

app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: "sikounoha",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 1000 }
}));

app.get('/', (req, res) => {
    let message = 'メッセージなし'
    if (req.session.message != undefined) {
        message = "最新のメッセージ：" + req.session.message;
    }

    res.render('index.ejs', {
        message: message
    })
})

app.post("/", (req, res) => {
    let message = req.body.message
    req.session.message = message

    res.render('index.ejs', {
        message: message
    })
});

app.listen(3000, () => {
    console.log('start')
})