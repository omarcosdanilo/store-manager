const connection = require('./connection');

const salesModel = {

  async create() {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [data] = await connection.query(query);
    return data.insertId;
  },

  async getAll() {
    const query = 'SELECT * FROM StoreManager.sales_products;';
    const [data] = await connection.query(query);

    return data;
  },
};

module.exports = salesModel;