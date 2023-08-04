import { init, pool } from './config.js';
import dotenv from 'dotenv';

dotenv.config();
init();

try {
  // seed campuses table
  await pool.query(
    `
      INSERT INTO campuses (id, university_name, location, website)
      VALUES
        (1, 'MIT', '77 Massachusetts Ave, Cambridge, MA', 'http://www.mit.edu'),
        (2, 'Stanford University', 'Stanford, CA', 'http://www.stanford.edu'),
        (3, 'University of California, Berkeley', 'Berkeley, CA', 'http://www.berkeley.edu'),
        (4, 'Caltech', 'Pasadena, CA', 'http://www.caltech.edu'),
        (5, 'Harvard University', 'Cambridge, MA', 'http://www.harvard.edu');
    `
  );

  // seed majors table
  await pool.query(
    `
      INSERT INTO majors (id, name, campus_id)
      VALUES
        (1, 'Computer Science', 1),
        (2, 'Mechanical Engineering', 2),
        (3, 'Physics', 3),
        (4, 'Mathematics', 5),
        (5, 'Chemistry', 4);
    `
  );

  // seed communities table
  await pool.query(
    `
      INSERT INTO communities (id, name, description, members)
      VALUES
        (1, 'Data Science Community', 'A community for data science enthusiasts', '1000'),
        (2, 'Hackerspace', 'A space for programmers to collaborate on projects', '500'),
        (3, 'Designers Hub', 'A community for Graphic and UI/UX designers', '750'),
        (4, 'Cloud Computing Community', 'A group to share knowledge about cloud computing', '200'),
        (5, 'AI Researchers', 'A community for research in Artificial Intelligence', '1200');
    `
  );

  // seed companies table
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

  // seed products table
  await pool.query(
    `
      INSERT INTO products (name, company_id)
      VALUES
        ('Product Sabun', 1),
        ('Product Shampoo', 1),
        ('Product Sendok', 2),
        ('Product Garpu', 2),
        ('Product Piring', 2);
    `
  );

  // seed talents table
  await pool.query(
    `
      INSERT INTO talents (id, name, email, skills)
      VALUES
        (1, 'Mary Johnson', 'mary.johnson@example.com', 'Javascript, React, Node.js'),
        (2, 'Jim Brown', 'jim.brown@example.com', 'Python, Django'),
        (3, 'Lucy Miller', 'lucy.miller@example.com', 'Java, Spring Boot'),
        (4, 'Sam Wilson', 'sam.wilson@example.com', 'Ruby, Ruby on Rails'),
        (5, 'Emma Davis', 'emma.davis@example.com', 'Swift, iOS Development');
    `
  );

  console.log('Seeding Successful!');
} catch (error) {
  console.error('[Error]: ', error);
  throw new Error('Fail to seed database!');
}
