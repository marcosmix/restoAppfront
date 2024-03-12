<!-- App -->

## App

App contiene las vistas en general

## Css

Solo contiene los estilos generales

## Layout

Define la estructura de la vista y permite el enrutamineto

## Page

Representa la vista, contiene los diferentes componentes que renderizan la vista

## Components

Cada componente posee una vista padre, subcomponentes y estilos propios

# Customer

- Customer: vista padre
- Customeremoji: modal con emojis

# Login

- Login: vista

# Dashboard

<!-- Admin -->

- Vista Admin: vista padre
- AdminOrders: lista ordenes de pedido
- AdminSettings:permite de setear parametos del restaurant
- AdminWaiters: muestra los mozos loguados en el dia

<!-- Waiter -->

- Vista Waiter: vista padre 
- WaiterCheck: permite realizar toggle de mesas seleccionadas por el mozo
- WaiterDash: lista y muestra los parametros indivudales de cada mesa
- WaiterTables: nombre de mozo y listado de mesas a elegir del mozo

# NavBar

- NavBar posee un FakeNav que permiter navegar entre vistas rapido solo para el desarrollo
