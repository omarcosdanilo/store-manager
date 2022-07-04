const connection = require('./connection');

const salesModel = {

  async create() {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [data] = await connection.query(query);
    return data.insertId;
  },

  async getAll() {
    const query = 'SELECT sp.sale_id, s.date, sp.product_id, sp.quantity '
      + 'FROM StoreManager.sales_products AS sp '
      + 'INNER JOIN StoreManager.sales AS s '
      + 'ON sp.sale_id = s.id '
      + 'ORDER BY sp.sale_id, sp.product_id;';
    const [data] = await connection.query(query);

    return data;
  },

  async exists(id) {
    const query = 'SELECT 1 FROM StoreManager.sales WHERE id = ?;';

    const [[data]] = await connection.query(query, [id]);

    return !!data;
  },

  async getById(id) {
      const query = `SELECT sp.sale_id as saleId, s.date, sp.product_id as productIdte, sp.quantity
        FROM StoreManager.sales_products as sp
        INNER JOIN StoreManager.sales as s
        ON s.id =  sp.sale_id
        WHERE sp.sale_id = ?;`;
    
    const [data] = await connection.query(query, [id]);

    return data;
  },
};

module.exports = salesModel;