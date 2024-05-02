import app from './app.js';
import config from './utils/env.js';
import sequelize from './utils/database.js';
const port = config.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port} 👌`);
});
sequelize
    .sync({ alter: true })
    .then(() => {
    console.log('DB connection successfull! 🫰');
})
    .catch((err) => {
    console.log('💥DATABASE CONNECTION ERROR, shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('unhandledRejection', (err) => {
    console.log('💥UNHANDLED REJECTION, shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('uncaughtException', (err) => {
    console.log('💥UNCAUGHT EXCEPTION, shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('SIGTERM', () => {
    console.log('🙅‍♀️ SIGTERM RECEIVED. Shutting down...');
    server.close(() => {
        console.log('💥Process terminated!');
        process.exit(1);
    });
});
