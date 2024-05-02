// import mysql, { PoolOptions } from 'mysql2';

// const access: PoolOptions = {
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'learn_sequelize',
// };

// export default mysql.createPool(access).promise();

import { Sequelize } from 'sequelize';

export default new Sequelize('learn_sequelize', 'root', '', {
  dialect: 'mysql',
  logging: false,
  host: 'localhost',
  port: 3306, //optional
});
