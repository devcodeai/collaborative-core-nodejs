import { pool } from '../../database/config.js';

export const getCompanies = async (req, res) => {
  const [rows] = await pool.query('SELECT * from companies;');

  if (!rows || rows.length == 0) {
    return res.status(404).json({
      message: 'Data Not Found'
    });
  }

  return res.status(200).json({
    message: 'Fetch Company Success',
    data: rows
  });
};

export const getCompanyById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query('SELECT * from companies WHERE id = ?;', id);

  if (!rows || rows.length == 0) {
    return res.status(404).json({
      message: 'Data Not Found'
    });
  }
  return res.status(200).json({
    message: 'Fetch Company Success',
    data: rows[0]
  });
};

export const createCompany = async (req, res) => {
  const { name, address, email, phone } = req.body;

  if (!name || !address || !email || !phone) {
    return res.status(400).json({
      message: 'Bad Request'
    });
  }

  await pool.query(
    `
    INSERT into companies (name, address, email, phone)
    VALUES (?,?,?,?);
    `,
    [name, address, email, phone]
  );

  return res.status(200).json({
    message: 'Create Company Success'
  });
};

export const editCompany = async (req, res) => {
  const { id } = req.params;
  const { name, address, email, phone } = req.body;

  if (!name || !address || !email || !phone) {
    return res.status(400).json({
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
    message: 'Edit Company Success'
  });
};

export const deleteCompany = async (req, res) => {
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
      message: 'Data Not Found'
    });
  }

  return res.status(200).json({
    message: 'Delete Company Success'
  });
};
