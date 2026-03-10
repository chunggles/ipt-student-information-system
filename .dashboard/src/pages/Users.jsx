import axios from 'axios';
import {useState} from 'react';
import {TextField, Button, TableCell, TableRow, TableBody, Table} from '@mui/material';  
import './Users.css';
import { useEffect } from 'react';
 
function Users(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

        function fetchUsers() {
            axios
                .get("http://localhost:1337/users")
                .then((response) => {
                    setUsers(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

                useEffect(() => {
                    fetchUsers();
                }, []);

        async function handleAddUser() {
            try {
                await axios.post("http://localhost:1337/add-user", {
                    name,
                    email,
                    password
                });
                alert("User added!");
                fetchUsers();
                setName('');
                setEmail('');
                setPassword('');
                value = '';
            } 
            catch (error) {
            console.error(error);
            }
        }
            
    return(
        <div className = "users-container">
            <div>
                <h1>Users</h1>
                <TextField name="Name" variant="outlined" label="Name" value= {name} onChange={(e) => setName(e.target.value)} />
                <TextField name="Email" variant="outlined" label="Email" value= {email} onChange={(e) => setEmail(e.target.value)} />
                <TextField name="Password" type= "password" variant="outlined" label="Password " value= {password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant = "contained" onClick={handleAddUser}>Add User</Button>

                <h2>User List</h2>
                <Table>
                    <TableBody> 
                        <TableRow>                                     
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>                       
                        </TableRow>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.password}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody> 
                </Table>

            </div>
        </div>
    )  
}

export default Users;