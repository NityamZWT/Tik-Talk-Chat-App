import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('tik_talk_db', 'root', 'this.admin', {
  host: 'localhost',
  dialect: 'mysql',
});

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { dbConnect, sequelize };
