let express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const checkCookie = require('./middlewares/checkCookie');


const mainRouter = require('./routes/main');

/* Configuración motor de plantillas */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* MIDDLEWARES */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret : "secret",
  resave:false,
  saveUninitialized:true
}))
app.use(checkCookie);

/* RUTAS */
app.use('/', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(
    `Listening to Port: ${PORT}
http://localhost:${PORT}`
    );
})