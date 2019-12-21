import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Link from '@material-ui/core/Link';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

//-----------------drawer component------------
const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	},
	link: {
		display: 'contents',
		color: 'white'
	},
	menu: {
		color: 'white',
		marginLeft: -11,
		paddingLeft: 0
	},
	icon: {
		minWidth: 25,
		color: 'white'
	},
	h1: {
		margin: 19,
		border: '1px solid #77b748',
		textAlign: 'center',
		color: '#77b748'
	},
	navLinks: {
		display: 'flex',
		width: '50%'
	}
});
export default function NavCate() {
	const classes = useStyles();

	return (
		<div className={classes.navLinks}>
			{['university', 'About-Us', 'Contact-Us'].map((text, index) => (
				<ListItem button key={text}>
					<Link href={'/' + text} className={classes.link}>
						<ListItemIcon className={classes.icon}>
							{/* <ArrowDropDownIcon /> */}
						</ListItemIcon>
						<ListItemText primary={text} />
					</Link>
				</ListItem>
			))}
		</div>
	);
}
