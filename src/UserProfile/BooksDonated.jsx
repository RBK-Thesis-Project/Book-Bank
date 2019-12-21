import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import jwt_decode from "jwt-decode";
// import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            // background: 'rgb(0, 179, 0)',
            padding: theme.spacing(2),
			background: 'whitesmoke',
			margin: 'auto',
			padding: 16,
			textAlign: 'center',
			height: 300
        },
        imgBook: {
			height: 250,
			width: '100%',
            marginBottom: 10,
            maxWidth: '100%'
        },
        h2: {
            color: 'gray',
            marginBottom: 20
        },
        root1:{
          marginTop: 50,
          textAlign: 'center',
          marginBottom: 100,
          fontSize:30
        }
      })
);

export const BooksDonated  = () => {
  var token = localStorage.getItem("usertoken");
    console.log(token);
    const decoded = jwt_decode(token);
    var id = decoded.userId;

  const [books, setbooks] = useState([]);
  const classes = useStyles();

	useEffect(() => {
    var path = window.location.href;
		console.log(path)
		var myPath = path.split('/');
    var userId = myPath[4];

		axios
			.get(`http://localhost:8000/profile/${userId}/donatedBooksAsBluePrints`)
			.then((res) => {
				setbooks(res.data);
				console.log("data of donated books",res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<Container>
				<Grid container direction="row" spacing={3}>
					{books.map((book) => (
						<Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={books._id}>
							<Paper className={classes.paper}>
								<img alt="img" src={book.bookCover} className={classes.imgBook} />
								<Link
									href={`/university/${book.universityId}/book/${book._id}`}
									style={{ color: 'black' }}
								>
									<h3 style={{ marginBottom: 5 }}>{book.bookName}</h3>
								</Link>
								<Link
									href={`/university/${book.universityId}/book/${book._id}`}
									style={{ color: 'white' }}
								>

								</Link>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
};

export default BooksDonated;