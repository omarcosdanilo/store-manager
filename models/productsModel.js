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

  async delete(id) {
    const query = 'DELETE FROM StoreManager.products WHERE id = ?;';

    await connection.query(query, [id]);
  },

  async getByQuery(searchTerm) {
    const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
    const search = `%${searchTerm}%`;
    const [result] = await connection.query(query, [search]);

    return result;
  },
};

module.exports = productsModel;