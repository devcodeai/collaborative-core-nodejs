import { pool } from '../../database/config.js';

// majors: id, name, campus_id

export const getMajorsByCampusId = async (req, res) => {
  try {
    const campus_id = req.query.campus_id;
    const statement = 'SELECT * FROM majors WHERE campus_id=?';
    const [rows] = await pool.execute(statement, [campus_id]);
    if (rows.length === 0) {
      res.status(404).json({
        code: 404,
        message: `Majors with Campus ID ${campus_id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Fetch Majors with Campus ID ${campus_id} Success`,
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

export const getMajorById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM majors WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        code: 404,
        message: `Major with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Fetch Major with ID ${id} Success`,
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

export const createMajorByCampusId = async (req, res) => {
  try {
    const { name, campus_id } = req.body;
    if (!name || !campus_id) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request'
      });
    }

    const findCampusStatement = 'SELECT * FROM campuses WHERE id=?';
    const [campusRows] = await pool.execute(findCampusStatement, [campus_id]);
    if (campusRows.length === 0) {
      return res.status(404).json({
        code: 404,
        message: `Create Major Failed, Campus with ID ${campus_id} Not Found`
      });
    }

    const statement = 'INSERT INTO majors (name, campus_id) VALUES (?, ?)';
    const [result] = await pool.execute(statement, [name, campus_id]);

    res.status(200).json({
      code: 200,
      message: 'Create Major Success',
      data: {
        id: result.insertId,
        name,
        campus_id
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

export const updateMajorById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, campus_id } = req.body;
    if (!name || !campus_id) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request'
      });
    }

    const findCampusStatement = 'SELECT * FROM campuses WHERE id=?';
    const [campusRows] = await pool.execute(findCampusStatement, [campus_id]);
    if (campusRows.length === 0) {
      return res.status(404).json({
        code: 404,
        message: `Update Major Failed, Campus with ID ${campus_id} Not Found`
      });
    }

    const updateStatement = 'UPDATE majors SET name=?, campus_id=? WHERE id=?';
    const [updateResult] = await pool.execute(updateStatement, [
      name,
      campus_id,
      id
    ]);
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        message: `Major with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Update Major with ID ${id} Success`,
      data: {
        id: Number(id),
        name,
        campus_id
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

export const deleteMajorById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStatement = 'DELETE FROM majors WHERE id=?';
    const [deleteResult] = await pool.execute(deleteStatement, [id]);
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        message: `Major with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Delete Major with ID ${id} Success`
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: err.message
    });
  }
};
