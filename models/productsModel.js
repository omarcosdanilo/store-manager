const connection = require('./connection');

const productsModel = {
  async getAll() {
    const query = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.query(query);

    return products;
  },

  async getById(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [[product]] = await connection.query(query, [id]);

    return product;
  },

  async create(productName) {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
    const [data] = await connection.query(query, [productName]);

    return data;
  },

  async exists(id) {
    const query = 'SELECT 1 FROM StoreManager.products WHERE id = ?;';

    const [[data]] = await connection.query(query, [id]);

    return !!data;
  },

  async update(id, productName) {
    const query = `UPDATE StoreManager.products
              SET name = ?
              WHERE id = ?;`;
    
    await connection.query(query, [productName, id]);
  },
};

module.exports = productsModel;