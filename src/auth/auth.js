import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from 'vue-router'
import router from "../router";
import { API_URL } from "../config/global";

const url = API_URL

export default {
	setUserLogged(token) {
		localStorage.setItem("apiKey", token);
	},
	getUserLogged() {
		return localStorage.getItem("apiKey");
	},
	expiresIn(time) {
		var timeUpdate = moment().add(time, 'seconds');
		Cookies.set("expiresIn", timeUpdate);
	},
	async refreshToken(name = null) {
		const apiKey = localStorage.getItem("apiKey");

		// Si no hay token, cerrar sesión inmediatamente
		if (!apiKey) {
			await this.logoutSession();
			return false;
		}

		const dateExpires = Cookies.get("expiresIn") ? new Date(Cookies.get("expiresIn")) : new Date();
		let fecha1 = moment(dateExpires);
		let fecha2 = moment();
		let diff = fecha1.diff(fecha2, 'minutes');

		if (diff >= 10) {
			return false;
		}

		let fechaExpiracion = Cookies.get("expiresIn");
		if (!fechaExpiracion || moment(fechaExpiracion).isBefore(moment())) {
			await this.logoutSession();
			return false;
		}

		try {
			const response = await fetch(url + 'refresh/token', {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + apiKey,
					'Content-Type': 'application/json',
					'Accept': 'application/json; html/text'
				}
			});

			if (response.status === 401) {
				await this.logoutSession();
				return false;
			}

			const responseData = await response.json();

			if (responseData.status) {
				this.setUserLogged(responseData.access_token);
				this.expiresIn(responseData.expires_in);
			}
		} catch (error) {
			await this.logoutSession();
		}
	},
	async logoutSession() {
		try {
			const apiKey = localStorage.getItem("apiKey");

			if (apiKey) {
				await fetch(url + 'logout', {
					method: 'POST',
					headers: {
						'Authorization': 'Bearer ' + apiKey
					}
				});
			}
		} catch (error) {
			console.error("Error cerrando sesión:", error);
		}

		// Limpiar toda la sesión y redirigir a Signin
		Cookies.remove("userLogged");
		Cookies.remove("expiresIn");
		localStorage.removeItem('apiKey');
		localStorage.removeItem('user');
		localStorage.removeItem('privilegies');

		router.push('/signin'); // Redirigir a la pantalla de inicio de sesión
	},
	deleCookies(name = null) {
		Cookies.remove("userLogged");
		Cookies.remove("expiresIn");
		if (name !== 'Signin') {
			router.push('/')
		}
	},
	async validateSession() {
		let apiKey = localStorage.getItem("apiKey");
		let fechaExpiracion = Cookies.get("expiresIn");

		// Si no hay token, cerrar sesión inmediatamente
		if (!apiKey) {
			await this.logoutSession();
			return;
		}

		if (!fechaExpiracion) {
			await this.logoutSession();
			return;
		}

		let fecha1 = moment(fechaExpiracion);
		let fecha2 = moment();
		let diff = fecha1.diff(fecha2, 'minutes');

		// Si la sesión ha expirado, cerrar sesión y redirigir
		if (diff <= 0) {
			await this.logoutSession();
			return;
		}
	},
	async secureFetch(urlEndpoint, options = {}) {
		const apiKey = localStorage.getItem("apiKey");

		if (!apiKey) {
			await this.logoutSession();
			return null;
		}

		// Agregar encabezados con token
		const headers = {
			'Authorization': 'Bearer ' + apiKey,
			'Content-Type': 'application/json',
			...options.headers
		};

		try {
			const response = await fetch(url + urlEndpoint, {
				...options,
				headers
			});

			// Si la respuesta es 401, cerrar sesión
			if (response.status === 401) {
				await this.logoutSession();
				return null;
			}

			return response.json();
		} catch (error) {
			await this.logoutSession();
			return null;
		}
	}
}
