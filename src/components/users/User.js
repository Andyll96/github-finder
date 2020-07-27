import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';


const User = ({ match }) => {
    const githubContext = useContext(GithubContext)

    const {getUser, loading, user, repos, getUserRepos } = githubContext;
    // useEffect can be used for different things, incluidng componentDidUpdate. Causing the function to run on every update, including the ones that're caused by getUser and getUserRepos
    // the second argument is empty braces to mimick the result of componentDidMount
    useEffect(()=>{
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // React will yell at you telling you to add getUser and getUserRepos as a dependecy in the brackets, but it'll cause an infinite loop. Add the next line to stop this warning
        // eslint-disable-next-line
    }, []);

    // componentDidMount() {
    //     this.props.getUser(match.params.login);
    //     this.props.getUserRepos(match.params.login);
    // }


    const { name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable } = user;

    if (loading) {
        return <Spinner />
    }

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>Back to Search</Link>
                 Hireable: {' '}
            {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className='round-img' alt='' style={{ width: '150px' }} />
                    <h1>{name}</h1>
                    <p>{location}</p>
                </div>
                <div>
                    {bio && <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>}
                    <a href={html_url} className="btn btn-dar my-1">Visit Github Profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                <strong>Username: </strong> {login}
                            </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                <strong>Company: </strong> {company}
                            </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                <strong>Website: </strong> {blog}
                            </Fragment>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-light'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    )

}

export default User
