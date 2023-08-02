import { pool } from '../../database/config.js';

// communities: id, name, description, members

export const getCommunities = async (_, res) => {
  try {
    const statement = 'SELECT * FROM communities';
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

export const getCommunityById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM communities WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Community with ID ${id} Not Found`
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

export const createCommunity = async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const statement =
      'INSERT INTO communities (name, description, members) VALUES (?, ?, ?)';
    const [result] = await pool.execute(statement, [
      name,
      description,
      members
    ]);
    res.status(201).json({
      status: 201,
      message: 'Success',
      data: {
        id: result.insertId,
        name,
        description,
        members
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message
    });
  }
};

export const updateCommunityById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, members } = req.body;
    const statement = 'SELECT * FROM communities WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Community with ID ${id} Not Found`
      });
    }

    const updateStatement =
      'UPDATE communities SET name=?, description=?, members=? WHERE id=?';
    await pool.execute(updateStatement, [name, description, members, id]);

    const selectStatement = 'SELECT * FROM communities WHERE id=?';
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

export const deleteCommunityById = async (req, res) => {
  try {
    const id = req.params.id;
    const statement = 'SELECT * FROM communities WHERE id=?';
    const [rows] = await pool.execute(statement, [id]);
    if (rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: `Community with ID ${id} Not Found`
      });
    }

    const deleteStatement = 'DELETE FROM communities WHERE id=?';
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
