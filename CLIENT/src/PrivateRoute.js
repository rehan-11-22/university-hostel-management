// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Spinner } from 'reactstrap';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user, initializing } = useAuth();

  console.log("IsAuthentication ", isAuthenticated)


  // console.log("In privatepath ==>",isAuthenticated,user);

  return (
    <Route {...rest} render={props => {
      if (initializing) {
        console.log("initialize in private route ", initializing);
        return <div className='flex-center'><Spinner></Spinner></div>;
      } else {



        if (!isAuthenticated) {
          // Not logged in, redirect to login page
          return <Redirect to={{ pathname: '/auth/sign-in', state: { from: props.location } }} />;
        }

        if (roles && !roles.includes(user.role)) {
          // Role not authorized, redirect to home page or a 'not authorized' page
          return <Redirect to={{ pathname: '/auth/sign-in' }} />;
        }

        // Authorized, render component
        return <Component {...props} />;
      }
    }} />
  );
};

export default PrivateRoute