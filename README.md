# Collaborative Core API (NodeJS)
> Description here

## Table of Contents
* [Requirements](#requirements)
* [Package Dependencies](#package-dependencies)
* [Run Program](#run-program)
* [Unit Testing](#unit-testing)
* [Submission to Devcode](#submission-to-devcode)
* [Development Guide](#development-guide)
* [Project Status](#project-status)
* [Author](#author)

## Requirements
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [NodeJS](https://nodejs.org/en/download/)
* Docker
    * [On Windows](https://docs.docker.com/desktop/install/windows-install/)
    * [On Mac](https://docs.docker.com/desktop/install/mac-install/)
    * [On Linux](https://docs.docker.com/desktop/install/linux-install/)

## Package Dependencies
* express
* dotenv
* cors
* mysql2
* eslint `Dev`
* eslint-config-prettier `Dev`
* eslint-plugin-prettier `Dev`
* nodemon `Dev`
* prettier `Dev`

## Run Program
* Using Local Machine (Windows)
    * Create new database (on MYSQL) as `<database_name>`
    * Copy `.env.example` to `env` 
      * Update `MYSQL_DBNAME` configuration as `<database_name>`
      * Update `MYSQL_PASSWORD` configuration as `<your_mysql_password>`
    * Install all the package dependencies
      
      ```
      npm install
      ```
    * Start the program
      
      ```
      npm start
      ```
    * Open the path on your local machine
      
      ```
      http://localhost:3030/api/
      ```

* Using Docker 
    * _TODO HERE_

## Unit Testing
* _TODO HERE_

## Submission to Devcode
* _TODO HERE_

## Development Guide
* Run the program

    ```
    npm run dev
    ```
* Do pre-commit action before bring out your code to the repository
    
    ```
    npm run precommit
    ```

## Project Status
* Project is: _in progress_

## Author
<table>
    <tr>
      <td><b>Name</b></td>
      <td><b>GitHub</b></td>
    </tr>
    <tr>
      <td>Rava Naufal Attar</td>
      <td><a href="https://github.com/sivaren">sivaren</a></td>
    </tr>
    <tr>
      <td>Suryanto Tan</td>
      <td><a href="https://github.com/SurTan02">SurTan02</a></td>
    </tr>
    <tr>
      <td>Steven Alexander Wen</td>
      <td><a href="https://github.com/loopfree">loopfree</a></td>
    </tr>
</table>
