const mysql = require('mysql2/promise');
const createConnection = require('./connectionMaker').createConnection



class Account {
    constructor(firstname, lastname, dob, username, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.dob = dob;
        this.username = username;
        this.password = password;

    }

}

async function createAccount(firstname, lastname, dob, username, password) {
    const connection = await createConnection()
    await connection.query('INSERT (firstname, lastname, dob, username, password) VALUES (?,?,?,?) INTO account;', 
        [firstname, lastname, dob, username, password]);
    await connection.close();


}

async function getAccount(username) {
    const connection = await createConnection()
    const accounts = await connection.query('SELECT * FROM account WHERE username=?', [username])
    await connection.close();
    const account = accounts[0]
    const firstname = account['firstname']
    const lastname = account['lastname']
    const dob = account['DOB']
    const username = username['username']
    const password = password['password']

    return new Account(firstname, lastname, dob, username, password)

}

exports.getAccount = getAccount