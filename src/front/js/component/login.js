
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { UNSAFE_RouteContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Alert from '../component/Alert';

export const Login = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [ data, setData ] = useState({
		email: "",
		password: "",
		"is_active": true
	});
	const [error, setError] = useState({ message1: "" });
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await actions.postLogin(data);
		if (success) {
            if (store.message == "User created successfully") {
                navigate("/privada");
				setError({message1: store.message});
				
            } 
            else {
                setError({message1: store.message});
				
            }
        } else {
			setError({message1: store.message});
        }





    };

	const info = event => {
		setData({
			...data,[event.target.name] : event.target.value
		})
	}

	console.log(localStorage.getItem ('accessToken'));

	return (
		<div className="container mb-2">
			<h1> FORMULARIO DE INGRESO </h1>
			<form>
				<div className="row mb-6">
					<label className="col-sm-2 col-form-label">Email</label>
					<div className="col-sm-10">
					<input type="email" className="form-control" onChange={info} name="email" value={data.email}/>
					</div>
				</div>
				<div className="row mb-3">
					<label className="col-sm-2 col-form-label">Password</label>
					<div className="col-sm-10">
					<input type="password" className="form-control" onChange={info} name="password" value={data.password} autoComplete="on"/>

					</div>
				</div>
				<button type="submit" onClick={handleSubmit} className="btn btn-primary">Login</button>
				{error.message1 &&<Alert message={error.message1} />}
			</form>


		 </div>
	);
};