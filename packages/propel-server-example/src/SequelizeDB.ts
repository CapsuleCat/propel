import path from "path";
import { Sequelize } from "sequelize";
import { Service } from "@capsule-cat/propel-server";

@Service("SequelizeDB")
export class SequelizeDB {
    private sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize("test_db", "", "", {
            host: "localhost",
            dialect: "sqlite",
            storage: path.join(process.cwd(), ".db", "test.sqlite"),
            logging: false,
        });
    }

    getSequelize(): Sequelize {
        return this.sequelize;
    }
}
