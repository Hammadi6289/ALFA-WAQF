import { connectTestDB, clearTestDB, closeTestDB } from "./db.js";

// Global setup before all tests
beforeAll(async () => {
  console.log("Setting up test database...");
  await connectTestDB();
});

// Clean up database after each test
afterEach(async () => {
  console.log("Cleaning test database...");
  await clearTestDB();
});

// Close connections after all tests
afterAll(async () => {
  console.log("Closing test database...");
  await closeTestDB();
});
