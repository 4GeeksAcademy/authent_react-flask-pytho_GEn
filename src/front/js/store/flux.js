

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
					return false;
				}
			},
			postLogin: async (data) => {
				console.log(data)
				const response = await getActions().fetchWithCheck(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(data), // data can be `string` or {object}!

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
					return false;
				}
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
