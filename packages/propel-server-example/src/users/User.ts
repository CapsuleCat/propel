import { DataTypes } from "sequelize";
import { Entity, Inject, BaseEntity } from "@capsule-cat/propel-server";
import { SequelizeDB } from "../SequelizeDB";
import { UserModel } from "./types";

@Entity("User")
export class User extends BaseEntity<UserModel> {
    @Inject("SequelizeDB")
    db!: SequelizeDB;

    constructor() {
        super();
        this.model = this.db.getSequelize().define(
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
