import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate, Link  } from "react-router-dom";
import { Button, FormField, Header, Label, Segment, } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage  } from "formik";
import { values } from "mobx";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

const ActivityForm = () => {
    const navigate = useNavigate();
    const {activityStore} = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore; 
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState<Activity>({
        id:'',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required().nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if(id){
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [id, loadActivity]);

    const handleFormSubmit = (activity: Activity) => {
        if(activity.id.length === 0 ){
            let newActivity = { ...activity, id: uuid()};
            createActivity(newActivity).then(() => {
                navigate(`/activities/${newActivity.id}`);
            });
        }
        else{
            updateActivity(activity).then(() => {
                navigate(`/activities/${activity.id}`);
            })
        }
    }

    // const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]:value})
    // }

    if(loadingInitial) return <LoadingComponent content="loading activity..."/>

    return(
        <Segment clearing>
            <Header content='Activity Details' sub color="teal"/>
            <Formik enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)} validationSchema={validationSchema}>
                {({ handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>

                        <MyTextInput name='title' placeholder="Title" />
                        <MyTextArea placeholder='Description' name='description' rows={3}/>
                        <MySelectInput placeholder='Category' name='category' options={categoryOptions}/>
                        <MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption="time" dateFormat='d MMMM, yyyy h:mm aa' />
                        <Header content='Location Details' sub color="teal"/>
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />

                        <Button floated="right" positive type="submit" content='Submit' loading={loading} disabled={isSubmitting || !dirty || !isValid}/>
                        <Button floated="right" type="button" content='Cancel' as={Link} to='/activities'/>
                    </Form>
                )}
            </Formik>

        </Segment>
    );
}

export default observer(ActivityForm);