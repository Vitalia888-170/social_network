import React from 'react';
import '../../App.css';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorsType } from '../Utils/Validators/validators';
type FormControlPropsType = {
	meta: WrappedFieldMetaProps
}

export type FormValuesTypeKeys<T> = Extract<keyof T, string>;
export const FormControl: React.FC<FormControlPropsType> = ({ meta, children, ...props }) => {
	const hasError = meta.error && meta.touched
	return (
		<div className={"formControl" + " " + (hasError ? "error" : " ")}>
			{children}
			<div>
				{hasError && <span>{meta.error}</span>
				}
			</div>
		</div>
	)
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
	const { input, meta, ...restProps } = props;
	return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}


export const Input: React.FC<WrappedFieldProps> = (props) => {
	const { input, meta, ...restProps } = props;
	return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}
export type LoginFormValuesType = {
	email: string,
	password: string,
	rememberMe: boolean,
	captcha: string
}

export function CreateFields<FormKeys extends string>(placeholder: string | undefined,
	name: FormKeys, component: React.FC<WrappedFieldProps>,
	validators: Array<FieldValidatorsType>, props = {}) {
	return (
		<div>
			<Field className="form"
				name={name} component={component}
				validate={validators} placeholder={placeholder}
				{...props} />
		</div>
	)

}
