import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import jwt_decode from 'jwt-decode';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		// background: 'rgb(0, 179, 0)',
		padding: theme.spacing(2),
		background: 'whitesmoke',
		margin: 'auto',
		padding: 16,
		textAlign: 'center',
		height: 415
	
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
	root1: {
		marginTop: 50,
		textAlign: 'center',
		marginBottom: 100,
		fontSize: 30
	}
}));

export default function RequestedByMe() {
	const [ data, setData ] = useState([]);

	const classes = useStyles();
	var token = localStorage.getItem('usertoken');
	const decoded = jwt_decode(token);
	var email = decoded.email;
	var username = decoded.userName;
	var id = decoded.userId;

	useEffect(() => {
		var path = window.location.href;
		console.log(path);
		var myPath = path.split('/');
		var univId = myPath[4];

		axios
			.get(`http://localhost:8000/profile/${id}/booksRequestedByTheUser`)
			.then((res) => {
				setData(res.data);
				console.log("Books requests : ",res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// var status = function ()
	return (
		<div>
				<Container>
					<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
						{data.map((book) => (
							<Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={book._id}>
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
										<div style={{overflow: 'auto', textAlign: 'left'}}>
										<p
											style={{ color: 'Black'}}
											variant="outlined"
										>
											{book.isAccepted ? (
												<div>
														Status: Accepted
												</div>
											): book.isIgnored ?(
												<div>
												Status: Ignored
												</div>
											):(
												<div>
												Status: Pending
												</div>
											)}
											
										</p>
										<p
											style={{color: 'Black'}}
											variant="outlined"
										>
											Owner: {book.ownerName}
										</p>
										<p
											style={{ color: 'Black'}}
											variant="outlined"
										>
											Owner Email: {book.ownerEmail}
										</p>
										</div>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Container>
		</div>
	);
}