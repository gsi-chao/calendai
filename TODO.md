
# CalendAI - Plan de desarrollo

## Requerimientos no funcionales

- [x] Autenticación usando Clerk
  - [x] Proteccion de rutas para usuarios no autenticados
  - [x] Creación de pagina de login
  - [x] Creación de pagina de registro
- [x] Instalar y configurar shadcn/ui
- [x] Instalar fullcalendar
- [x] Instalar react-hook-form y zod
- [x] Instalar AI SDK Vercel
  - [x] Configurar modelo de gemini
- [x] Instalar y configurar drizzle
- [x] Desplegar en Vercel
- [x] Crear instancia de Base de Datos Postgresql en Vercel
- [x] Crear esquema de base de datos para almacenar eventos de calendario
- [x] Crear migraciones para la base de datos

## Requerimientos funcionales

- [x] Crear calendario del usuario al registrarse usando Clerk Webhook (<https://clerk.com/docs/integrations/webhooks/overview>)
  - [x] Crear function para crear calendario a usuario autenticado.
- [x] Crear un UI para mostrar y gestionar eventos de calendario
- [x] Obtener el calendario del usuario autenticado y los eventos del calendario

- [ ] Implementar operaciones para manejar CRUD de eventos de calendario
  - [x] Implementar servicios de eventos de calendario
    - [x] Crear servicio para crear eventos de calendario
    - [x] Crear servicio para obtener eventos de calendario
    - [] Crear servicio para actualizar eventos de calendario
    - [] Crear servicio para eliminar eventos de calendario
  - [x] Crear formulario para agregar eventos
    - [x] Crear UI para la creacion de un evento
    - [x] Integrar Novel.sh para la creación de eventos(WSGI)
    - [x] Integrar Novel.sh con Vercel AI SDK
    - [x] Generar sugerencia de título con Verce AI SDK
    - [x] Generar sugerencia de tags con Verce AI SDK
    - [] Arreglar el bug cuando se copia el Markdown que no se formatea correctamente
  - [] Crear formulario para editar eventos
  - [] Visualizar eventos
  - [] Asignar redes sociales a las que publicar
  - [] Eliminar eventos
  - [] Marcar en el aside el link activo
  - [] Crear toolbar para el calendario. Incluir el uso de la api de novel.sh

  - [] UI Calendario
    - [x] Adicionar evento al hacer click en el calendario
    - [] Cuando se pare sobre el calendario, mostrar un elemento para agregar un evento(stale)
- [] Integración con redes sociales
  - [] Integrar LinkedIn
    - [x] Crear un endpoint para el callback de Autenticacion de LinkedIn
      - [x] Almacenar el token de acceso en la base de datos
      - [x] Crear entidad usuario integración
      - [x] Actualizar diseño del card de Linkedin
      - [x] Mostrar integraciones disponibles para el usuario
    - [x] Crear accion para conectar cuenta de LinkedIn
- [] Programación de publicaciones
  - [] Convertir tictac json en un Texto compatible con linkedin, facebook etc.
  - [] Crear tarea programada para publicacion
  - [] Crear accion para publicar en redes sociales
    - [] Crear accion para publicar en LinkedIn
  - [] Adicionar a la tarea la accion de seleccionar la red social  
- [] Integrar llama 3.1 como modelo LLM
- [] Integrar OpenAI como modelo LLM

## Know Issues

- [x] Crear calendario si al crear la tarea el usuario no tiene un calendario
- [] Revisar carga inicial de la app
- [] Clerk Aside UserButton Hydration Error
- [] La pantalla tiene un blur cuando se carga el command dentro del AI Suggestion WSGI
