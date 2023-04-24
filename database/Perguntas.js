import { Sequelize } from "sequelize";
import connection from "./db.js";

const Pergunta = connection.define("perguntas", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Pergunta.sync({force: false}).then(() => {});

export default Pergunta;