import API_BASE_URL from "@/config/apiConfig";
import PUBLIC_SERVER_KEY from "@/config/publicServerKey";


if (typeof window !== 'undefined') {
	navigator.serviceWorker.register('/sw.js');
}
export function requestPermission() {
	if (typeof window !== 'undefined') {
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				// Obtener el service worker
				navigator.serviceWorker.ready.then((sw) => {
					// Suscribirse
					sw.pushManager.subscribe({
						userVisibleOnly: true,
						applicationServerKey: `${PUBLIC_SERVER_KEY}`
					}).then((subscription) => {
						// Suscripción exitosa
						// Enviar la suscripción al servidor
						sendSubscriptionToServer(subscription);
					});
				});
			}
		});
	}
}

function sendSubscriptionToServer(subscription) {
	// Obtener el token de acceso de la suscripción
	const token = subscription.endpoint.split('/').slice(-1)[0];
	const waiter_token = localStorage.getItem('waiter_token');

	// Construir la solicitud
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// Incluir el token de acceso en el encabezado de la solicitud
			'Authorization': 'Bearer ' + waiter_token
		},
		body: JSON.stringify(subscription)
	};

	// Enviar la solicitud al servidor
	fetch(`${API_BASE_URL}/push-notification`, requestOptions)
		.then(response => {
			if (response.ok) {
				//     alert("OK");
			} else {
				throw new Error('Error al enviar la suscripción al servidor');
			}
		})
		.catch(error => {
			console.error('Error:', error);
		});
}