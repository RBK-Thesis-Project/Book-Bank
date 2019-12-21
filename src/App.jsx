import React from 'react';
import ItemsPage from './ItemsPage/containers/js/itemsPage.jsx';
import Home from '../src/HomePage/Home.jsx';
import Item from './ItemPage1/item.jsx';
import SignIn from './loging/signinform.jsx';
import universityitems from './UniversityItem/universityitems';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProfile from './UserProfile/user';

import AddBook from './AddBook/Addbook';
import { FirstAddBook } from './AddBook/FirstAddBook.jsx';
import AboutUs from './HomePage/aboutUs';
import ContactUs from './HomePage/contactUs'


export const App = () => {
	return (
		<Router>

			<div className="App">
				<Switch>


					<Route exact path="/" component={Home} />
					<Route exact path={"/About-Us"} component={AboutUs} />
					<Route exact path={"/Contact-Us"} component={ContactUs} />
					<Route exact path={`/university/:id`} component={ItemsPage} />
					<Route exact path={'/university/:univId/book/:bookId'} component={Item} />
					<Route exact path="/login" component={SignIn} />
					<Route exact path="/university" component={universityitems} />
					<Route exact path="/profile/:userId" component={UserProfile} />
					<Route exact path="/profile/:userId/AddDonatedBook" component={FirstAddBook} />
					<Route exact path="/profile/:userId/addBlueprintDonatedBook" component={AddBook} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
