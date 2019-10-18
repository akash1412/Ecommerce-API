const express = require('express');
const morgan = require('morgan')

const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/appError');

const productsRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoutes')

const app = express();
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());


app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', usersRouter)

app.all('*', (req, res, next) => {
    // const err = new Error('cant find the defined route');
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError('can\'t find the defined route', 404))
})

app.use(globalErrorHandler)

// module.exports = app;
module.exports = app;