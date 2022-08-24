import { Model, ModelStatic } from "sequelize";

export abstract class BaseRepository<T extends {}> {
    private modelKey = "model";

    constructor(modelKey?: string) {
        if (modelKey) {
            this.modelKey = modelKey;
        }
    }

    protected getModel(): ModelStatic<Model<T, T>> {
        const safeModelKey = this.modelKey as keyof this;
        const unsafeEntityType = this[safeModelKey];

        if (!unsafeEntityType) {
            throw new Error(
                `Model not defined when trying to access ${this.modelKey}`
            );
        }

        const safeEntityType = unsafeEntityType as unknown as {
            getModel(): ModelStatic<Model<T, T>>;
        };

        if (!safeEntityType.getModel) {
            throw new Error(
                `Model was defined, but not an Entity. Define a getModel function in your Entity at ${this.modelKey}`
            );
        }

        return safeEntityType.getModel() as ModelStatic<Model<T, T>>;
    }
}
