// backend.js
import express from "express";
import cors from "cors";
import Users from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const result = Users.getUsers(req.query.name, req.query.job);
    result.then((json) => {
        console.log(json);
        res.send(json);
    });
});

app.get('/users/:id', (req, res) => {
    const result = Users.findUserById(req.params['id']);
    result.then((json) => {
        res.send(json);
    }).catch((error) => {
        res.status(404).send('Resource not found.');
    });
});

app.get('/users', (req, res) => {
    const result = Users.getUsers(req.query.name);
    result.then((json) => {
        res.send(json);
    }).catch((error) => {
        res.status(404).send('Resource not found.');
    });
});

app.get('/users', (req, res) => {
    const result = Users.getUsers(req.query.job);
    result.then((json) => {
        res.send(json);
    }).catch((error) => {
        res.status(404).send('Resource not found.');
    });
});

app.get('/users', (req, res) => {
    const result = Users.getUsers(req.query.name, req.query.job);
    result.then((json) => {
        res.send(json);
    }).catch((error) => {
        res.status(404).send('Resource not found.');
    });
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    const result = Users.addUser(userToAdd);
    result.then((json) => {
        res.status(201).send(json);
    });
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    const result = Users.removeUser(id);
    result.then(() => {
        res.status(204).send();
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});