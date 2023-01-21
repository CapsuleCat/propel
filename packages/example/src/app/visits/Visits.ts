import { DataTypes } from "sequelize";
import { Entity, BaseEntity, Autowired } from "@capsule-cat/propel-server";
import type { VisitsModel } from "./types";
import type { DB } from "../db/SequelizeDB";

@Entity()
export class Visits extends BaseEntity<VisitsModel> {
    @Autowired()
    db!: DB;

    constructor() {
        super();

        this.model = this.db.define(
            "Visits",
            {
                visits: DataTypes.INTEGER,
            },
            {
                freezeTableName: true,
                modelName: "Visits",
            }
        );
    }
}
