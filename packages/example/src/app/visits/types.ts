import type { Model, ModelStatic } from "sequelize";

export interface VisitData {
    visits: number;
}

export type VisitsModel = ModelStatic<Model<VisitData, VisitData>>;
