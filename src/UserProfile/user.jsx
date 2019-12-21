import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import NavBar from '../HomePage/NavBar';
import Avatar from '@material-ui/core/Avatar';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import FullWidthTabs from './tabs.jsx';
import { storage } from '../firebase/firebase';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,

	},
	root1: {
		margin: theme.spacing(2)
	},
	h6: {
		marginBottom: 10
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 1500
	},
	avatar: {
		width: '150px',
		height: '150px',
		margin: 'auto'
		
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 300
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	userDiv: {
		margin: '85px 0px'
	},
	imgBro: {
		color: 'navy',
		fontSize: 14
	},
	addBut: {
        color: 'white',
    width: '49%',
    background: '#76b646',
    marginTop: 12,
    borderBottom: '2px solid #438e0a'
	},
	brofile: {
		marginTop: 100,
		textAlign: 'center',
		fontSize: 40,
		color: 'gray',
		marginBottom: 50
	}
}));
const theme = createMuiTheme({
	typography: {
		subtitle1: {
			fontSize: 20
		},
		subtitle2: {

		}
	}
});

function UserProfile(props) {
	var token = localStorage.getItem('usertoken');
	console.log(token);
	const decoded = jwt_decode(token);
	var email = decoded.email;
	var userName = decoded.userName;
	var id = decoded.userId;
	console.log(id);
	const classes = useStyles();
	const [profile, setProfile] = React.useState('');
	const [profilePic, setProfilePic] = React.useState('');

	//--------get profile info from server-----------
	useEffect(() => {
		var path = window.location.href;
		console.log(path);
		var myPath = path.split('/');
		var userId = myPath[4];
		axios
			.get(`http://localhost:8000/profile/${userId}`)
			.then((res) => {
				setProfile(res.data);
				setProfilePic(res.data.userAvatar);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	//------------------variables for handle media-------------------
	const [imageAsFile, setImageAsFile] = React.useState('');
	const [imageAsUrl, setImageAsUrl] = React.useState('');

	//---------------------handle media file-------------------------
	console.log(imageAsFile);
	const handleImageAsFile = (e) => {
		e.preventDefault();
		const image = e.target.files[0];
		setImageAsFile((imageFile) => image);
	};

	//-----------------Get url from Firebase-------------------------
	const handleFireBaseUpload = (e) => {
		e.preventDefault();
		console.log('start of upload');

		//---------error handling------
		if (imageAsFile === '') {
			console.error(`not an image, the image file is a ${typeof imageAsFile}`);
		}

		//------uploadTask variable-----
		const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

		//----grab the image from firebase as an imageUrl---
		uploadTask.on(
			'state_changed',
			(snapShot) => {
				//takes a snap shot of the process as it is happening
				console.log('snapshot in the next line !');
				console.log(snapShot);
			},
			(err) => {
				//catches the errors
				console.log(err);
			},
			() => {
				// gets the functions from storage refences the image storage in firebase by the children
				// gets the download url then sets the image from firebase as the value for the imgUrl key:
				storage.ref('images').child(imageAsFile.name).getDownloadURL().then((fireBaseUrl) => {
					setImageAsUrl((fbUrl) => fireBaseUrl);
					setProfilePic(fireBaseUrl);
					console.log(imageAsUrl);
				});
			}
		);

		//-------- post request to send the new img to the server-------
		axios
			.post(`http://localhost:8000/profile/${id}/editeProfilePic`, {
				profileId: profile._id,
				userAvatar: profilePic
			})
			.then((response) => {
				console.log('Img url from the state', profilePic);
				console.log('updated profile ', response.data);
				alert(`${userName} Your Profile Picture Is Updated Successfully!`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<div>
				<NavBar />
			</div>
			<Container>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid item xs={6} className={classes.userDiv}>
						<Avatar className={classes.avatar} src={profilePic} alt="Profile picture" />
					
					</Grid>
					<Grid item xs={6} justify="center"
					alignItems="center">
						<Typography variant="subtitle1" className={classes.h6}><b>Name:</b> {userName}</Typography>
						<Typography variant="subtitle1" className={classes.h6}>
							<b>Email:</b> {email}
						</Typography>
						<div className={classes.h6}>
						<b className={classes.imgBro}>Change Profile Photo</b>
						<div style={{    margin: '10px 0'}}>
						<Button variant="contained" component="label" style={{background: '#bbd5eb', padding: 9}}>
							<input type="file" onChange={handleImageAsFile} style={{ maxWidth: '50' }} />
						</Button>
						
						<Button variant="contained" onClick={handleFireBaseUpload}>
							Save
						</Button>
						</div>
						  <div>
							<Link href={`/profile/${id}/AddDonatedBook`}>
								<Button variant="contained" className={classes.addBut}>Add A BOOK</Button>
							</Link>
							</div>
						</div>
					</Grid>
				</Grid>
				<FullWidthTabs />
			</Container>
		</div>
	);
}

const mapStateToProps = (state) => ({
	posts: state.posts.items
});

export default connect(mapStateToProps, { fetchPosts })(UserProfile);
