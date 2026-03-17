const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/user/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Welcome, ${name}!`);
});

app.get('/calculate/:num1/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.send('Please provide a search query using ?q=your_query');
    }
    res.send(`You searched for: ${query}`);
});

//ADD USER
app.post("/add-user", (req, res) => {
    const newUser = req.body;
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        const users = JSON.parse(data);
        users.push(newUser);
        fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send("User added successfully");
        });
    });
});

//VIEW USERS
app.get("/users", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const users = JSON.parse(data);
        res.json(users);
    });
});

//EDIT USERS
app.put("/edit-user/:index", (req, res) => {
    const index = req.params.index;
    const updatedUser = req.body;

    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const users = JSON.parse(data);
        
        if (users[index] === undefined) {
            return res.status(404).send("User not found");
        }

        users[index] = updatedUser;

        fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }

            res.send("User updated successfully");
        });
    });
});

//DELETE USERS
app.delete("/delete-user/:index", (req, res) => {
    const index = req.params.index;

    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const users = JSON.parse(data);

        if (users[index] === undefined) {
            return res.status(404).send("User not found");
        }

        users.splice(index, 1);

        fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }

            res.send("User deleted successfully");
        });
    });
});


//ADD STUDENT
app.post("/add-student", (req, res) => {
    const newUser = req.body;
    fs.readFile("students.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        const users = JSON.parse(data);
        users.push(newUser);
        fs.writeFile("students.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send("Student added successfully");
        });
    });
});

//VIEW STUDENTS
app.get("/students", (req, res) => {
    fs.readFile("students.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const students = JSON.parse(data);
        res.json(students);
    });
});

//EDIT STUDENTS
app.put("/edit-student/:index", (req, res) => {
    const index = req.params.index;
    const updatedStudent = req.body;

    fs.readFile("students.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const students = JSON.parse(data);
        
        if (students[index] === undefined) {
            return res.status(404).send("Student not found");
        }

        students[index] = updatedStudent;

        fs.writeFile("students.json", JSON.stringify(students, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }

            res.send("Student updated successfully");
        });
    });
});

//DELETE STUDENTS
app.delete("/delete-student/:index", (req, res) => {
    const index = req.params.index;

    fs.readFile("students.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        const students = JSON.parse(data);

        if (students[index] === undefined) {
            return res.status(404).send("Student not found");
        }

        students.splice(index, 1);

        fs.writeFile("students.json", JSON.stringify(students, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }

            res.send("Student deleted successfully");
        });
    });
});
      

//PORT
const port = 1337;

app.listen(port, () => {
 console.log(`Server is running on ${port}`);
});