import type { Model } from "sequelize";
import type { MakeNullishOptional } from "../types";
import { BaseRepository } from "./BaseRepository";

export abstract class SingletonRepository<
    T extends object
> extends BaseRepository<T> {
    public async get(): Promise<Model<T, T> | null> {
        return this.getModel().findOne();
    }

    public async set(data: MakeNullishOptional<T>): Promise<Model<T, T>> {
        const [result] = await this.getModel().upsert(data);

        return result;
    }
}
