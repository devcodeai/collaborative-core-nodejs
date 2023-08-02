import { init, pool } from './config.js';
import dotenv from 'dotenv';

dotenv.config();
init();
await pool.query(
  `
    INSERT INTO companies (id, name, address, email, phone)
    VALUES
        (1, 'Company A', '123 Main St', 'companya@example.com', '555-1111'),
        (2, 'Company B', '456 Elm St', 'companyb@example.com', '555-2222'),
        (3, 'Company C', '789 Oak St', 'companyc@example.com', '555-3333'),
        (4, 'Company D', '321 Pine St', 'companyd@example.com', '555-4444'),
        (5, 'Company E', '654 Maple St', 'companye@example.com', '555-5555');
    `
);

console.log('berhasil');
