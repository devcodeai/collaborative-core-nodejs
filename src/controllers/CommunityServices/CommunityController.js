import { pool } from '../../database/config.js';

// communities: id, name, description, members

export const getCommunities = async (_, res) => {
  try {
    const statement = 'SELECT * FROM communities';
    const [rows] = await pool.query(statement);
    if (rows.length === 0) {
      res.status(404).json({
        code: 404,
        message: 'Communities Not Found'
      });
    }

    res.status(200).json({
      code: 200,
      message: 'Fetch Communities Success',
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

export const getCommunityById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM communities WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        code: 404,
        message: `Community with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Fetch Community with ID ${id} Success`,
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

export const createCommunity = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    if (!name || !description || !members) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request'
      });
    }

    const statement =
      'INSERT INTO communities (name, description, members) VALUES (?, ?, ?)';
    const [result] = await pool.execute(statement, [
      name,
      description,
      members
    ]);

    res.status(200).json({
      code: 200,
      message: 'Create Community Success',
      data: {
        id: result.insertId,
        name,
        description,
        members
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

export const updateCommunityById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, members } = req.body;
    if (!name || !description || !members) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request'
      });
    }

    const updateStatement =
      'UPDATE communities SET name=?, description=?, members=? WHERE id=?';
    const [updateResult] = await pool.execute(updateStatement, [
      name,
      description,
      members,
      id
    ]);
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        message: `Community with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Update Community with ID ${id} Success`,
      data: {
        id: Number(id),
        name,
        description,
        members
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

export const deleteCommunityById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStatement = 'DELETE FROM communities WHERE id=?';
    const [deleteResult] = await pool.execute(deleteStatement, [id]);
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        code: 404,
        message: `Community with ID ${id} Not Found`
      });
    }

    res.status(200).json({
      code: 200,
      message: `Delete Community with ID ${id} Success`
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: err.message
    });
  }
};
