import { pool } from '../../database/config.js';

// talents: id, name, email, skills

export const getTalents = async (_, res) => {
  try {
    const statement = 'SELECT * FROM talents';
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

export const getTalentById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM talents WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Talent with ID ${id} Not Found`
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

export const createTalent = async (req, res) => {
  try {
    const { name, email, skills } = req.body;
    const statement =
      'INSERT INTO talents (name, email, skills) VALUES (?, ?, ?)';
    const [result] = await pool.execute(statement, [name, email, skills]);
    res.status(201).json({
      status: 201,
      message: 'Success',
      data: {
        id: result.insertId,
        name,
        email,
        skills
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message
    });
  }
};

export const updateTalentById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, skills } = req.body;
    const statement = 'SELECT * FROM talents WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Talent with ID ${id} Not Found`
      });
    }

    const updateStatement =
      'UPDATE talents SET name=?, email=?, skills=? WHERE id=?';
    await pool.execute(updateStatement, [name, email, skills, id]);

    const selectStatement = 'SELECT * FROM talents WHERE id=?';
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

export const deleteTalentById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM talents WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Talent with ID ${id} Not Found`
      });
    }

    const deleteStatement = 'DELETE FROM talents WHERE id=?';
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
