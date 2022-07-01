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

};

module.exports = productsModel;