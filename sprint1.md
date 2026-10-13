# Sprint 1 - Planeación

El equipo (Infotech-A) plantea la siguiente documentación como una planeación y delimitamiento preeliminar al desarrollo del sistema (Mastertek StreamGrid) requerido por el cliente (Mastertek Geosystems).

## Introducción

El cliente requiere de una administración más centralizada de tres áreas principales

  - Modificación en vivo de documentos.
  - Centralización de consulta para cámaras de seguridad.
  - Acceso remoto a puertos USB para hacer uso de llaves de software.

Nuestro enfoque actual será en el área de cámaras de seguridad.

El sistema de videovigilancia del cliente cuenta con más de una ubicación y con sistemas de software nativamente distinto; establecer una sola aplicación web que permita acceder a la transmisión en vivo
de la videovigilancia al igual que el almacenamiento longevo de grabaciones de seguridad consta unificar estas tecnologías distintas en un solo "hub". A esta centralización y toda la configuración de 
software/hardware que conlleva se le denominará "Mastertek CCTV".

## Requisitos

A través de un proceso de recopilación de datos preeliminar realizado previo a este primer sprint, se han delimitado los siguientes requisitos funcionales basados en entrevistas y observación con el cliente.

  - **RF-01** Acceso a una sola aplicación que permita ver la transmisión en vivo de los sistemas de videovigilancia, al igual que las grabaciones guardadas en memoria física.
  - **RF-02** Permisos de acceso y consulta de datos CCTV administrables por un solo usuario maestro (admin).
  - **RF-03** El sistema centralizado deberá poder validar los permisos asignados por el usuario admin para permitir el acceso solo a aquellos que tengan las credenciales permitidas.
  - **RF-04** El sistema deberá guardar los datos de acceso en una base de datos local.
  - **RF-05** El sistema deberá guardar los datos de grabación en una base de datos local.
  - **RF-06** La base de datos deberá estar físicamente apartada de cualquiera de los sitios donde haya videovigilancia.
  - **RF-07** La transmisión de video no se puede interrumpir, ni del lado del transmisor como del receptor.
  - **RF-08** La base de datos de grabación deberá de guardar un mínimo de 7 días de antigüedad.

Se han delimitado también los siguientes requisitos no funcionales.

  - **NF-01** El sistema debe de dejar disponible el espacio para añadir 4 cámaras de seguridad adicionales al hub de grabación. 
  - **NF-02** El sistema debe de tardar menos de 10 segundos en acceder tanto a la grabación permanente de video como a la transmisión en vivo.
  - **NF-03** El sistema no debe de tener muchas capas de acción, los empleados tienen que poder acceder al hub CCTV sin más pasos de los que requiere una verificación 2FA.

## Casos de uso

  Los siguientes casos de uso son los que se han identificado cómo los más comunes o más probables en el caso del portal web.

  - **CU-01** Consultar registro de auditoría: Permite acceder a la whitelist y modificar los permisos de cada ususario de la whitelist.
    - **Principal actor:** Admin
  - **CU-02** Asignar permisos: Permite modificar las acciones permitidas a partir de sus credenciales en el registro de auditoría.
    - **Principal actor:** Admin
  - **CU-03** Gestionar empleados: Permite modificar las credenciales cuyo acceso será permitido a la hora de intentar ingresar al portal.
    - **Principal actor:** Admin
  - **CU-04** Descargar grabación: Permite descargar los datos de grabación de la base de datos hacia un almacenamiento local.
    - **Principal actor:** Empleado autorizado
  - **CU-06** Consultar grabaciones: Permite revisar las grabaciones de la base de datos de grabación.
    - **Principal actor:** Empleado autorizado
  - **CU-07** Controlar PTZ: Permite acceder y usar el control PTZ (Pan, Tilt, Zoom) de las cámaras que lo permitan.
    - **Principal actor:** Empleado autorizado
  - **CU-08** Ver cámaras en vivo: Permite revisar la transmisión de video en vivo del hub de vigilancia.
    - **Principal actor:** Empleado autorizado
  - **CU-09** Validar permisos del usuario: Permite asegurar con certeza que el usuario que está intentando acceder al portal está autorizado tanto en la whitelist como en el proxy.
    - **Principal actor:** Proxy
  - **CU-10** Iniciar sesión: Permite, al ingresar credenciales (usuario, contraseña, 2FA), ingresar al sitio web.
    - **Principal actor:** Empleado autorizado

## Modelo entidad-relación (ER)
<img width="1200" height="1600" alt="Diagrama" src="https://github.com/user-attachments/assets/beb8de37-e19e-4864-9f8b-02cf4285a206" />


## Historias de usuario

  Se presentan a continuación las historias de usuario que se pudieron recopilar al realizar entrevistas.

  -* *Como administrador, quiero poder acceder al sistema de manera simple para no gastar tiempo útil en cambiar de aplicaciones* *
  -* *Como administrador, quiero tener la posibilidad de añadir 4 cámaras de seguridad adicionales al sistema de videovigilancia para expandir mi alcance de vigilancia a otras propiedades* *
  -* *Como administrador, quiero que mis empleados tengan la capacidad de usar el sistema sin dificultad para que el acceso a videovigilancia no esté centralizado en una sola persona* *

## Criterios de aceptación

### Autenticación y Control de Acceso
- El sistema permite el inicio de sesión únicamente si las credenciales son correctas y se aprueba el 2FA.
- El proxy configurado adecuadamente deberá rechazar automáticamente cualquier intento de acceso de usuarios que no estén registrados en la whitelist.
- el usuario Admin tiene la capacidad de agregar, modificar o eliminar usuarios de la whitelist.
- El sistema de login valida todas las entradas de texto antes de procesarlas, bloqueando cualquier intento de inyección SQL.
- El flujo completo de acceso no excede los pasos estrictamente necesarios (Credenciales + 2FA) sin añadir capas de mas.

###  Transmisión de Video en tiempo real
- La web muestra la transmisión en vivo de las cámaras integradas de manera ininterrumpida.
- Las funciones de control PTZ (Pan, Tilt, Zoom) responden correctamente desde la interfaz web para las cámaras compatibles.
- La transmisión de video hacia el usuario final se realiza de forma segura a través del túnel VPN configurado con WireGuard.
- Las cámaras IP están configuradas dentro de la red LAN de forma que son inaccesibles públicamente desde el exterior del router.

### Almacenamiento, Consulta y Retención
- El sistema guarda continuamente las grabaciones de video en el servidor NAS casero configurado.
- El servidor NAS y la base de datos se encuentran en un entorno físico separado de las sucursales vigiladas.
- El sistema, mediante un proceso automatizado garantiza la disponibilidad de al menos los últimos 7 días de grabación.
- Un usuario autorizado puede buscar, visualizar y reproducir una grabación almacenada.
- Un usuario autorizado puede descargar un fragmento de grabación desde el NAS hacia su almacenamiento local.

## Responsables

  los roles definidos para el proyecto sera:
  - Mauricio Ramirez de la Rosa: especialista de seguridad, analista de requerimientos
  - Diego Sebastian Medina Lara: desarrollador frontend
  - Etzael Esquivel Luna: desarrollador backend
  - Dania Yaretzi Gómez Zermeño: diseñador de base de datos
  - Alejandro González García: desarrollador fullstack


## Metas
- Centralizar el sistema de videovigilancia: Integrar y unificar las tecnologías de transmisión en vivo y almacenamiento de las distintas sucursales en un único hub central.
- Asegurar la continuidad operativa: Garantizar la transmisión ininterrumpida de video, tanto desde el lado del transmisor como del receptor.
- Garantizar el almacenamiento local y la retención de datos: Implementar una base de datos local físicamente separada de las ubicaciones monitoreadas, asegurando la retención de grabaciones por un periodo mínimo de 7 días de antigüedad.
- Optimizar y simplificar el acceso: Ofrecer un acceso seguro, rápido y sencillo (en menos de 10 segundos y sin superar las verificaciones de seguridad como 2FA), permitiendo a los empleados autorizados consultar cámaras y grabaciones sin complicaciones.
- Escalabilidad del sistema: Prever y dejar disponible el espacio necesario para añadir hasta 4 cámaras adicionales al hub de grabación en el futuro.
- Gestión centralizada de accesos y seguridad: Permitir la administración de permisos mediante un usuario maestro (admin) y un proxy de validación, garantizando que únicamente el personal autorizado en la lista blanca pueda ingresar y operar en el portal. 

## Requisitos de seguridad
Siguiendo con la recopilación de datos tambien tenemos presentes los siguientes requisitos de seguridad:
  - **RS-N1** el sistema debe contar con validaciónes basicas de I/O para evitar inyecciones SQL, o corrupción de datos.
  - **RS_N2** el sistema debe guardar los videos grabados en un servidor NAS casero.
  - **RS_N3** El sistema debe contar con una VPN en wireguard para transmitir video de forma segura.
  - **RS_N4** El sistema debe proporcionar una configuración de las redes LAN, para que evitar que las camaras conectadas al router IP sean visibles por alguien externo.   
  - **RS_N5** El sistema debe validar credenciales de login del protal web a travéz de whitelist y un proxy especialmente configurado.
