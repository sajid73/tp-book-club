import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

const Checkout = () => {
    const [booklist, setBooklist] = useState({})
    const { bookid } = useParams();
    const url = `http://localhost:5055/book/${bookid}`
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const buttonStyle = {
        color: 'darkgreen',
        fontWeight: '700',
        padding: '5px'
    }
    const classes = useStyles();

    const addCheckOut = (id) => {
        const newBook = {
            title: booklist.title,
            author: booklist.author,
            price: booklist.price,
            imageURL: booklist.imageURL,
            email: loggedUser.email
        }
        

        fetch('http://localhost:5055/userbook',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBook)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBooklist(data))
    }, [])
    return (
        <div className="d-flex justify-content-md-center m-5">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={booklist.imageURL}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {booklist.title}
          </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            By {booklist.author}
          </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className="justify-content-around">
                    <span>
                        Price ${booklist.price}
                        </span>
                    <Button onClick={()=>addCheckOut(booklist._id)} variant="contained" size="small" color="primary">
                        Confirm order
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default Checkout;