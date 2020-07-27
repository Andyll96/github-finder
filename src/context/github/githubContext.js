// The Context API is a component structure provided by the React framework, which enables us to share specific forms of data across all levels of the application. It's aimed at solving the problem of prop drilling. The alternative is Redux for larger applications

import {createContext} from 'react';

const githubContext = createContext();

export default githubContext;