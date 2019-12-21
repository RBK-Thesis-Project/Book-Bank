// Material UI imports
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
//components import
import BooksRequested from './BooksRequested.jsx';
// import RequestedByMe from './RequestedByMe'
// import Notifications from '.././Notify/Notification.js'
import BooksDonated from './BooksDonated.jsx';
import jwt_decode from 'jwt-decode';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 900
	}
}));

export default function FullWidthTabs() {
	var token = localStorage.getItem('usertoken');
	const decoded = jwt_decode(token);
	var email = decoded.email;
	var username = decoded.userName;
	var id = decoded.userId;
	const classes = useStyles();
	const theme = useTheme();
	const [ value, setValue ] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<Container>
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						className={classes.tabs}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						aria-label="full width tabs example"
					>
						<Tab label="Books Donated" {...a11yProps(0)} />
						<Tab label="Books Requests" {...a11yProps(1)} />
						<Tab label="Books Requested By me" {...a11yProps(2)} />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={value}
					onChangeIndex={handleChangeIndex}
				>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<BooksDonated />
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						<BooksRequested />
					</TabPanel>
					{/* <TabPanel value={value} index={2} dir={theme.direction}>
            <RequestedByMe /> 
        </TabPanel> */}
				</SwipeableViews>
			</div>
		</Container>
	);
}
