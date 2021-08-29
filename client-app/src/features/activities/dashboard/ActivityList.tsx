import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button, Item, ItemGroup, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



const ActivityList = () => {

    const { activityStore } = useStore();
    const { deleteActivity, activitiesByDate, loading } = activityStore;
    const [target, setTarget] = React.useState("");
    function handleActivityDelete(e: React.SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <ItemGroup divided>
                {
                    activitiesByDate.map(activity => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => activityStore.selectActivity(activity.id)} floated="right" color="blue" content="view" />
                                    <Button name={activity.id} loading={loading && target === activity.id} onClick={(e) => handleActivityDelete(e, activity.id)} floated="right" color="red" content="delete" />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))
                }
            </ItemGroup>
        </Segment>
    );
}

export default observer(ActivityList);