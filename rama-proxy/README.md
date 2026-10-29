# Proxy

Caddy en Docker. Aplica una whitelist de redes y deja preparada la validación de sesión. No está conectado al login ni a ningún otro servicio.

## Uso

    docker compose up -d
    curl http://localhost/health

## Archivos (`caddy/`)

- `Caddyfile`: rutas. `/health` (libre), `/admin*` (solo whitelist), `/app*` (zona de empleados, sin destino)
- `whitelist.caddy`: redes autorizadas para `/admin*`
- `auth.caddy`: validación de sesión con el login (`forward_auth`), aún sin activar

## Whitelist

Controla desde qué red se puede entrar a las zonas de administración. Los empleados no se filtran por IP; se validan con usuario y contraseña en el login (que además mantiene la lista de usuarios autorizados).

Si se pone Cloudflare Tunnel delante, la IP vista por Caddy será la del túnel. Habrá que configurar `trusted_proxies` con la dirección del túnel únicamente, y cambiar `remote_ip` por `client_ip`.

## Conexión posterior

1. Poner proxy y login en la misma red de Docker (`docker-compose.yml` de la rama dev).
2. En `Caddyfile`, dentro de `handle /app*`, descomentar `import auth` y reemplazar el `respond` por `reverse_proxy` hacia el sitio.
