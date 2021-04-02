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
        fetch(`https://powerful-sea-70900.herokuapp.com/delete/${bookid}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    
    useEffect(() => {
        fetch('https://powerful-sea-70900.herokuapp.com/orders')
        .then(res => res.json())
        .then(data => setBooks(data))
    }, [])
    return (
        <div>
            <h2 style={{color: 'darkgreen'}}>Manage your shop books</h2>
            <strong style={{color: 'darkolivegreen'}}>You have: {books.length} books in list</strong>
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