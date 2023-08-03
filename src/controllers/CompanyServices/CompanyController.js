import { pool } from '../../database/config.js';

export const getCompanies = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * from companies;');
    if (!rows || rows.length == 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'Companies Not Found'
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: 'Fetch Companies Success',
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

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT * from companies WHERE id = ?;',
      id
    );
    if (!rows || rows.length == 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Company with ID ${id} Not Found`
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: `Fetch Company with ID ${id} Success`,
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

export const createCompany = async (req, res) => {
  try {
    const { name, address, email, phone } = req.body;
    if (!name || !address || !email || !phone) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Bad Request'
      });
    }

    const [result] = await pool.query(
      `
      INSERT into companies (name, address, email, phone)
      VALUES (?,?,?,?);
      `,
      [name, address, email, phone]
    );

    return res.status(200).json({
      status: 'Success',
      message: 'Create Company Success',
      data: {
        id: result.insertId,
        name,
        address,
        email,
        phone
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

export const editCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, email, phone } = req.body;
    if (!name || !address || !email || !phone) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Bad Request'
      });
    }

    const updated = await pool.query(
      `
      UPDATE companies set 
        name = IFNULL(?, name), 
        address = IFNULL(?, address),
        email = IFNULL(?, email),
        phone = IFNULL(?, phone)
      WHERE id = ?;
      `,
      [name, address, email, phone, id]
    );
    if (updated[0].affectedRows === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Company with ID ${id} Not Found`
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: `Update Company with ID ${id} Success`,
      data: {
        id: Number(id),
        name,
        address,
        email,
        phone
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

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query(
      `
      DELETE FROM companies WHERE id = ?;
      `,
      id
    );
    if (deleted[0].affectedRows === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Company with ID ${id} Not Found`
      });
    }

    return res.status(200).json({
      status: 'Success',
      message: `Delete Company with ID ${id} Success`,
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
