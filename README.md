# Proyecto final de carrera Backend Dev de Coderhouse

# Materia: Programación Backend I: Desarrollo Avanzado de Backend

# Algunos puntos:
Link de lo que funciona hasta ahora en render (view con paginated):
https://be1-tpfinal.onrender.com/views/users/1

Endpoints a los que se puede llegar con Postman:
https://be1-tpfinal.onrender.com/api/users
https://be1-tpfinal.onrender.com/api/vehicles
https://be1-tpfinal.onrender.com/api/shipments

Todo lo que se impacte trabaja directamente con Atlas y se ve reflejado en la nube.


# En desarrollo:
Websockets con tracking status
Nav bar
Login
Main
Formularios


# Descripcion del proyecto
Idea: Plataforma de Gestión de Envíos en Tiempo Real para Pequeñas Empresas
Una aplicación para gestionar y rastrear envíos de productos (que en principio serán tratados como paquetes sin descripción de los productos que se transportan) para pequeñas empresas que necesitan tener visibilidad de su logística en tiempo real.
Esto incluye el seguimiento de paquetes, la asignación de transportistas, y la actualización en tiempo real del estado de los envíos.

Funcionalidades clave:

Usuarios y roles:
Contempla diferentes roles como administradores de logística, transportistas, y clientes.
Los administradores pueden crear envíos, asignar transportistas, y ver el estado de los paquetes en tiempo real.
Los transportistas pueden actualizar el estado de los envíos a medida que los transportan.
Los clientes pueden consultar el estado de sus envíos y recibir actualizaciones en tiempo real.

Gestión de envíos:
Los administradores pueden agregar envíos a la plataforma, especificando detalles como el origen, destino, y el transportista encargado.

Actualización en tiempo real con WebSockets:
Los transportistas pueden actualizar el estado del paquete en diferentes momentos del recorrido (por ejemplo: "en tránsito", "entregado").
Los clientes y administradores pueden ver las actualizaciones de estado en tiempo real sin necesidad de recargar la página.

Router y Handlebars:
Se usa router para gestionar las diferentes vistas, como la página principal, la gestión de envíos, y los detalles de un envío.
Se usa Handlebars para mostrar el listado de envíos, los detalles del paquete y su estado actual.


Ejemplo de flujo:

Un administrador crea un nuevo envío en la plataforma, asigna un transportista, y envía la notificación al cliente.

El transportista actualiza el estado del envío conforme progresa (recolección, en tránsito, entregado) y su ubicación en tiempo real usando WebSockets.

El cliente y el administrador reciben actualizaciones en tiempo real sobre el estado del envío.


Puntos a destacar

Interactividad en tiempo real: El uso de WebSockets para la actualización en tiempo real del estado de los envíos. (a futuro: la geolocalización le daría un toque moderno y funcional).

Relevancia práctica: La logística es un área clave para muchas empresas, y el proyecto muestra cómo resolver problemas logísticos que cualquier pequeña empresa con envíos necesita cubrir.

Amplitud: Este proyecto cubre un rango de temas desde el manejo de roles, hasta la persistencia de datos, y la interactividad en tiempo real.


Posibles mejoras (Para siguientes etapas en la carrera):

-Geolocalización y tracking: Se podría integrar una funcionalidad de geolocalización para que los transportistas puedan actualizar su ubicación en tiempo real (usando la API de geolocalización del navegador).

-Mostrar un mapa interactivo donde los usuarios puedan seguir en tiempo real la ubicación de sus paquetes mientras son transportados.

-Estadísticas de rendimiento: Agrega un dashboard para que los administradores puedan ver métricas como el tiempo promedio de entrega o los envíos completados por día.

-Integración con sistemas de transporte: Podría integrarlo con servicios de transporte externo (como APIs de mensajería) para obtener datos reales de tracking de otros proveedores.
