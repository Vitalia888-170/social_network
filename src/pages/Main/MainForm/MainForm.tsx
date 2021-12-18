import React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { required, maxLengthMessage } from '../../../common/Utils/Validators/validators';
import { Textarea, CreateFields } from '../../../common/Forms/forms';
import { FormValuesTypeKeys } from '../../../common/Forms/forms';
import '../../../App.css';


export type AddMessageBodyType = {
   newMessageBody: string
}

type MainOwnPropsType = {}
type MainFormTypeKeys = FormValuesTypeKeys<AddMessageBodyType>

let maxLength = maxLengthMessage(100);
const PostForm: React.FC<InjectedFormProps<AddMessageBodyType, MainOwnPropsType> & MainOwnPropsType> = (props) => {
   return (
      <form onSubmit={props.handleSubmit} className="main-enteredField">
         {CreateFields<MainFormTypeKeys>("Add new post", "newMessageBody", Textarea, [required, maxLength])}
         <button className="main-formBtn" >Send</button>
      </form>
   )
}

let PostFormRedux = reduxForm<AddMessageBodyType & MainOwnPropsType>({ form: 'post' })(PostForm);
export default PostFormRedux;
