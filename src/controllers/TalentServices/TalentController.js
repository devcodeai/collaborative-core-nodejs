import { pool } from '../../database/config.js';

// talents: id, name, email, skills

export const getTalents = async (_, res) => {
  try {
    const statement = 'SELECT * FROM talents';
    const [rows] = await pool.query(statement);
    if (rows.length === 0) {
      res.status(404).json({
        code: 404,
        message: 'Talents Not Found'
      });
    }

    res.status(200).json({
      code: 200,
      message: 'Fetch Talents Success',
      data: rows
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: err.message
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
        code: 404,
        message: `Talent with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Fetch Talent with ID ${id} Success`,
      data: rows[0]
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: err.message
    });
  }
};

export const createTalent = async (req, res) => {
  try {
    const { name, email, skills } = req.body;
    if (!name || !email || !skills) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request'
      });
    }

    const statement =
      'INSERT INTO talents (name, email, skills) VALUES (?, ?, ?)';
    const [result] = await pool.execute(statement, [name, email, skills]);

    res.status(200).json({
      code: 200,
      message: 'Create Talent Success',
      data: {
        id: result.insertId,
        name,
        email,
        skills
      }
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: err.message
    });
  }
};

export const updateTalentById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, skills } = req.body;
    if (!name || !email || !skills) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request'
      });
    }

    const updateStatement =
      'UPDATE talents SET name=?, email=?, skills=? WHERE id=?';
    const [updateResult] = await pool.execute(updateStatement, [
      name,
      email,
      skills,
      id
    ]);
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        message: `Talent with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Update Talent with ID ${id} Success`,
      data: {
        id: Number(id),
        name,
        email,
        skills
      }
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: err.message
    });
  }
};

export const deleteTalentById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStatement = 'DELETE FROM talents WHERE id=?';
    const [deleteResult] = await pool.execute(deleteStatement, [id]);
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        message: `Talent with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Delete Talent with ID ${id} Success`
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: err.message
    });
  }
};
