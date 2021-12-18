import React from 'react';
import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../redux/users-reducer';
import { useSelector } from 'react-redux';
import { getUserFilter } from '../../selectors/selectors';

const userSearchFormValidate = (values: FormType) => {
   const errors = {}
   return errors;
}
type PropsType = {
   onFilterChanged: (filter: FilterType) => void
}
type Friend = 'true' | 'false' | 'null';
type FormType = {
   term: string,
   friend: Friend
}
const UserSearchForm: React.FC<PropsType> = React.memo((props) => {
   const filter = useSelector(getUserFilter);

   const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
      const filter = {
         term: values.term,
         friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
      }
      props.onFilterChanged(filter);
      setSubmitting(false);
   }

   return <div>
      <Formik
         enableReinitialize
         initialValues={{ term: filter.term, friend: String(filter.friend) as Friend }}
         validate={userSearchFormValidate}
         onSubmit={submit}
      >
         {({ isSubmitting }) => (
            <Form className='user-form'>
               <Field className='search-friends' type="text" name="term" placeholder='Find users ...' />
               <Field className='user-select' as="select" name="friend">
                  <option value='null'>All</option>
                  <option value='true'>Followed</option>
                  <option value='false'>Unfollowed</option>
               </Field>
               <button type="submit" disabled={isSubmitting}>Find </button>
            </Form>
         )}
      </Formik>
   </div>
});
export default UserSearchForm;