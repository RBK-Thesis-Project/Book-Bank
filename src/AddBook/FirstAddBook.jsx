import React, { useState, useEffect }  from "react";
import Container from "@material-ui/core/Container";
import NavBar from "../HomePage/NavBar";
import { createStyles, fade,makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import InputBase from '@material-ui/core/InputBase';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchPosts } from '../actions/postActions';
import {fetchBooks}  from '../actions/bookActions';
import jwt_decode from 'jwt-decode';


const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 350
    },
    textfield: {
        minWidth: 350
    },
    root: {
        flexGrow: 1,
        paddingLeft:0
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      searchBar: {
        background: 'transparent',
        boxShadow: 'none',
        minWidth: 300,
        paddingLeft: 0
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(50),
        width: 'auto',
        },
        paddingLeft: 0
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
        borderRadius: 4
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 290,
        },
      },
      imgBook: {
        height: 250,
        marginBottom: 10,
        maxWidth: '100%'
    },
    allSearch:{
      paddingLeft:0
    },
    result: {
      position: 'absolute',
      background: 'white',
      // color: 'gray',
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      borderRadius: 4,
      width: '20%',
      // right: '22%',
      height:'100%'
    },
    BookImg: {
      height: 100,
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
        width: 290,
        // '&:focus': {
        //   width: 200,
        // },
      },
    },
}));


var token = localStorage.getItem('usertoken');
if (token) {
	const decoded = jwt_decode(token);
	var userIdFromToken = decoded.userId;
	console.log(userIdFromToken);
}

export  const FirstAddBook = (props) => {
  useEffect(() => {
    // props.fetchPosts();
  }, []);
    const classes = useStyles();
    const [choosenUniv, setChoosenUniv] = React.useState("");
    const [allUnivs,setallUnivs] = React.useState([]);
    const [searchValue, setSearchValue] = useState('');//Hooks for Search function
    const [allbooksOfUniv,setAllbooksOfUniv]=useState([]);

    //-----------------------------Search related to University Name-----------------------------
   
    const handleChange = event => setSearchValue(event.target.value);
    RegExp.quote = function(searchValue) {
    return searchValue.replace(/([.?*+^$[\]\\(){}|-])/gi, "\\$1");
    };
    const regex = new RegExp(RegExp.quote(searchValue), 'gi')
    var  searchItems = [{_id: "5def94b2247ca906026f782c", bookName: "ssssssc", bookCover: "https://images-na.ssl-images-amazon.com/images/I/51KPj3gS0vL.jpg"}]
    
    searchItems = allbooksOfUniv.filter(function (hero) {
    if (allbooksOfUniv) {
      if (searchValue) {
        return hero.bookName.match(regex);
      }
    }
    }

    );
    console.log(searchItems)

    //-----------------------------To get all universities for dropdownList-----------------------------

    useEffect( () => {
        axios.get(`http://localhost:8000/university/`)
        .then(res => {
          setallUnivs(res.data);
      })
        .catch(err => {
          console.log(err);
        })
      }, []);

   //-----------------------------To get all books related to universityName-----------------------------
     
        const onUniChange = event => {
        console.log("The University is:  ",event.target.value);
        setChoosenUniv(event.target.value);
        var univId= findChoosenUnivId(choosenUniv);
        axios.get(`http://localhost:8000/university/${univId}`)
        .then(res => {
          setAllbooksOfUniv(res.data);
          console.log("All the books related to universityName11",res.data)
        })
        .catch(err => {
          console.log(err);
        })
    }
   //-----------------------------To add newBook to Donated Books -----------------------------
  
   const handleSumbit = event => {
    var path = window.location.href;
		console.log(path)
		var myPath = path.split('/');
    var userid = myPath[4];
    
    event.preventDefault();
    axios
			.post(`http://localhost:8000/profile/${userid}/AddDonatedBook`, {
        userId: userIdFromToken,
        bookId: searchItems._id
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
   }
   console.log("boook iiid",searchItems._id)
   console.log("user iiid",userIdFromToken)


 
    //-----------------------------To get universityName according to UniversityID-----------------------------
      const findChoosenUnivId = (choosenUnivName) => {
        for (var i = 0; i < allUnivs.length; i++) {
          if (allUnivs[i].universityName === choosenUnivName) {
            return allUnivs[i]._id;
          }
        }
      };
    
      return (
       <div>
          <NavBar />
          <br/>
          <Container>
          <h2>Add New Book</h2>
          <br />
          <br />
          <br />
          <form noValidate autoComplete="off" >
              <div>
              <FormControl variant="filled" className={classes.formControl}>
              <InputLabel>
                University
              </InputLabel>

              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={choosenUniv}
                onChange={onUniChange}
              >
                {allUnivs.map((univ) => (
                <MenuItem key={univ.id} value={univ.universityName}>{univ.universityName}</MenuItem>
                 ))}
              </Select>
              <div>
              <br/>
              <br/>
              
            </div>
            </FormControl>
            <Typography>
              Enter the Name of Book
              </Typography>
            <Toolbar className={classes.allSearch}>
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
          <br/>
          <br/>
          <br/>
          <div className={classes.result}>
          
            <div >
              {searchItems.length ?
              searchItems.map((item) => (
              <Grid key={item._id} className={classes.searchItem} container>
                <Grid item xs={4} className={classes.searchImg}>
                <img alt='logo' src={item.bookCover} className={classes.BookImg}></img>
                </Grid>
                <Grid item xs={8} className={classes.linkGrid}>
                <h3 style={{marginBottom:5}}>{item.bookName}</h3>
                <h3 style={{marginBottom:5}}>{item.bookDescription}</h3>
                <Button style={{marginBottom:5}} variant="contained" color="primary" onClick={handleSumbit}>Donate this Book </Button>
                </Grid>
              </Grid>
              ))
              :
              <Grid  className={classes.searchItem} container>
                <Link href={`/profile/${userIdFromToken}/addBlueprintDonatedBook`} style={{color: 'black'}}>
                <Button style={{marginBottom:5}} variant="contained" color="primary" >Add New Book 
                </Button>
                </Link>
              </Grid>
              }
              
            </div>

        
             </div>
            </div>
          </form>  
          </Container>
   
       </div>
      );
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(FirstAddBook);