const { poolPromise } = require('../connections/db');

const getAllUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input('UserId', id)
            .query('SELECT * FROM Users WHERE Id = @UserId');
        res.json(result.recordset[0]);  
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, email} = req.body;
        const pool = await poolPromise;
        await pool
            .request()
            .input('firstName', firstName)
            .input('lastName', lastName)
            .input('email', email)
            .input('dateOfBirth', dateOfBirth)
            .query(
                'INSERT INTO Users (firstName,lastName,dateOfBirth, email) VALUES (@firstName, @lastName, @dateOfBirth, @email)'
            );
        res.send(201,'User created successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, dateOfBirth, email} = req.body;
        const pool = await poolPromise;
        await pool
            .request()
            .input('firstName', firstName)
            .input('lastName', lastName)
            .input('email', email)
            .input('dateOfBirth', dateOfBirth)
            .input('UserId',id)
            .query(
                'UPDATE Users SET firstName = @firstName, lastName = @lastName, email = @email, dateOfBirth = @dateOfBirth WHERE Id = @UserId'
            );
        res.send(202,'User updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        await pool
            .request()
            .input('UserId', id)
            .query('DELETE FROM Users WHERE Id = @UserId');
        res.send('User deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};