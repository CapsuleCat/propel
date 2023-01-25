import path from "node:path";
import { Sequelize } from "sequelize";
import { Service } from "@capsule-cat/propel-server";
import { Database } from "@capsule-cat/propel-sequelize";

@Service()
export class DB extends Database<Sequelize> {
    constructor() {
        super();
        this.db = new Sequelize("test_db", "", "", {
            host: "localhost",
            dialect: "sqlite",
            storage: path.join(process.cwd(), ".db", "test.sqlite"),
            logging: false,
        });
    }
}
