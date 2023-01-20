// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
require("dotenv-safe").config({
    allowEmptyValues: true,
    // specify the path to the .env file
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
