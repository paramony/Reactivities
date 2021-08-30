import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from "uuid";


const ActivityForm = () => {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = React.useState({
        id: "",
        title: "",
        category: "",
        city: "",
        date: "",
        description: "",
        venue: ""
    });

    React.useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [id, loadActivity])

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }

    }
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }
    if (loadingInitial) {
        return <LoadingComponent content="Loading Activity..." />
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Date" type="date" value={activity.date} name="date" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}></Form.Input>
                <Button floated="right" loading={loading} content="Submit" type="submit" positive></Button>
                <Button as={Link} to="/activities" floated="right" content="Cancel" color="grey" type="button" ></Button>
            </Form>
        </Segment>
    );
}

export default observer(ActivityForm);