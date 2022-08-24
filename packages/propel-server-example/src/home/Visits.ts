import { DataTypes } from "sequelize";
import { Entity, Inject, BaseEntity } from "@capsule-cat/propel-server";
import { SequelizeDB } from "../SequelizeDB";
import { VisitsModel } from "./types";

@Entity("Visits")
export class Visits extends BaseEntity<VisitsModel> {
    @Inject("SequelizeDB")
    db!: SequelizeDB;

    constructor() {
        super();

        this.model = this.db.getSequelize().define(
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
