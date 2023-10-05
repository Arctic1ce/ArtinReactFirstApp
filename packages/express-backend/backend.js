// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
        {
            id: 'xyz789',
            name: 'Charlie',
            job: 'Janitor',
        },
        {
            id: 'abc123',
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id: 'ppp222',
            name: 'Mac',
            job: 'Professor',
        },
        {
            id: 'yat999',
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555',
            name: 'Dennis',
            job: 'Bartender',
        }
    ]
}

app.use(cors());
app.use(express.json());

const findUserByName = (name) => {
    return users['users_list']
        .filter((user) => user['name'] === name);
}

const findUserById = (id) =>
    users['users_list']
        .find((user) => user['id'] === id);

const findUserByNameAndJob = (name, job) => {
    return users['users_list']
        .filter((user) => user['name'] === name && user['job'] == job);
}

const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

const removeUser = (id) => {
    users['users_list'] = users['users_list'].filter((user) => user['id'] != id);
}

const generateId = (user) => {
    let id = Math.floor(Math.random() * 10000);
    user['id'] = id;
    return user;
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    }
    else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    }
    else {
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    generateId(userToAdd);
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    removeUser(id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});