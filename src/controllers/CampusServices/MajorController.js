import { pool } from '../../database/config.js';

// majors: id, name, campus_id

export const getMajorsByCampusId = async (req, res) => {
  try {
    const campus_id = req.query.campus_id;
    const statement = 'SELECT * FROM majors WHERE campus_id=?';
    const [rows] = await pool.execute(statement, [campus_id]);
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

export const getMajorById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM majors WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Major with ID ${id} Not Found`
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

export const createMajorByCampusId = async (req, res) => {
  try {
    const { name, campus_id } = req.body;
    const statement = 'INSERT INTO majors (name, campus_id) VALUES (?, ?)';
    const [result] = await pool.execute(statement, [name, campus_id]);
    res.status(201).json({
      status: 201,
      message: 'Success',
      data: {
        id: result.insertId,
        name,
        campus_id
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message
    });
  }
};

export const updateMajorById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, campus_id } = req.body;
    const statement = 'SELECT * FROM majors WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Major with ID ${id} Not Found`
      });
    }

    const updateStatement = 'UPDATE majors SET name=?, campus_id=? WHERE id=?';
    await pool.execute(updateStatement, [name, campus_id, id]);

    const selectStatement = 'SELECT * FROM majors WHERE id=?';
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

export const deleteMajorById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM majors WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Major with ID ${id} Not Found`
      });
    }

    const deleteStatement = 'DELETE FROM majors WHERE id=?';
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
