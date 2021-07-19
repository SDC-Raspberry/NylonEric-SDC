module.exports = {
  HOST: "localhost",
  USER: "user",
  PASSWORD: null,
  DB: "test-atelier-db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};