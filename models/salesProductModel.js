const connection = require('./connection');

const salesProductModel = {

  async exists(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [data] = await connection.query(query, [id]);

    return data;
  },

  async create({ id, productId, quantity }) {
    const query = (
      ' INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)'
    );
    const data = await connection.query(query, [id, productId, quantity]);

    return data;
  },
};

module.exports = salesProductModel;