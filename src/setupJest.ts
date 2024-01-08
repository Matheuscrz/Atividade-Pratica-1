import DB from "./config/Database";

beforeAll(async () => {
  const db = DB.getInstance();
  await db.connect();
});

afterAll(async () => {
  const db = DB.getInstance();
  await db.close();
});
