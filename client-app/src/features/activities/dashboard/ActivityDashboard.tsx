import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityList from './ActivityList';



const ActivityDashboard = () => {
    const { activityStore } = useStore();
    const { loadingInitial, activityRegistry, loadActivities } = activityStore;

    React.useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }

    }, [activityRegistry.size, loadActivities])


    if (loadingInitial) {
        return <LoadingComponent content="Loading App"></LoadingComponent>
    }

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />

            </Grid.Column>
            <Grid.Column width="6">
                <h2>Filters</h2>

            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDashboard);