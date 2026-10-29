import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface User {
  username: string;
  passwordHash: string;
  role: string;
  active: boolean;
}

const USERS_FILE = join(__dirname, "..", "data", "users.json");

export async function findUser(username: string): Promise<User | undefined> {
  const users: User[] = JSON.parse(readFileSync(USERS_FILE, "utf8"));
  return users.find((u) => u.username === username && u.active);
}
