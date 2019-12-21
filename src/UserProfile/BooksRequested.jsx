import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import jwt_decode from 'jwt-decode';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 500,
    padding: 16,
    margin: '10px auto',
    background: 'whitesmoke'

  },
  button1: {
    marginleft: 10,
    color: 'white',
    background: '#76b646',
    borderBottom: '2px solid #438e0a'
  },
  button2: {
    backgroundColor: '#b9b5b5',
    marginLeft: 3,
    borderBottom: '1px solid #6f6f6f'
  }
}));



export default function BooksRequested() {
  const classes = useStyles();
  const [data, setdata] = useState([]);
  var token = localStorage.getItem("usertoken");
  const decoded = jwt_decode(token);
  var email = decoded.email;
  var username = decoded.userName;
  var userIdFromToken = decoded.userId;

  useEffect(() => {
    var path = window.location.href;
    console.log(path)
    var myPath = path.split('/');
    var univId = myPath[4];

    axios
      .get(`http://localhost:8000/profile/${userIdFromToken}/requestedBooks`)
      .then((res) => {
        setdata(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleaccept = (donatedBookId, requesterName, requesterId) => {
    // event.preventDefault();
    axios
      .post(`http://localhost:8000/profile/${userIdFromToken}/requestedBooks/${donatedBookId}/AcceptRequest`, {
        userId: userIdFromToken,
        donatedBookId: donatedBookId,
        requesterId: requesterId
      })
      .then((response) => {
        console.log("hiiiii", response.data);
        alert(`You have Accepted ${requesterName} Request!`);
        window.location.href = `http://localhost:3000/profile/${userIdFromToken}`;

      })
      .catch((error) => {
        console.log(error);
      });
    console.log("accepted successfully")

  };

  const handleignore = (donatedBookId, requesterName, requesterId) => {
    // event.preventDefault();
    axios
      .post(`http://localhost:8000/profile/${userIdFromToken}/requestedBooks/${donatedBookId}/IgnoreRequest`, {
        userId: userIdFromToken,
        donatedBookId: donatedBookId,
        requesterId: requesterId
      })
      .then((response) => {
        console.log("hiiiii", response.data);
        alert(`You have Ignored ${requesterName} Request!`);
        window.location.href = `http://localhost:3000/profile/${userIdFromToken}/requestedBooks`;

      })
      .catch((error) => {
        console.log(error);
      });
    console.log("the request has been")
  };
  return (
    <div>
      <div className={classes.root}>
        {data.isAccepted || data.isIgnored ? (
          <div>no requested books</div>
        ) : (
            data.map((book) => (
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {book.requesterName} requested your book {book.bookName}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" component="label" className={classes.button1}
                          onClick={(event) => {
                            event.preventDefault();
                            handleaccept(book.donatedBookId, book.requesterName, book.requesterId)
                          }}
                        >
                          Accept
      </Button>
                        <Button variant="contained" component="label" className={classes.button2}
                          onClick={(event) => {
                            event.preventDefault();
                            handleignore(book.donatedBookId, book.requesterName, book.requesterId)
                          }}
                        >
                          Ignore
      </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))

          )}

      </div>
    </div>
  )
}
