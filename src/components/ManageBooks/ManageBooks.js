import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);

    const bookStyle = {
        minWidth: '200px',
        backgroundColor: 'whitesmoke',
        maxHeigt: '100px',
        borderRadius: '1rem',
        padding: '0 15px'
    }

    const handleDelete = (bookid) => {
        fetch(`http://localhost:5055/delete/${bookid}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    
    useEffect(() => {
        fetch('http://localhost:5055/orders')
        .then(res => res.json())
        .then(data => setBooks(data))
    }, [])
    return (
        <div>
            You have: {books.length} books in list
            {
                books.map(book => <div style={bookStyle} className="d-flex justify-content-between m-3">
                    <p><b>{book.title}</b> by <i>'{book.author}'</i></p>
                    <Button onClick={()=>handleDelete(book._id)} color="secondary">Delete</Button>
                </div>)
            }
        </div>
    );
};

export default ManageBooks;