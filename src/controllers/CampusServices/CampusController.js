import { pool } from '../../database/config.js';

// campuses: id, university_name, location, website

export const getCampuses = async (_, res) => {
  try {
    const statement = 'SELECT * FROM campuses';
    const [rows] = await pool.query(statement);
    if (rows.length === 0) {
      res.status(404).json({
        status: 'Not Found',
        message: 'Campuses Not Found'
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Fetch Campuses Success',
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

export const getCampusById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM campuses WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Campus with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      status: 'Success',
      message: `Fetch Campus with ID ${id} Success`,
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

export const createCampus = async (req, res) => {
  try {
    const { university_name, location, website } = req.body;
    if (!university_name || !location || !website) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Bad Request'
      });
    }

    const statement =
      'INSERT INTO campuses (university_name, location, website) VALUES (?, ?, ?)';
    const [result] = await pool.execute(statement, [
      university_name,
      location,
      website
    ]);

    res.status(200).json({
      status: 'Success',
      message: 'Create Campus Success',
      data: {
        id: result.insertId,
        university_name,
        location,
        website
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

export const updateCampusById = async (req, res) => {
  try {
    const id = req.params.id;
    const { university_name, location, website } = req.body;
    if (!university_name || !location || !website) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Bad Request'
      });
    }

    const updateStatement =
      'UPDATE campuses SET university_name=?, location=?, website=? WHERE id=?';
    const [updateResult] = await pool.execute(updateStatement, [
      university_name,
      location,
      website,
      id
    ]);
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Campus with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      status: 'Success',
      message: `Update Campus with ID ${id} Success`,
      data: {
        id: Number(id),
        university_name,
        location,
        website
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

export const deleteCampusById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStatement = 'DELETE FROM campuses WHERE id=?';
    const [deleteResult] = await pool.execute(deleteStatement, [id]);
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        status: 'Not Found',
        message: `Campus with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      status: 'Success',
      message: `Delete Campus with ID ${id} Success`,
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
