
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from './Alert';

export const Private = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [ data, setData ] = useState({
		email: "",
		password: "",
		"is_active": true
	});
	const [error, setError] = useState({ message1: "" });
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("accessToken") === null){
			navigate("/login");
		}
        
    }, []);

	const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await actions.getPrivate();
		console.log(success)
		if (success) {
			setError({message1: `"Su password es: " ${store.passwd}`});
        } else {
			setError({message1: store.message});
        }
    };

	const info = event => {
		setData({
			...data,[event.target.name] : event.target.value
		})
	}

	return (
		<div className="container mb-2 center">
			<div style={{display: 'flex',justifyContent:'center', alignItems:'center' }}>
				<h1> Private Page</h1>
			</div>
			<form style={{justifyContent:'center', alignItems:'center' }}>
		
				<button type="button" onClick={handleSubmit} className="btn btn-primary">obtener password</button>
				{error.message1 &&<Alert message={error.message1} />}
			</form>


		 </div>
	);
};