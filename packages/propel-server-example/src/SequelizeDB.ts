import path from "path";
import { Sequelize } from "sequelize";
import { Database, Service } from "@capsule-cat/propel-server";

@Service("SequelizeDB")
export class SequelizeDB extends Database<Sequelize> {
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
