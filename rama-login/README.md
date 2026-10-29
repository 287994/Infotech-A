# Login

Página de inicio de sesión con validación en el servidor. Sin base de datos ni proxy.

## Uso

    npm install
    cp .env.example .env
    npm run build
    npm start

Abrir `http://localhost:3000/`. Credencial de prueba: `prueba` / `prueba1234` (en `data/users.json`, con hash bcrypt).

## Estructura

- `public/`: HTML, CSS y `login.js` (solo envía el formulario; no decide nada). Todo lo de esta carpeta es público
- `private/`: página de destino de prueba; solo se entrega con sesión válida
- `src/server.ts`: `POST /api/login`, `POST /api/logout`, `GET /api/auth/check` y `/app/` (solo con sesión)
- `src/users.ts`: `findUser()`, único punto que lee los usuarios. Para pasar a base de datos solo se cambia esta función
- `data/users.json`: usuarios de prueba

`/api/auth/check` es lo que consultará el proxy para proteger rutas.
