import { createPool } from 'mysql2/promise';

export let pool;

// koneksi ke database
export const init = () => {
  try {
    pool = createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      database: process.env.MYSQL_DBNAME || 'devcode',
      password: process.env.MYSQL_PASSWORD || 'password',
      waitForConnections: true,
      connectionLimit: 100,
      queueLimit: 0
    });

    console.debug('Database connected!');
  } catch (error) {
    console.error('[Error]: ', error);
    throw new Error('Fail to connect database!');
  }
};

// migrasi database
export const migration = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // table companies
    await pool.query(
      `
				CREATE TABLE IF NOT EXISTS companies (
				id int not null auto_increment,
				name varchar(255) not null,
				address varchar(255) not null,
				email varchar(255) not null,
				phone varchar(255) not null,
				primary key (id)
				)
      `
    );

    // table products
    await pool.query(
      `
				CREATE TABLE IF NOT EXISTS products (
				id int not null auto_increment,
				name varchar(255) not null,
				company_id int not null,
        primary key (id),
        foreign key (company_id) REFERENCES companies(id) ON DELETE CASCADE
				)
      `
    );
    // table campuses
    await pool.query(
      `
				CREATE TABLE IF NOT EXISTS campuses (
				id int not null auto_increment,
				university_name varchar(255) not null,
				location varchar(255) not null,
				website varchar(255) not null,
        primary key (id)
				)
      `
    );

    // tabel majors
    await pool.query(
      `
				CREATE TABLE IF NOT EXISTS majors (
				id int not null auto_increment,
				name varchar(255) not null,
				campus_id int not null,
        primary key (id),
        foreign key (campus_id) REFERENCES campuses(id) ON DELETE CASCADE
				)
      `
    );
    // tabel talent
    await pool.query(
      `
				CREATE TABLE IF NOT EXISTS talents (
				id int not null auto_increment,
				name varchar(255) not null,
				email varchar(255) not null,
				skills varchar(255) not null,
        primary key (id)
				)
      `
    );
    // tabel community
    await pool.query(
      `
				CREATE TABLE IF NOT EXISTS communities (
				id int not null auto_increment,
				name varchar(255) not null,
				description varchar(255) not null,
				members varchar(255) not null,
        primary key (id)
				)
      `
    );

    console.log('Running Migration Successfully!');
  } catch (err) {
    throw err;
  }
};
