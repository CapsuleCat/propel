import type { Model, ModelStatic } from "sequelize";

export interface UserData {
    id?: number;
    name: string;
}

export type UserModel = ModelStatic<Model<UserData, UserData>>;
