import { pool } from '../../database/config.js';

export const getProducts = async (req, res) => {
  try {
    const { company_id } = req.query;
    const [rows] = await pool.query(
      'SELECT * from products WHERE company_id = ?;',
      company_id
    );
    if (!rows || rows.length == 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Products with Company ID ${company_id} Not Found`
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: `Fetch Products with Company ID ${company_id} Success`,
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal Server Error',
      error: err.message
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * from products WHERE id = ?;', id);
    if (!rows || rows.length == 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Product with ID ${id} Not Found`
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: `Fetch Product with ID ${id} Success`,
      data: rows[0]
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal Server Error',
      error: err.message
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, company_id } = req.body;
    if (!name || !company_id) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Bad Request'
      });
    }

    const findCompanyStatement = 'SELECT * FROM companies WHERE id=?';
    const [companyRows] = await pool.execute(findCompanyStatement, [
      company_id
    ]);
    if (companyRows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Create Product Failed, Company with ID ${company_id} Not Found`
      });
    }

    const [result] = await pool.query(
      `
			INSERT into products (name, company_id)
			VALUES (?,?);
			`,
      [name, company_id]
    );

    return res.status(200).json({
      status: 'Success',
      message: 'Create Product Success',
      data: {
        id: result.insertId,
        name,
        company_id
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal Server Error',
      error: err.message
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { name, company_id } = req.body;
    const { id } = req.params;
    if (!name || !company_id) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Bad Request'
      });
    }

    const findCompanyStatement = 'SELECT * FROM companies WHERE id=?';
    const [companyRows] = await pool.execute(findCompanyStatement, [
      company_id
    ]);
    if (companyRows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Update Product Failed, Company with ID ${company_id} Not Found`
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
      status: 'Success',
      message: `Update Product with ID ${id} Success`,
      data: {
        id: Number(id),
        name,
        company_id
      }
    });
  } catch (error) {
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
  try {
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
        message: `Product with ID ${id} Not Found`
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: `Delete Product with ID ${id} Success`,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: 'Internal Server Error',
      error: err.message
    });
  }
};
