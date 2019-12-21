import React from 'react';
import NavBar from './NavBar.jsx';
import { render } from 'react-dom';
import { Container } from '@material-ui/core';

class ContactUs extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <Container>

                    <h3 style={{ fontSize: "28px", marginTop: '40px', marginBottom: "20px", fontFamily: "Times New Roman", textAlign: "center" }}>GET IN TOUCH</h3>
                    <p><b>Email :</b> bookbank.cohort7@gmail.com</p>
                    <p><b>Phone :</b>  +972597993768</p>
                    <p><b>Address :</b> Palestine </p>

                </Container>

            </div >
        )
    }
}

export default ContactUs;