import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () =>
    // Don't need a return becuase this is an arrow function
    <Fragment>
        <img src={spinner} alt='Loading...' style={{ width: '200px', margin: 'auto', display: 'block' }} />
    </Fragment>


export default Spinner