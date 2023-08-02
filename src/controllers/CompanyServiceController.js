import { pool } from '../database/config.js';

export const getCompanies = async (req, res) => {
  const [rows] = await pool.query(`
		SELECT * from companies;
	`);
  return res.status(200).json(rows);
};
