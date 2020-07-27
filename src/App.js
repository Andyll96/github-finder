import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

// information about using useState and the Context API
// https://www.smashingmagazine.com/2020/01/introduction-react-context-api/

// Components can be functions with hooks or classes
const App = () => {
  // render(){    
  //   const name = 'John Doe';
  //   const loading = false;
  //   // const foo = () => 'Bar';

  //   if (loading) {
  //     return <h4>Loading...</h4>
  //   }

  //   // This is actually Javascript (JSX), not HTML
  //   return (
  //     //You must only return one parent element, in this case the Div. To avoid this you have to use a fragment
  //     <div className="App">
  //       {/* <h1>Hello {name.toUpperCase()}</h1> */}
  //       {/* <h1>Hello {foo()}</h1> */}
  //       {loading ? <h4>Loading...</h4> : <h1>Hello {name}</h1>}
  //       <h1>Hello {name}</h1>
  //     </div>
  //   );

  //   //What it would look like as Javascript
  //   // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello from React'));
  // }

  // this serves the same function as the state object, but when using hooks
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useState({});
  // const [repos, setRepos] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [alert, setAlert] = useState(null);

  // If you want to use state or use lifecycle functions, the component has to be a class based component!!! (when not using hooks)
  // state = {
  //   users: [],
  //   user: {},
  //   repos: [],
  //   loading: false,
  //   // alert is an object containing a message and type
  //   alert: null,
  // }

  // like render this is a lifecycle method, render is required while componentDidMount is optional
  // This method will run the initial github request to grab the list of users
  // async componentDidMount() {
  //   // Can't change state directly while using class based components, have to use setState function
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users: res.data, loading: false });

  //   // console.log(res.data);
  // }

  // // Search Github users
  // const searchUsers = async text => {
  //   console.log(text);
  //   setLoading(true);
  //   const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   setUsers(res.data.items);
  //   setLoading(false);
  // }

  // // Get single Github user
  // const getUser = async (username) => {
  //   setLoading(true);
  //   const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   setUser(res.data);
  //   setLoading(false);
  // }

  // Get users repos
  // const getUserRepos = async username => {
  //   setLoading(true);
  //   const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   setRepos(res.data);
  //   setLoading(false);
  // }

  // // sets alert message when input field is empty
  // const showAlert = (msg, type) => {
  //   setAlert({ msg, type });

  //   setTimeout(() => setAlert(null), 5000);
  // }

  // Run automatically by component

  // to avoid writing this.state so many time, decomposing
  // const { users, user, repos,  loading } = this.state;

  return (
    <GithubState>
      <AlertState>
        {/* Router used for multiple pages */}
        <Router>
          {/* always have to return a div, you can substitute with Fragments but double check this!!! */}
          <div className='App'>
            <Navbar />
            <div className='container'>
              {/* Determines whether or not Alert notification is shown or not based on the state in App component */}
              <Alert />
              <Switch>
                {/* Home Page */}
                <Route exact path="/"  component={Home}/>
                {/* // <Route exact path="/" render={props => (
                //   // https://dev.to/tumee/react-fragments-what-why-how-2kh1 Article on Fragments
                //   // Basically allows us to return multiple elements, without using a div because divs don't render
                //   // Because when u look at Search and Users they return a div
                //   <Fragment>
                //     <Search
                //     // a prop is being sent up from the Search Component, which is calling a function in App.js called searchUsers. The property that was passed in Search.js is sent up into the searchUsers function here
                //     // searchUsers={searchUsers}
                //     // This will determing if the clear button is shown
                //     // showClear={users.length > 0 ? true : false}
                //     // This is a prop that is being sent from the Search Component back up to the App Component to clear the Users
                //     // clearUsers={clearUsers}
                //     // This function is called in the App component from the Search component when the 
                //     // setAlert={showAlert}
                //     />
                //     <Users />
                //   </Fragment>
                // )} /> */}
                {/* About Page */}
                <Route exact path='/about' component={About} />
                {/* User Page */}
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch>

            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>

  );


}

export default App;
