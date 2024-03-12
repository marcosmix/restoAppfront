self.addEventListener('push', (e) => {
	notification = e.data.json();
	// {
	//     body:"hello",
	//     title:"hello",
	//     url:"http://localhost:8000"
	// }


	//como backend haciendo algo del front dejenme decirles que no me pagan lo suficiente
	// si alemnos me pagaran
	// ni esperen documentacion eh
	e.waitUntil(self.registration.showNotification(notification.title, {
		body: notification.body,
		icon: notification.icon,
		data: {
			url: notification.url
		}
	}))
})

self.addEventListener('notificationclick', (e) => {
	e.notification.close(); //cierro la notificacion como ella cerro su corazon
	e.waitUntil(clients.openWindow(e.notification.data.url))
})