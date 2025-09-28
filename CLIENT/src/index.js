import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertProvider } from 'contexts/AlertContext';
import { AuthProvider } from 'contexts/AuthContext';
import PrivateRoute from 'PrivateRoute';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import Suprident from 'layouts/suprident';
import Clark from 'layouts/clark';
import Student from 'layouts/student';
import "config/global"



//css file for tostify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"

const App = () => {
	return (
		<>
			<ChakraProvider theme={theme}>
				<React.StrictMode>
					<AuthProvider>
						<AlertProvider>
							<ThemeEditorProvider>
								<BrowserRouter>
									<Switch>
										<Route path="/auth" component={AuthLayout} />
										{/* <PrivateRoute path="/auth" component={AuthLayout} /> */}
										<PrivateRoute path="/admin" component={AdminLayout} roles={['admin']} />
										<PrivateRoute path="/suprident" component={Suprident} roles={['suprident']} />
										<PrivateRoute path="/student" component={Student} roles={['student']} />
										<PrivateRoute path="/clark" component={Clark} roles={['clark']} />
										<Redirect from='/' to='/auth/sign-in' />
									</Switch>
								</BrowserRouter>
							</ThemeEditorProvider>
						</AlertProvider>
					</AuthProvider>
				</React.StrictMode>
			</ChakraProvider>
			<ToastContainer />
		</>
	);
};

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
