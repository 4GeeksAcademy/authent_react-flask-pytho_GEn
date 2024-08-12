const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: {},			
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// Registro de un usuario
			postSignup: (data) => {
				console.log(data)
				fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					body: JSON.stringify(data), // data can be `string` or {object}!

					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => console.log("Success:", response))
					.catch(error => console.error("Error:", error));
			},
			postLogin: (data) => {
				console.log(data)
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(data), // data can be `string` or {object}!

					headers: {
						"Content-Type": "application/json"
					}
					
				})
					.then(res => res.json())
					.then(data_ => localStorage.setItem("accessToken", data_.Message.token))
					.then(response => console.log(localStorage.getItem ('accessToken')))
					.catch(error => console.error("Error:", error));
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
