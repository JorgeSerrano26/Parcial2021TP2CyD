const express = require('express');
const fs = require('fs');

const usersDB = require('./data/users.json');
const app = express();
app.use(express.json({ extended: false }))

//Define routes
const router = express.Router();
app.use('/api/users', router);

router.get('/', async (req, res) => {
    res.json(usersDB);
});

router.get('/:id', async (req, res) => {
    const { id: userId } = req.params;
    const user = usersDB.find(u => u.id == userId);
    if (!user) res.status(404).json({ error: "User not found" });
    res.json(user);
});
router.post('/', async (req, res) => {
    const { body } = req;
    usersDB.push(body);
    const json = JSON.stringify(usersDB);
    fs.writeFile('./data/users.json', json, 'utf8', (err) => {
        if(err) res.status(500).json({err: "Error al agregar un usuario"});
        res.json("success");
    });
});

const PORT = 5000;

app.get('/', (req, res) => res.send('API RUNNING'));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));