import { pool } from '../../database/config.js';

export const getProducts = async (req, res) => {
  const { company_id } = req.query;
  const [rows] = await pool.query(
    'SELECT * from products WHERE company_id = ?;',
    company_id
  );

  if (!rows || rows.length == 0) {
    return res.status(404).json({
      message: 'Data Not Found'
    });
  }

  return res.status(200).json({
    message: 'Fetch Product Success',
    data: rows
  });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query('SELECT * from products WHERE id = ?;', id);

  if (!rows || rows.length == 0) {
    return res.status(404).json({
      message: 'Data Not Found'
    });
  }

  return res.status(200).json({
    message: 'Fetch Product Success',
    data: rows[0]
  });
};

export const createProduct = async (req, res) => {
  try {
    const { name, company_id } = req.body;
    if (!name || !company_id) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    }

    await pool.query(
      `
			INSERT into products (name, company_id)
			VALUES (?,?);
			`,
      [name, company_id]
    );

    return res.status(200).json({
      message: 'Create Product Success'
    });
  } catch (error) {
    // Foreign key error
    if (error.errno && error.errno === 1452) {
      return res.status(404).json({
        message: 'Data Not Found'
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { name, company_id } = req.body;
    const { id } = req.params;

    if (!name || !company_id) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    }

    const updated = await pool.query(
      `
    UPDATE products set 
      name = IFNULL(?, name), 
			company_id = IFNULL(?, company_id)
    WHERE id = ?;
    `,
      [name, company_id, id]
    );

    if (updated[0].affectedRows === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Product with ID ${id} Not Found`
      });
    }

    return res.status(200).json({
      message: 'Edit Product Success'
    });
  } catch (error) {
    // Foreign key error
    if (error.errno && error.errno === 1452) {
      return res.status(404).json({
        message: 'Data Not Found'
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleted = await pool.query(
    `
    DELETE FROM products WHERE id = ?;
    `,
    id
  );

  if (deleted[0].affectedRows === 0) {
    return res.status(404).json({
      status: 'Not Found',
      message: 'Data Not Found'
    });
  }

  return res.status(200).json({
    message: 'Delete Product Success'
  });
};
