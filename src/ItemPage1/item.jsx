import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NavBar from '../HomePage/NavBar';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { useState, useEffect } from 'react';
import { functions } from 'firebase';
import jwt_decode from 'jwt-decode';
import color from '@material-ui/core/colors/lime';
import { awaitExpression } from '@babel/types';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 100
	},
	contantDiv: {
		padding: 20
	},
	bookName: {
		fontSize: 50,
		color: ' #484848',
		textAlign: 'center'
	},
	textStyle: {
		fontSize: 25,
		color: 'gray',
		marginBottom: 60
	},
	img: {
		width: 300,
		height: 500,
		borderRadius: 15,
		border: '4px solid #77b747',
		boxShadow:
			'5px 5px 2px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
	},
	reqButton: {
		color: 'rgb(255, 255, 255)',
		backgroundColor: '#77b747',
		borderBottom: '2px solid #5a982b'
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	label: {
		marginTop: 30
	}
}));

export default function Item() {
	const classes = useStyles();
	const [ owner, setOwner ] = React.useState('');
	const [ book, setBook ] = useState([]);
	const [ ownerBook, setOwnerBook ] = useState([]);
	const [ univName, setUnivName ] = React.useState('');
	const [ ownerId, setOwnerId ] = React.useState('');
	const [ donatedBooks, setDonatedBooks ] = React.useState('');
	const [ bookName, setBookName ] = React.useState('');
	const [ bookCover, setBookCover ] = React.useState('');
	const [ requesterEmail, setrequesterEmail ] = React.useState('');
	const [ ownerName, setOwnerName ] = React.useState('');
	const [ requesterName, setRequesterName ] = React.useState('');
	const [ requesterId, setRequesterId ] = React.useState('');
	const [ bookId, setBookId ] = React.useState('');

	//----------get the token from the local storage-----------
	var token = localStorage.getItem('usertoken');
	if (token) {
		const decoded = jwt_decode(token);
		var userIdFromToken = decoded.userId;
		var userNameFromToken = decoded.userName;
		var emailFromToken = decoded.email;
		console.log(userIdFromToken);
	}

	useEffect(() => {
		var path = window.location.href;
		var myPath = path.split('/');
		var univId = myPath[4];
		var bookId = myPath[6];

		axios
			.get(`http://localhost:8000/university/${univId}/book/${bookId}`)

			.then((res) => {
				setBook(res.data.bluePrintBook);
				setUnivName(res.data.universityNameOfBook.universityName);
				setBookName(res.data.bluePrintBook.bookName);
				setBookCover(res.data.bluePrintBook.bookCover);
				setOwnerBook(res.data.donatedBooksOwners);
				setDonatedBooks(res.data.donatedBooks);
				setRequesterName(userNameFromToken);
				setRequesterId(userIdFromToken);
				setBookId(res.data.bluePrintBook._id);
				setrequesterEmail(res.data.requesterEmail)

				console.log('Donateeeed', res.data.donatedBooksOwners);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleChange = (event) => {
		setOwnerId(event.target.value);
	};

	const handleRequest = (event) => {
		var path = window.location.href;
		var myPath = path.split('/');
		var univId = myPath[4];
		var bookId = myPath[6];
		event.preventDefault();

		// console.log(ownerId);
		console.log('before and after');
		// setOwnerId("test");
		console.log(ownerId);
		//------The choosen donated book Id--------
		var choosenDonatedBookId = '';
		for (var i = 0; i < donatedBooks.length; i++) {
			if (ownerId === donatedBooks[i].userId) {
				choosenDonatedBookId = donatedBooks[i]._id;
			}
		}

		//------The choosen book owner--------
		var choosenOwnerName = '';
		var ownerEmail = '';
		for (var i = 0; i < ownerBook.length; i++) {
			console.log('the choosen ownerId inside for loop to find the owner name: ', ownerId);
			if (ownerId === ownerBook[i]._id) {
				choosenOwnerName = ownerBook[i].userName;
				ownerEmail = ownerBook[i].email;
				console.log(choosenOwnerName);
				// setOwnerName(ownerBook[i].userName);
				// setOwnerName("test");
			}
		}
		//--------send requested book info-----------
		axios
			.post(`http://localhost:8000/university/${univId}/book/${bookId}/sendBookRequest`, {
				requesterId: userIdFromToken,
				requesterName: userNameFromToken,
				ownerId: ownerId,
				ownerName: choosenOwnerName,
				bookId: bookId,
				bookName: bookName,
				bookCover: bookCover,
				donatedBookId: choosenDonatedBookId,
				universityName: univName,
				requesterEmail: emailFromToken,
				ownerEmail:ownerEmail
			})
			.then((response) => {
				console.log(response.data);
				alert('Your Request is sent Successfully ');
				// window.location.href = `http://localhost:3000/profile/${userIdFromToken}/requestedBooks`;

			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			<NavBar />
			{ownerBook.length ? (
										<div className={classes.root}>
										<Container>
											<Grid container spacing={4}>
												<Grid item>
													<ButtonBase className={classes.image}>
														<img className={classes.img} alt="complex" src={book.bookCover} />
													</ButtonBase>
												</Grid>
												<Grid item xs={12} sm container>
													<Grid item xs container direction="column" spacing={9} className={classes.contantDiv}>
														<Grid item xs>
															<Typography gutterBottom variant="h5" className={classes.bookName}>
																{book.bookName}
															</Typography>
															<Typography variant="subtitle1" className={classes.textStyle}>
																<b> University:</b> {univName}
															</Typography>
															<Typography variant="subtitle1" className={classes.textStyle}>
																<b>Description:</b> {book.bookDescription}
															</Typography>
						
															<FormControl className={classes.formControl}>
																<Typography variant="subtitle1">
																	<b>Choose the Owner name you want to borrow the book from:</b>
																</Typography>
																<InputLabel id="demo-simple-select-label" className={classes.label}>
																	Owner
																</InputLabel>
																<Select
																	labelId="demo-simple-select-label"
																	id="demo-simple-select"
																	value={ownerId}
																	onChange={handleChange}
																>
																	{ownerBook.map((owner1, i) => (
																		<MenuItem key={i} value={owner1._id}>
																			{' '}
																			{owner1.userName}
																			{console.log('The id of choosen owner in dropDownList', owner1._id)}
																		</MenuItem>
																	))}
																</Select>
															</FormControl>
														</Grid>
						
														<Grid item>
															<div>
																<Button
																	variant="contained"
																	onClick={handleRequest}
																	className={classes.reqButton}
																>
																	Send Request For Owner
																</Button>
															</div>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Container>
									</div>
										):(
											<div className={classes.root}>
											<Container>
												<Grid container spacing={4}>
													<Grid item>
														<ButtonBase className={classes.image}>
															<img className={classes.img} alt="complex" src={book.bookCover} />
														</ButtonBase>
													</Grid>
													<Grid item xs={12} sm container>
														<Grid item xs container direction="column" spacing={9} className={classes.contantDiv}>
															<Grid item xs>
																<Typography gutterBottom variant="h5" className={classes.bookName}>
																	{book.bookName}
																</Typography>
																<Typography variant="subtitle1" className={classes.textStyle}>
																	<b> University:</b> {univName}
																</Typography>
																<Typography variant="subtitle1" className={classes.textStyle}>
																	<b>Description:</b> {book.bookDescription}
																</Typography>
																<Typography variant="subtitle1" className={classes.textStyle}>
																	The book is not available now
																</Typography>
																</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Container>
									</div>
										)}
			
		</div>
	);
}
