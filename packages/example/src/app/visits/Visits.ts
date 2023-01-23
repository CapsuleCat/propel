import { Autowired, BaseEntity, Entity } from "@capsule-cat/propel-server";
import type { DB } from "../db/SequelizeDB";
import { DataTypes } from "sequelize";
import type { VisitsModel } from "./types";

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
