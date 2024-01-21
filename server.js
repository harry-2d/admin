const app = require('./app');
const connectDatabase = require('./config/databaseConnection');

//connecting  to the database
connectDatabase();
const server = app.listen(3000, () => {
    console.log(
        `server connected with http://localhost:4000 with dev mode`
    )
});

app.listen(4000);