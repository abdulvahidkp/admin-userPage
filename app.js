const express = require('express');
const logger = require('morgan')
const PORT = 3000
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const hbs = require('express-handlebars')
const db = require('./config/connection')
const session = require('express-session')
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

db.connect((err) => {
    if (err) console.log(err + 'error occured db')
    else console.log('db connected');
})

app.set('views', './views')
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: './views/layout/', partialsDir: './views/partials' }))
app.use(logger('dev'))
app.use(session({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
    resave: false,
}))
app.use(cookieParser());
app.use((req, res, next) => {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next()
})


app.use('/', userRoutes);
app.use('/admin', adminRoutes);


app.listen(PORT, () => console.log('connected to PORT 3000'))