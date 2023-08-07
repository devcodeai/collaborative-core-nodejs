import NodeCache from 'node-cache';
import { pool } from '../../database/config.js';

const myCache = new NodeCache();

export const getMajorsByCampusId = async (req, res) => {
  try {
    const campus_id = req.query.campus_id;

    const cachedData = myCache.get(`major-${campus_id}`);
    if (cachedData) {
      return res.status(200).json({
        status: 'Success',
        message: `Fetch Major with ID ${campus_id} Success`,
        data: cachedData
      });
    }

    const statement = 'SELECT * FROM majors WHERE campus_id=?';
    const [rows] = await pool.execute(statement, [campus_id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Majors with Campus ID ${campus_id} Not Found`
      });
    }

    // set cache for 10 minutes
    myCache.set(`major-${campus_id}`, rows[0], 60 * 10);
    res.status(200).json({
      status: 'Success',
      message: `Fetch Majors with Campus ID ${campus_id} Success`,
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

export const getMajorById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM majors WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Major with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      status: 'Success',
      message: `Fetch Major with ID ${id} Success`,
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

export const createMajorByCampusId = async (req, res) => {
  try {
    const { name, campus_id } = req.body;
    if (!name || !campus_id) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Bad Request'
      });
    }

    const findCampusStatement = 'SELECT * FROM campuses WHERE id=?';
    const [campusRows] = await pool.execute(findCampusStatement, [campus_id]);
    if (campusRows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Create Major Failed, Campus with ID ${campus_id} Not Found`
      });
    }

    const statement = 'INSERT INTO majors (name, campus_id) VALUES (?, ?)';
    const [result] = await pool.execute(statement, [name, campus_id]);

    res.status(200).json({
      status: 'Success',
      message: 'Create Major Success',
      data: {
        id: result.insertId,
        name,
        campus_id
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

export const updateMajorById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, campus_id } = req.body;
    if (!name || !campus_id) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Bad Request'
      });
    }

    const findCampusStatement = 'SELECT * FROM campuses WHERE id=?';
    const [campusRows] = await pool.execute(findCampusStatement, [campus_id]);
    if (campusRows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
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
        status: 'Not Found',
        message: `Major with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      status: 'Success',
      message: `Update Major with ID ${id} Success`,
      data: {
        id: Number(id),
        name,
        campus_id
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

export const deleteMajorById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStatement = 'DELETE FROM majors WHERE id=?';
    const [deleteResult] = await pool.execute(deleteStatement, [id]);
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Major with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      status: 'Success',
      message: `Delete Major with ID ${id} Success`,
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
