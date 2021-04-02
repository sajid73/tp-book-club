
import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Books = () => {

    const [books, setBooks] = useState([]);
    const history = useHistory();

    const buttonStyle = {
        color: 'darkgreen',
        fontWeight: '700',
        padding: '5px'
    }

    const checkout = (bookid) => {
        history.push(`/checkout/${bookid}`)
    }

    if (books == null) {
        document.getElementById('spinner').style.display = 'block'
    }
    useEffect(() => {
        fetch('http://localhost:5055/orders')
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])

    return (
        <Container className="p-4">
            <CircularProgress id="spinner" style={{ display: 'none', margin: '10px auto' }} color="secondary" />
            <Row className="justify-content-md-center ">
                {
                    books.map(book => <div>
                        <Col sm={4}>
                            <Card style={{ width: '18rem', height: '20rem', margin: '5px' }}>
                                <Card.Img variant="top" src={book.imageURL} height="50%" />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>
                                        By <i>{book.author}</i>
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="contained" color="secondary" onClick={() => checkout(book._id)}>Buy now</Button>
                                        <span style={buttonStyle}>${book.price}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>)
                }
            </Row>
        </Container>
    );
};

export default Books;