

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			passwd: null,
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
			fetchWithCheck: async (url, options = {}) => {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(JSON.stringify(errorData));
                    }
                    return await response.json();
                } catch (error) {
                    console.error("Error in fetch:", error.message);
                    return null;
                }
            },
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// Registro de un usuario
			postSignup: async (data) => {
				console.log(data)
				const response = await getActions().fetchWithCheck(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
				console.log("REPONSE DE SINGUP ", response)
				if (response) {
					setStore({ message: response.message });
					return true;
				}
				else{
					setStore({ message: "Error loading message from backend" })
					return false;
				}
			},
			postLogin: async (data) => {
				const response = await getActions().fetchWithCheck(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(data), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
				if (response) {
					localStorage.setItem("accessToken", response.token);
					setStore({ message: response.message });
					return true;
				}
				else{
					setStore({ message: "Error loading message from backend" })
					return false;
				}
			},
			getPrivate: async () => {
				try{
					// fetching data from the backend
					const token = localStorage.getItem("accessToken")
					const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
						headers : { 'Authorization': `Bearer ${token}` }, 
					});
					const data = await resp.json()
					setStore({ message: data.message })
					setStore({ passwd: data.Password })
					// don't forget to return something, that is how the async resolves
					if (data.msg === 'Not enough segments'){
						setStore({ message: "Error loading message from backend" })
						return false
					}
					return true;
				}catch(error){
					console.log("Error loading message from backend", error)
					setStore({ message: "Error loading message from backend" })
				}
			},
			logout: () => {
                localStorage.removeItem("accessToken");
                setStore({ user: null, isAuthenticated: false });
                window.location.href = "/login"; 
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
