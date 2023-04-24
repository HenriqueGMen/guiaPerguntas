import { Sequelize } from "sequelize";
import connection from "./db.js";

const Resposta = connection.define("repostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'perguntas',
      key: 'id'
    }
  }
});

Resposta.sync({ force: false });

export default Resposta;