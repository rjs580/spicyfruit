module.exports = Object.freeze({
  PORT: 3000,
  SALT_ROUNDS: 12,
  DB: {
    CONNECTION_LIMIT: 10,
    HOST: "spicyfruit_db",
    USER: "spicyfruit",
    PASSWORD: "eRSw9612",
    DATABASE: "spicyfruit"
  },
  DEVELOPMENT_MODE: true,
  ALLOWED_IP_PRIVATEAPI: ["127.0.0.1"],
  ALLOWED_HOSTNAMES_PRIVATEAPI: ["spicyfruit_backend.obs_network"],
  ALLOWED_DEVELOPERS_INMODE: ["orangebananaspy@gmail.com", "test@test.ca"],
  CLIENT_ID: "158868165679-jnpu66p9i0obn77m20p4o4f06o99hgou.apps.googleusercontent.com"
});
