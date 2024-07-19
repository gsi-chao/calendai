
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

- [] Crear calendario del usuario al registrarse usando Clerk Webhook (<https://clerk.com/docs/integrations/webhooks/overview>)
  - [] Crear function para crear calendario a usuario autenticado.
- [ ] Crear un UI para mostrar y gestionar eventos de calendario
- [ ] Implementar operaciones para manejar CRUD de eventos de calendario

<!-- - Create a database schema for storing calendar events
- Build a UI for displaying and managing calendar events
- Implement CRUD operations for calendar events
- Integrate with a natural language processing API for event parsing
- Add functionality to invite and manage event attendees
- Implement notifications for upcoming events
- Write unit tests for the calendar manager functionality
- Document the code and provide usage instructions -->