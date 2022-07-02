const connection = require('./connection');

const salesModel = {

  async create() {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [data] = await connection.query(query);
    return data.insertId;
  },
};

module.exports = salesModel;