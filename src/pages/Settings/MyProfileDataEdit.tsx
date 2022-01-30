import React from 'react'
import { Redirect } from 'react-router-dom';
import { InjectedFormProps, reduxForm } from 'redux-form'
import { CreateFields, FormValuesTypeKeys, Input, Textarea } from '../../common/Forms/forms';
import { required } from '../../common/Utils/Validators/validators';
import { ProfileType } from '../../types/types';

type ContactType = {
   github: string,
   vk: string,
   facebook: string,
   instagram: string,
   twitter: string,
   website: string,
   youtube: string,
   mainLink: string
}
export type FormValuesType = {
   lookingForAJob: boolean,
   aboutMe: string,
   lookingForAJobDescription: string,
   fullName: string,
   contacts: {
      github: string,
      vk: string,
      facebook: string,
      instagram: string,
      twitter: string,
      website: string,
      youtube: string,
      mainLink: string
   }
}
type OwnPropsType = {
   initialValues: ProfileType | null
}



const MyProfileDataEditForm: React.FC<InjectedFormProps<FormValuesType, OwnPropsType> & OwnPropsType> = (props) => {
   return (
      <form onSubmit={props.handleSubmit} className='profile-data-edit'>
         <div className='data'>
            <b>Fullname:</b><br />
            {CreateFields("name", "fullName", Input, [required])}
         </div>
         <div className='data'>
            <b>About me:</b><br />
            {CreateFields("aboutMe", "aboutMe", Input, [required])}
         </div>
         <div className='data data-looking-job'>
            <b>Looking for a job:</b>
            {CreateFields(undefined, "lookingForAJob", Input, [], { type: "checkbox" })}
         </div>
         <div className='data'>
            <b>Job Description:</b><br />
            {CreateFields("Job description", "lookingForAJobDescription", Input, [required])}
         </div>
         <div className='data'>
            <b>Github:</b><br />
            {CreateFields("Github", "contacts.github", Input, [required])}
         </div>
         <div className='data'>
            <b>Vk:</b><br />
            {CreateFields("Vk", "contacts.vk", Input, [required])}
         </div>
         <div className='data'>
            <b>Facebook:</b><br />
            {CreateFields("facebook", "contacts.facebook", Input, [required])}
         </div>
         <div className='data'>
            <b>Instagram:</b><br />
            {CreateFields("instagram", "contacts.instagram", Input, [required])}
         </div>
         <div className='data'>
            <b>Twitter:</b>
            {CreateFields("twitter", "contacts.twitter", Input, [required])}
         </div>
         <div className='data'>
            <b>Website:</b><br />
            {CreateFields("website", "contacts.website", Input, [required])}
         </div>
         <div className='data'>
            <b>Youtube:</b><br />
            {CreateFields("youtube", "contacts.youtube", Input, [required])}
         </div>
         <div className='data'>
            <b>Main link:</b><br />
            {CreateFields("mainLink", "contacts.mainLink", Input, [required])}
         </div>
         <button className='profile-button'>Save</button>
      </form>
   )
}
const ReduxProfileDataForm = reduxForm<FormValuesType, OwnPropsType>({ form: 'profile' })(MyProfileDataEditForm);

type PropsType = {
   saveProfileData: (profile: FormValuesType) => void,
   initialValues: any
}

const MyProfileDataEdit: React.FC<PropsType> = (props) => {
   const onSubmit = (formData: FormValuesType) => {
      props.saveProfileData(formData);
   }
   return (
      <div>
         <ReduxProfileDataForm initialValues={props.initialValues} onSubmit={onSubmit} />
      </div>

   )
}

export default MyProfileDataEdit;
