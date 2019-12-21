import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    searchBar: {
      background: 'transparent',
      boxShadow: 'none',

    },

    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    result: {
      position: 'absolute',
      background: 'white',
      color: 'gray',
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      borderRadius: 4,
      width: '20%',
      right: '22%'
    },
    BookImg: {
      height: 115,
      width: '85%'
    },
    searchItem: {
      padding: 10 
    },
    searchLink: {
      cursor: 'pointer',
      color: 'gray',
    },
    searchImg: {
      borderRight: '4px solid #77b748'
    },
    linkGrid: {
      paddingLeft: 15
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 200,
        '&:focus': {
          width: 200,
        },
      },
    },
  }),
);

export const SearchAppBar = (posts) => {
  const classes = useStyles();//For styling
  const [searchValue, setSearchValue] = useState('');//Hooks for Search function

  let allBooks = []
  posts.posts.data ?
      allBooks = posts.posts.data.allBooks
  : allBooks = [];

  // console.log(allBooks)
  const handleChange = event => setSearchValue(event.target.value);
  RegExp.quote = function(searchValue) {
    return searchValue.replace(/([.?*+^$[\]\\(){}|-])/gi, "\\$1");
  };
  const regex = new RegExp(RegExp.quote(searchValue), 'gi')
  var searchItems = allBooks.filter(function (hero) {
    if (allBooks) {
      if (searchValue) {
        return hero.bookName.match(regex);
      }
    }

  });
  console.log(searchItems)

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" className={classes.searchBar}>
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={handleChange}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {/* Search result div */}
      <div className={classes.result}>
        {allBooks ?
          <div >
            {searchItems.map((item) => (
            <Grid key={item._id} className={classes.searchItem} container>
              <Grid item xs={4} className={classes.searchImg}>
              <img alt='logo' src={item.bookCover} className={classes.BookImg}></img>
              </Grid>
              <Grid item xs={8} className={classes.linkGrid}>
              <Link className={classes.searchLink} href={`/university/${item.universityId}/book/${item._id}`}>{item.bookName}</Link>
              </Grid>
            </Grid>
            ))}
          </div>
          : <div></div>}
      </div>
    </div>
  );
}
const mapStateOfProps = state => ({
  posts: state.posts.items
})
export default connect(mapStateOfProps)(SearchAppBar);