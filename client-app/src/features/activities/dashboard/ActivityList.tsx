import * as React from 'react';
import { Button, Item, ItemGroup, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';

export interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

const ActivityList = ({ activities, selectActivity, deleteActivity, submitting }: Props) => {
    const [target, setTarget] = React.useState("");
    function handleActivityDelete(e: React.SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <ItemGroup divided>
                {
                    activities.map(activity => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => selectActivity(activity.id)} floated="right" color="blue" content="view" />
                                    <Button name={activity.id} loading={submitting && target === activity.id} onClick={(e) => handleActivityDelete(e, activity.id)} floated="right" color="red" content="delete" />
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

export default ActivityList;