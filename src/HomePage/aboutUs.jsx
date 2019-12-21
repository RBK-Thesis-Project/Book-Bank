import React from 'react';
import NavBar from './NavBar.jsx';
import { render } from 'react-dom';
import { Container } from '@material-ui/core';

class AboutUs extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <h1 style={{ fontFamily: "Times New Roman", marginTop: '40px', marginBottom: "20px" }}>About Us</h1>
          <p style={{ lineHeight: "26pt", textAlign: "justify", width: "500px" }}>
            We are <span style={{ color: "#77b748" }}><em><b>BookBank</b></em></span> Team , are very pleased to come out with a project with zero benefits; to help students in universities get benefit of other’s books, that are not used any more.

            This website is a result of one month of daily working in the last project for RBK Jordan Cohort 7.

            Published on 21 December 2019.

            Don’t hesitate to contact us for any worries, concerns or ideas for development. We are always here!<br />
            <b style={{ color: "#77b748" }}> Save Money ...  Help the Environment ... Meet Cool People.</b>
          </p>
        </Container>

      </div >
    )
  }
}

export default AboutUs;
