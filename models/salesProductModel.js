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

  async update({ saleId, productId, quantity }) {
    const query = `UPDATE StoreManager.sales_products
                    SET quantity = ?
                    WHERE sale_id = ? AND product_id = ?`;
    await connection.query(query, [quantity, saleId, productId]);
  },
};

module.exports = salesProductModel;