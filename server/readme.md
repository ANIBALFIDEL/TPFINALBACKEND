DESCRIPCIÓN DEL PROYECTO

Proyecto de administración de un centro odontológico, desarrollado con Mongo, Node, Express y handlebars.
El presente sistema está destinado a la gestión de turnos de un profesiónal de la odontología, principalmente en un ámbito privado. Para poder utilizarlo el mismo ingresará como administrador y se le permitirá cargar los turnos con fecha y hora que estarán disponibles para atender a sus pacientes. Asimismo, podrá listar todos los turnos que ha cargado, y ver si los mismos se encuentran libres o reservados, y en este último caso, podrá ver el nombre e email del paciente. Por otra parte, los usuarios tienen la posibilidad de registrarse en el sitio, y acceder desde el menú de inicio de sesión. Esto les permitirá consultar turnos disponibles, reservarlos y/o anular reservas ya realizadas.


LIBRERÍAS USADAS:

FRONT: 
Se utilizó renderizado del lado del servidor con Handlebars.
Bootstrap mediante su CDN para estilado de las páginas.

BACKEND:
cors.
mongoose para modelado y conexión con la base de datos en Mongo Atlas.
dotenv.
express-session para el manejo de sesiones.
bcrypt para encriptación de contraseñas.
express-router.
handlebars-dateformat para dar formato a fechas y horas al mostrar al usuario.

