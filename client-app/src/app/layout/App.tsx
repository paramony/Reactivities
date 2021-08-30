import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/Details/ActivityDetails';

function App() {

  const location = useLocation();
  return (
    <div >
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar ></NavBar>
            <Container style={{ marginTop: '7em' }}>

              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route key={location.key} exact path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
            </Container>
          </>
        )}
      ></Route>

    </div>
  );
}

export default observer(App);
