import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';
import ManageBooks from '../ManageBooks/ManageBooks';
import axios from 'axios';

const AdminControl = () => {
    const [imgurl, seturl] = useState(null);
    const { register, handleSubmit } = useForm();
    
    const onSubmit = data => {
        const newBook = {
            title: data.title,
            author: data.author,
            price: data.price,
            imageURL: imgurl,
        }
        
        console.log(newBook);

        fetch('https://powerful-sea-70900.herokuapp.com/addBook',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBook)
        })
        .then(res => res.json())
        .then(data => console.log(data))

    };

    const handleChange = event => {
        const imageData = new FormData();
        imageData.set('key', 'ac20e1a136467136bdc171029a510ed8');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
        imageData)
        .then(function (response){
            const img = response.data.data.display_url;
            seturl(img);
            document.getElementById('submitbtn').style.display = 'block';
        })
        .catch(function (error){
            console.log(error);
        })
    }
    return (
        <div>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Book title</label><br />
                        <input name="title" ref={register} />
                        <br />
                    </div>
                    <div>
                        <label>Author</label><br />
                        <input name="author" ref={register} />
                        <br />
                    </div>
                    <div>
                        <label>Price</label><br />
                        <input name="price" type="number" ref={register} />
                        <br />
                    </div>
                    <div style={{margin: '10px 0'}}>
                    <input name="cover" type="file" onChange={handleChange} ref={register} />
                    <br />
                    </div>
                    <p><i style={{color: 'red'}}>Submit button will be availabe when image link is ready</i></p>
                    <input id="submitbtn" style={{display: "none"}} type="submit" />
                </form>

                <ManageBooks />
            </Container>
        </div>

    );
};

export default AdminControl;