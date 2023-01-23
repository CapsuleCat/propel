import type { Identifier, Model, WhereOptions } from "sequelize";
import type { MakeNullishOptional } from "../types";
import { BaseRepository } from "./BaseRepository";

export abstract class CRUDRepository<
    T extends object,
    PrimaryKeyType extends Identifier | undefined
> extends BaseRepository<T> {
    public async getAll(): Promise<Model<T, T>[]> {
        return this.getModel().findAll();
    }

    public async get(id: PrimaryKeyType): Promise<Model<T, T> | null> {
        return this.getModel().findByPk(id);
    }

    public async create(
        data: MakeNullishOptional<T>
    ): Promise<Model<T, T> | null> {
        return this.getModel().create(data);
    }

    public async update(
        id: PrimaryKeyType,
        data: MakeNullishOptional<T>
    ): Promise<number> {
        // Get primaryKey from model
        const primaryKey = this.getModel().primaryKeyAttribute;

        const [numUpdated] = await this.getModel().update(data, {
            where: { [primaryKey]: id } as WhereOptions<T>,
        });

        return numUpdated;
    }

    public async delete(id: PrimaryKeyType): Promise<number> {
        // Get primaryKey from model
        const primaryKey = this.getModel().primaryKeyAttribute;

        return await this.getModel().destroy({
            where: { [primaryKey]: id } as WhereOptions<T>,
        });
    }
}
