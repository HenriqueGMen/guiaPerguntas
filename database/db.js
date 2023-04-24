import { Sequelize } from "sequelize";

const connection = new Sequelize('guiaperguntas', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

export default connection;