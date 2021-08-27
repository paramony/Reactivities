import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

export interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void
}

const ActivityDashboard = ({ activities, selectedActivity, deleteActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit }: Props) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} deleteActivity={deleteActivity} selectActivity={selectActivity}></ActivityList>
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity && !editMode && <ActivityDetails
                    activity={selectedActivity}
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}
                ></ActivityDetails>}
                {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}></ActivityForm>}
            </Grid.Column>
        </Grid>
    );
}

export default ActivityDashboard;