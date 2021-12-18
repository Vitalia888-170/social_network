import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLengthMessage } from '../../common/Utils/Validators/validators';
import { CreateFields, Textarea } from '../../common/Forms/forms';
import { newMessageFormType } from './Dialogs';

type PropsType = {};
type LoginFormValuesTypeKeys = Extract<keyof newMessageFormType, string>;
let maxLength = maxLengthMessage(100);


const DialogForm: React.FC<InjectedFormProps<newMessageFormType, PropsType> & PropsType> = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         {CreateFields<LoginFormValuesTypeKeys>("Enter New Message", "newDialogBody", Textarea, [required, maxLength])}
         <button>Send</button>
      </form>
   );
}

export default reduxForm<newMessageFormType>({ form: 'dialogMessage' })(DialogForm);
