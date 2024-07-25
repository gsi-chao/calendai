
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
    - [] Integrar Novel.sh con Vercel AI SDK
    - [] Generar sugerencia de título con Verce AI SDK
    - [] Generar sugerencia de tags con Verce AI SDK
    - [] Arreglar el bug cuando se copia el Markdown que no se formatea correctamente
  - [] Crear formulario para editar eventos
  - [] Eliminar eventos

  - [] UI Calendario
    - [] Adicionar evento al hacer click en el calendario
    - [] Cuando se pare sobre el calendario, mostrar un elemento para agregar un evento(stale)
