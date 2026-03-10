import axios from 'axios';
import React, { useState } from 'react'
import './AddStudents.css'
import {TextField, Button, TableCell, TableRow, TableBody, Table} from '@mui/material';
import { useEffect } from 'react';

function AddStudents() {
    const [preview, setPreview] = useState(null)

    const [idNumber, setIdNumber] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [course, setCourse] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [students, setStudents] = useState([]);

        function fetchStudents() {
            axios
                .get("http://localhost:1337/students")
                .then((response) => {
                    setStudents(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

                useEffect(() => {
                    fetchStudents();
                }, []);

    async function handleAddUser() {
            try {
                await axios.post("http://localhost:1337/add-student", {
                    idNumber,
                    firstName,
                    lastName,
                    middleName,
                    course,
                    yearLevel
                });
                alert("Student added!");
                fetchStudents();
                setIdNumber('');
                setFirstName('');
                setLastName('');
                setMiddleName('');
                setCourse('');
                setYearLevel('');
                value = '';
            } 
            catch (error) {
            console.error(error);
            }
        }
    const handleShowPreview = () => {
        setPreview({
            idNumber,
            firstName,
            lastName,
            middleName,
            course,
            yearLevel,
        })
    }

    const handleNumberChange = (setter) => (e) => {
        const sanitized = e.target.value.replace(/\D+/g, '')
        setter(sanitized)
    }

    const handleTextChange = (setter) => (e) => {
        const sanitized = e.target.value.replace(/[^a-zA-Z\s'\-]/g, '')
        setter(sanitized)
    }
 
    return (
        <div className="student-container">
            <div className="main-content">
                <div className="form-container">
                    <div className="form-card">
                        <h1 className="card-title">Add Students</h1>
                        <TextField
                            id="id-number"
                            label="ID Number"
                            variant="outlined"
                            type="text"
                            value={idNumber}
                            onChange={handleNumberChange(setIdNumber)}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                        <TextField
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            type="text"
                            value={firstName}
                            onChange={handleTextChange(setFirstName)}
                        />
                        <TextField
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            type="text"
                            value={lastName}
                            onChange={handleTextChange(setLastName)}
                        />
                        <TextField
                            id="middle-name"
                            label="Middle Name"
                            variant="outlined"
                            type="text"
                            value={middleName}
                            onChange={handleTextChange(setMiddleName)}
                        />
                        <TextField
                            id="course"
                            label="Course"
                            variant="outlined"
                            type="text"
                            value={course}  
                            onChange={(e) => setCourse(e.target.value)}
                        />
                        <TextField
                            id="year-level"
                            label="Year"
                            variant="outlined"
                            type="text"
                            value={yearLevel}
                            onChange={handleNumberChange(setYearLevel)}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        />
                        <Button className="preview-btn" variant="outlined" size="large" onClick={handleShowPreview}>
                            Show Preview
                        </Button>

                        <Button className="add-btn" variant="contained" size="large" onClick={handleAddUser}>
                            Add Student
                        </Button>
 
                    </div>  

                    

                </div>
                <div className="preview-wrapper">
                    <div className="preview-card">
                        <h1 className="card-title">Student Preview</h1>
                        <div className="preview-item">
                            <span className="preview-label">ID Number:</span>
                            <span className="preview-value">{preview?.idNumber || 'Not provided'}</span>
                        </div>
                        <div className="preview-item">
                            <span className="preview-label">First Name:</span>
                            <span className="preview-value">{preview?.firstName || 'Not provided'}</span>
                        </div>
                        <div className="preview-item">
                            <span className="preview-label">Last Name:</span>
                            <span className="preview-value">{preview?.lastName || 'Not provided'}</span>
                        </div>
                        <div className="preview-item">
                            <span className="preview-label">Middle Name:</span>
                            <span className="preview-value">{preview?.middleName || 'Optional'}</span>
                        </div>
                        <div className="preview-item">
                            <span className="preview-label">Course:</span>
                            <span className="preview-value">{preview?.course || 'Not provided'}</span>
                        </div>
                        <div className="preview-item">
                            <span className="preview-label">Year Level:</span>
                            <span className="preview-value">{preview?.yearLevel || 'Not provided'}</span>
                        </div>
                    </div>

                    <div className="student-list-container">
                        <div className="student-list-card">
                            <h1>Student List</h1>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><b>ID Number</b></TableCell>
                                        <TableCell><b>First Name</b></TableCell>
                                        <TableCell><b>Last Name</b></TableCell>
                                        <TableCell><b>Middle Name</b></TableCell>
                                        <TableCell><b>Course</b></TableCell>
                                        <TableCell><b>Year Level</b></TableCell>
                                    </TableRow>
                                    {students.map((student, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{student.idNumber}</TableCell>
                                        <TableCell>{student.firstName}</TableCell>
                                        <TableCell>{student.lastName}</TableCell>
                                        <TableCell>{student.middleName}</TableCell>
                                        <TableCell>{student.course}</TableCell>
                                        <TableCell>{student.yearLevel}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default AddStudents
