import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Activity } from '../../app/models/activity';
import { useStore } from '../../app/store/store';
import ActivityDetails from '../activities/details/ActivityDetails';
import ActivityForm from '../activities/form/ActivityForm';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';


const ActivityDashboard = () => {

    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1){
            loadActivities();
        }
    }, [activityRegistry.size, loadActivities]);
    
    if(activityStore.loadingInitial) return <LoadingComponent />

    return (
        <Grid>
            {/* Max width == 16, 10 is roughly 62% */}
            <Grid.Column width='10'> 
                <ActivityList />
            </Grid.Column>
            <GridColumn width='6'>
                <ActivityFilters />
            </GridColumn>
        </Grid>
    );
}

export default observer(ActivityDashboard);