import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './MovieWatchList.css';

function MovieWatchList() {
  const [title, setTitle] = useState("");
  const [id, setID] = useState("");
  const [status, setStatus] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "id") {
      setID(value);
    } else if (name === "status") {
      setStatus(value);
    }
  }

  function handleAdd() {
    if (!title && !id && !status) return;
    const newItem = { id, title, status };
    setItems(prev => [...prev, newItem]);
    setTitle("");
    setID("");
    setStatus("");
  }

  function handleRemove(removeId, index) {
    setItems(prev => prev.filter((it, i) => !(it.id === removeId && i === index)));
  }

  return (
    <div className="movie-container">
      <div>Watch List</div>
      <TextField name="title" label="Movie Title Input" value={title} onChange={handleChange} />
      <TextField name="id" label="ID" value={id} onChange={handleChange} />
      <TextField name="status" label="Watch Status" value={status} onChange={handleChange} />
      

      <div className="inputs">
        <p>Title: {title}</p>
        <p>ID: {id}</p>
        <p>Status: {status}</p>
        <Button onClick={handleAdd}>Add</Button>
        
      </div>

      <div className="list">
        {items.length === 0 ? (
          <p>No items in watch list.</p>
        ) : (
          items.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="list-item">
              <p>{item.id} - {item.title} ({item.status})</p>
              <Button onClick={() => handleRemove(item.id, idx)}>Remove</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieWatchList;