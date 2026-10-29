import { join } from "node:path";
import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import fastifyStatic from "@fastify/static";
import bcrypt from "bcryptjs";
import { findUser } from "./users";

declare module "fastify" {
  interface Session {
    user?: { username: string; role: string };
  }
}

const SESSION_SECRET = process.env.SESSION_SECRET ?? "";
if (SESSION_SECRET.length < 32) {
  console.error("SESSION_SECRET debe tener al menos 32 caracteres");
  process.exit(1);
}

const app = Fastify({ logger: true, trustProxy: true });
const publicDir = join(__dirname, "..", "public");
const privateDir = join(__dirname, "..", "private");

app.register(fastifyCookie);
app.register(fastifySession, {
  secret: SESSION_SECRET,
  cookieName: "portal_session",
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.COOKIE_SECURE === "true",
    maxAge: 8 * 60 * 60 * 1000,
    path: "/",
  },
});

app.post<{ Body: { username?: string; password?: string } }>("/api/login", async (req, reply) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return reply.code(400).send({ ok: false, error: "Faltan usuario o contraseña" });
  }

  const user = await findUser(username);
  const valid = user ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!user || !valid) {
    return reply.code(401).send({ ok: false, error: "Usuario o contraseña incorrectos" });
  }

  req.session.user = { username: user.username, role: user.role };
  return { ok: true };
});

app.post("/api/logout", async (req) => {
  await req.session.destroy();
  return { ok: true };
});

app.get("/api/auth/check", async (req, reply) => {
  if (!req.session.user) return reply.redirect("/", 302);
  reply.header("X-Auth-User", req.session.user.username);
  reply.header("X-Auth-Role", req.session.user.role);
  return reply.code(200).send();
});

app.get("/app/", async (req, reply) => {
  if (!req.session.user) return reply.redirect("/", 302);
  return reply.sendFile("index.html", privateDir);
});

app.register(fastifyStatic, { root: publicDir, index: "index.html", wildcard: false });

app.listen({ host: "0.0.0.0", port: Number(process.env.PORT ?? 3000) }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
