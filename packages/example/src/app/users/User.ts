import { DataTypes } from "sequelize";
import { Autowired, BaseEntity, Entity } from "@capsule-cat/propel-server";
import type { UserModel } from "./types";
import type { DB } from "../db/SequelizeDB";

@Entity()
export class User extends BaseEntity<UserModel> {
    @Autowired()
    db!: DB;

    constructor() {
        super();

        this.model = this.db.define(
            "User",
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: DataTypes.STRING,
            },
            {
                freezeTableName: true,
                modelName: "User",
            }
        );
    }
}
