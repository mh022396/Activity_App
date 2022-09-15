import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import {  Header} from 'semantic-ui-react';
import { useStore } from '../../app/store/store';
import ActivityListItem from './ActivityListItem';

const ActivityList = () => {
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;

    return (
        <Fragment>
            {groupedActivities.map(([group, activities]) => {
                return (<Fragment key={group}>
                    <Header sub color='teal'>{group}</Header>
                        {activities.map(activity => (
                            <ActivityListItem activity={activity} key={activity.id}/>
                        ))}
                </Fragment>);
            })}
        </Fragment>
    );
}

export default observer(ActivityList);