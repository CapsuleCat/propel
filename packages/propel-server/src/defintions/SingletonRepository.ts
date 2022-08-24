import { Model } from "sequelize";
import { MakeNullishOptional } from "../types";
import { BaseRepository } from "./BaseRepository";

export abstract class SingletonRepository<
    T extends {}
> extends BaseRepository<T> {
    constructor(modelKey?: string) {
        super(modelKey);
    }

    public async get(): Promise<Model<T, T> | null> {
        return this.getModel().findOne();
    }

    public async set(data: MakeNullishOptional<T>): Promise<Model<T, T>> {
        const [result] = await this.getModel().upsert(data);

        return result;
    }
}
