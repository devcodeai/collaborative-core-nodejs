import { pool } from '../../database/config.js';

// campuses: id, university_name, location, website

export const getCampuses = async (_, res) => {
  try {
    const statement = 'SELECT * FROM campuses';
    const [rows] = await pool.query(statement);
    res.status(200).json({
      status: 200,
      message: 'Success',
      data: rows
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: 'Not Found'
    });
  }
};

export const getCampusById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM campuses WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Campus with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: rows[0]
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message
    });
  }
};

export const createCampus = async (req, res) => {
  try {
    const { university_name, location, website } = req.body;
    const statement =
      'INSERT INTO campuses (university_name, location, website) VALUES (?, ?, ?)';
    const [result] = await pool.execute(statement, [
      university_name,
      location,
      website
    ]);
    res.status(201).json({
      status: 201,
      message: 'Success',
      data: {
        id: result.insertId,
        university_name,
        location,
        website
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message
    });
  }
};

export const updateCampusById = async (req, res) => {
  try {
    const id = req.params.id;
    const { university_name, location, website } = req.body;
    const statement = 'SELECT * FROM campuses WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Campus with ID ${id} Not Found`
      });
    }

    const updateStatement =
      'UPDATE campuses SET university_name=?, location=?, website=? WHERE id=?';
    await pool.execute(updateStatement, [
      university_name,
      location,
      website,
      id
    ]);

    const selectStatement = 'SELECT * FROM campuses WHERE id=?';
    const [updatedRows] = await pool.execute(selectStatement, [id]);

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: updatedRows[0]
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message
    });
  }
};

export const deleteCampusById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM campuses WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Campus with ID ${id} Not Found`
      });
    }

    const deleteStatement = 'DELETE FROM campuses WHERE id=?';
    await pool.execute(deleteStatement, [id]);

    res.status(200).json({
      status: 200,
      message: 'Success',
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message
    });
  }
};
