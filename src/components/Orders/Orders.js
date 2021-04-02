import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
        const [booklist, setBooklist] = useState({})
        const [loggedUser, setLoggedUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5055/orders?email=' + loggedUser.email)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setBooklist(data)
        })
    })
    return (
        <div>
            You ordered {booklist.length} books
        </div>
    );
};

export default Orders;