import React, { useEffect, Fragment } from 'react';
import './styles.css';
import { Button, Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {

  const location = useLocation();

  return (
    <Fragment >
      <ToastContainer position='bottom-right' hideProgressBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/*' element={
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Routes>
                
                <Route path='/activities' element={<ActivityDashboard />} />
                <Route path='/activities/:id' element={<ActivityDetails />} />
                <Route path='/createActivity' element={<ActivityForm />} />
                <Route path='/manage/:id' element={<ActivityForm key={location.key}/>} />
                <Route path='/errors' element={<TestErrors />} />
                <Route path='/server-error' element={<ServerError />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Container>
          </>
        } />

      </Routes>
    </Fragment>
  );
}

export default observer(App);
