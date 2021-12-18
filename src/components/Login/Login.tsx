import React, { useEffect } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import '../../App.css';
import { required } from '../../common/Utils/Validators/validators';
import { useDispatch, useSelector } from "react-redux";
import { CreateFields, Input } from '../../common/Forms/forms';
import { Login } from '../../redux/auth-reducer';
import { Slider } from './Slider';
import { FormValuesTypeKeys } from '../../common/Forms/forms';
import { getCaptchaUrl } from '../../selectors/selectors';

type LoginOwnPropsType = {
	captchaUrl: string | null
}
export type LoginFormValuesType = {
	email: string,
	password: string,
	rememberMe: boolean,
	captcha: string
}
type LoginFormValuesTypeKeys = FormValuesTypeKeys<LoginFormValuesType>;

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginOwnPropsType> & LoginOwnPropsType> = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<form onSubmit={handleSubmit} className="formList">
			<div>
				{CreateFields<LoginFormValuesTypeKeys>("Email", "email", Input, [required])}
			</div>
			<div>
				{CreateFields<LoginFormValuesTypeKeys>("Password", "password", Input, [required], { type: "password" })}
			</div>
			<div className="underline"></div>
			<p>Enter and enjoy YoTalki</p>
			<div className="remember">
				{CreateFields<LoginFormValuesTypeKeys>(undefined, "rememberMe", Input, [], { type: "checkbox" })}
				<span>Remember me</span>
			</div>
			<div>
				{error && <div className="commonError">{error}</div>
				}
			</div>
			<div>
				{captchaUrl && <img src={captchaUrl} />}
				{captchaUrl && CreateFields<LoginFormValuesTypeKeys>("Enter symbols", "captcha", Input, [required])}
			</div>
			<div>
				<button className="loginBtn">Sign in</button>
			</div>
		</form>
	)
}

let LoginReduxForm = reduxForm<LoginFormValuesType, LoginOwnPropsType>({ form: 'login' })(LoginForm);

type PropsType = {}

export const LoginPage: React.FC<PropsType> = () => {
	const captchaUrl = useSelector(getCaptchaUrl);
	const dispatch = useDispatch();
	useEffect(() => {
		localStorage.setItem('isAuth', 'no');
	}, []);
	let onSubmit = (formData: LoginFormValuesType) => {
		dispatch(Login(formData.email, formData.password, formData.rememberMe, formData.captcha));
	}
	return (
		<div className="login-container">
			<div className="block">
				<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
				<Slider />
			</div>
		</div>
	)
}

