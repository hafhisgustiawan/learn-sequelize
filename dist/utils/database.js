import { Sequelize } from 'sequelize';
export default new Sequelize('learn_sequelize', 'root', '', {
    dialect: 'mysql',
    logging: false,
    host: 'localhost',
    port: 3306,
});
