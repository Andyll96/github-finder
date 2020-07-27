import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/AlertContext'

// const Search = ({ showClear, clearUsers, setAlert}) => {
const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    // state = {
    //     text: ''
    // }

    // when using hooks, this is how we setup state. Using destructuring also
    // text is the state variable that is being set to '', set count is the function we are using to change the state variable
    const [text, setText] = useState('');

    // static propTypes = {
    //     searchUsers: PropTypes.func.isRequired,
    //     clearUsers: PropTypes.func.isRequired,
    //     showClear: PropTypes.bool.isRequired,
    //     setAlert: PropTypes.func.isRequired,
    // }

    // Once the state is changed by typing in the input field, when the submit button is pressed we have to pass the state as a prop up to App.js to make the GET request
    // To make this simple and work properly, make this function an arrow function. Otherwise you have to bind the this keyword for the function
    const onSubmit = (e) => {
        // You would do e.preventDefault in regular Javascript, otherwise it'll submit to a file
        e.preventDefault();

        if (text === '') {
            alertContext.setAlert('Please Enter Something', 'light');
        } else {
            // we have to this.state.text up to the app component, when this is a class based Component
            githubContext.searchUsers(text);
            setText('');
        }

    }

    // we set the state using [e.target.name] in case we have more than one input, in this case we don't
    const onChange = e => setText( e.target.value);

    return( 
        // the props that are passed into Search Component from App Component, when Search was a class based component
        // const { showClear, clearUsers } = this.props;
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input type="text" 
                    name="text" 
                    placeholder="Search Users..." 
                    // sets value from from state, so when the state is cleared so is the input field
                    value={text} 
                    // input needs onChange function to work, whe you type the function above is fired off
                    onChange={onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {/* depending on the boolean value of showClear, it will show a button to clear the users */}
                {/* On Click it will call a function in the App Component */}
                {/* {showClear && (<button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>)} */}
                {githubContext.users.length > 0 && (<button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>)}
            </div>
    )
}


export default Search
