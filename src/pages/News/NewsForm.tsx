import React from 'react';
 import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { getSearchingNews } from '../../redux/news-reducer';

 export const NewsForm = () => {
   let dispatch=useDispatch();
   return(
   <div className='news-form'>
     <Formik
       initialValues={{ text:''}}
       validate={values => {
         const errors = {};
        //  if (!values.text) {
        //    errors.text = 'Required';
        //  }
        //  return errors;
       }}
       onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(getSearchingNews(values.text))
        setSubmitting(false);
        resetForm();
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             name="text"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.text}
             placeholder='News'
           />
           {errors.text && touched.text}
           <button type="submit" disabled={isSubmitting}>
             Search
           </button>
         </form>
       )}
     </Formik>
   </div>
 );
}