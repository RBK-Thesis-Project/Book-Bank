import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

//---------Lastest Books Added----------

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			flexGrow: 1
		},
		paper: {
			background: 'rgb(119, 183, 71)',
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
			height: 470,
			borderRadius: 15,
			boxShadow: 'rgba(0, 0, 0, 0.2) 4px 5px 9px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px'

		},
		imgBook: {
			height: 385,
			marginBottom: 10,
			maxWidth: '100%',
			borderRadius: 15
		},
		h2: {
			color: 'gray',
			marginBottom: 40,
			borderBottom: '2px solid gray',
			paddingBottom: 18
		}
	})
);

export const LastBook = (posts) => {
	const classes = useStyles();

	return (
		<Container>
			<h2 className={classes.h2}>Latest Books Added</h2>
			{posts.posts.data ? (
				<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
					{posts.posts.data.recentBooks.map((book) => (
						<Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={book._id}>
							<Paper className={classes.paper}>
								<img alt="img" src={book.bookCover} className={classes.imgBook} />
								<Link
									href={`/university/${book.universityId}/book/${book._id}`}
									style={{ color: 'white' }}
								>
									<h3 style={{ marginBottom: 5, marginTop: 25 }}>{book.bookName}</h3>
								</Link>
								<Link
									href={`/university/${book.universityId}/book/${book._id}`}
									style={{ color: 'white' }}
								>
									{/* <p style={{ marginBottom: 5 }}>university name</p> */}
								</Link>
								{/* <Link href={`/university/${book.universityId}/book/${book.id}`} style={{ color: 'white' }}>
                                    <Button style={{ color: 'white', border: '1px solid white' }} variant="outlined">Default</Button>
                                </Link> */}
							</Paper>
						</Grid>
					))}
				</Grid>
			) : (
				<div />
			)}
		</Container>
	);
};
const mapStateToProps = (state) => ({
	posts: state.posts.items
});
export default connect(mapStateToProps)(LastBook);
