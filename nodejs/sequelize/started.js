const Sequelize = require('sequelize');
let sequelize = new Sequelize('test_sequelize', 'dev', '123456', {
  host: '172.16.150.148',
  dialect: 'mysql',
  // 测试环境的engine为MYISAM
  define: { engine: 'MYISAM' },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true 如果表已经存在，将会丢弃表
User.sync({force: false}).then(() => {
  // 表已创建
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

