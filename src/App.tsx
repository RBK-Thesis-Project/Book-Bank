import React from "react";
//import './App.css';
import ItemsPage from './ItemsPage/containers/js/itemsPage.jsx';
import Home from '../src/HomePage/Home';
import Item from './ItemPage1/item.jsx';
import { BrowserRouter as Router, Switch, Route, Link, RouteComponentProps} from "react-router-dom";

// import Home from '../src/HomePage/Home';


const App: React.FC = () => {
  var path = window.location.href;
  var univId = parseInt(path[path.length - 1]);
  return (
    <Router>
      <div className= "App">
        {/* <Home /> */}
      <ItemsPage />
        {/* <Item />  */}
        <Switch> 
              {/* <Route exact path='/' component={Home} /> */}
             <Route path={`http://localhost:8000/university/${univId}`} component={ItemsPage} /> */}
              {/* <Route path='/about' component={About} /> */}
           </Switch> 
      </div>
    </Router>
  );
};

export default App;
