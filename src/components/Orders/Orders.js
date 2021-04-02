import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../App';

const Orders = () => {
    const [booklist, setBooklist] = useState([])
    const [loggedUser, setLoggedUser] = useContext(UserContext);

    // const buttonStyle = {
    //     color: 'darkgreen',
    //     fontWeight: '700',
    //     padding: '5px'
    // }

    useEffect(() => {
        fetch('https://powerful-sea-70900.herokuapp.com/addbookuser?email=' + loggedUser.email)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBooklist(data)
            })
    })
    return (
        <div>
            <Row className="justify-content-md-center ">
                {
                    booklist.map(book =>
                        <div>
                            <Col sm={4}>
                                <Card style={{ width: '18rem', height: '20rem', margin: '5px' }}>
                                    <Card.Img variant="top" src={book.imageURL} height="50%" />
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Text>
                                            By <i>{book.author}</i>
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <span>${book.price}</span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </div>
                    )
                }
            </Row>
        </div>
    );
};

export default Orders;