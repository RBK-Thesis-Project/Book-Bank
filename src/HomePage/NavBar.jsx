import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AndroidIcon from "@material-ui/icons/Android";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import NavCate from "./NavCate.jsx";
import ChatBox from './ChatBox.jsx';
import SearchAppBar from "./SearchAppBar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { logoutStatus } from "../actions";
import { allData } from "../actions";
import jwt_decode from "jwt-decode";
import Notifications from "../Notify/Notification"


//---------------styling for navbar--------------
const userStyles = makeStyles({
	root: {
		width: 1170,
		margin: "0 auto"
	},

	firstNav: {
		background: "white",
		zIndex: 10
	},
	secondNav: {
		background: "#77b748",
		borderBottom: "2px solid #428611",
		minHeight: 50
	},
	button: {
		color: "gray",
		fontSize: 11,
		borderRadius: 0,
		marginRight: 5,
		"&:hover": {
			backgroundColor: "transparent"
		}
	},
	userImg: {
		marginRight: 10,
	},
	title: {
		color: 'gray',
		marginLeft: 27
	}
});




//-----------------nav bar class-------------
export const NavBar = () => {
	// for login user
	//----------get the token from the local storage-----------
	var token = localStorage.getItem('usertoken');
	var username = '';
	var id = '';
	if (token) {
		const decoded = jwt_decode(token);
		username = decoded.userName;
		id = decoded.userId;
		
	}

	
	const isLogged = useSelector((state) => state.isLogged);


	const dispatch = useDispatch();
	

	//--------logOut Function///////////
	const logOutFun = () => {
		dispatch(logoutStatus())
		var token = localStorage.removeItem("usertoken");
		console.log(token)
	}
	const classes = userStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = (event) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target)
		) {
			return;
		}
		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}


	return (
		<div>
		<AppBar position="static">
			{/* first nav bar */}

			<Toolbar className={classes.firstNav}>
				<div className={classes.root}>
					<Grid container>
						<Grid
							container
							item
							xs={6}
							direction="row"
							justify="flex-start"
							alignItems="center"
						>
							<Grid item>
							<Link href="/">
								<Typography variant="h6" noWrap className={classes.title}>
									BOOK BANK
							</Typography>
							</Link>
							</Grid>
						</Grid>

						<Grid
							container
							item
							xs={6}
							direction="row"
							justify="flex-end"
							alignItems="center"
						>
							{/* if statment for check user if login or not */}
							{token ? (
								// log in icon and use name
								<Grid item>
									<Button
										className={classes.button}
										ref={anchorRef}
										aria-controls={open ? "menu-list-grow" : undefined}
										aria-haspopup="true"
										onClick={handleToggle}
									>
										{/* user image */}
										<Avatar
											className={classes.userImg}
											alt="Remy Sharp"
											src="https://previews.123rf.com/images/yupiramos/yupiramos1609/yupiramos160902988/62320150-hotel-employees-avatar-icon-vector-illustration-design.jpg"
										/>
										<p>{username}</p>
										{/* {token ? <p>{x}</p> : <p>username</p>} */}
									</Button>
									<Popper
										className={classes.loginDraw}
										open={open}
										anchorEl={anchorRef.current}
										role={undefined}
										transition
										disablePortal
									>
										{({ TransitionProps, placement }) => (
											<Grow
												{...TransitionProps}
												style={{
													transformOrigin:
														placement === "bottom"
															? "center top"
															: "center bottom"
												}}
											>
												<Paper>
													<ClickAwayListener onClickAway={handleClose}>
														<MenuList
															autoFocusItem={open}
															id="menu-list-grow"
															onKeyDown={handleListKeyDown}
														>
															<MenuItem onClick={handleClose}>
																<Link href={`/Profile/${id}`}>Profile</Link>
															</MenuItem>
															<MenuItem onClick={handleClose}>
																<Link href={`/Profile/${id}`}>Notification</Link>
																{/* < Notifications /> */}
															</MenuItem>
															<MenuItem
																onClick={logOutFun}
															>
																Logout
                             							 </MenuItem>
														</MenuList>
													</ClickAwayListener>
												</Paper>
											</Grow>
										)}
									</Popper>
								</Grid>
							) : (
									// link to go to log in page
									<Link href="/login">Log In</Link>
								)}
						</Grid>
					</Grid>
				</div>
			</Toolbar>
			{/* second nav bar */}
			<Toolbar className={classes.secondNav}>
				<div className={classes.root}>
					<Grid container>
						<Grid
							item
							xs={8}
							lg={9}
							xl={9}
							container
							direction="row"
							justify="flex-start"
							alignItems="center"
						>
							<NavCate />

						</Grid>
						<Grid
							item
							xs={4}
							lg={3}
							xl={3}
							container
							justify="flex-start"
							alignItems="center"
						>
							{/* Search component */}
							<SearchAppBar />
							<ChatBox />
						</Grid>
					</Grid>
				</div>
			</Toolbar>
		</AppBar>

		   </div>
	);
};
export default NavBar;