import { BaseRepository } from "./BaseRepository";

describe("BaseRepository", () => {
    class BadImplBaseRepository extends BaseRepository<object> {
        public getModelForTest() {
            return this.getModel();
        }
    }

    const obj = {};

    const entity = {
        getModel: () => obj,
    };

    class FullImplBaseRepository extends BaseRepository<object> {
        testKey = entity;

        constructor() {
            super("testKey");
        }
        public getModelForTest() {
            return this.getModel();
        }
    }

    it("should throw an error if the model is not defined", () => {
        const repository = new BadImplBaseRepository();
        expect(() => repository.getModelForTest()).toThrow(
            `Model not defined when trying to access model`
        );
    });

    it("should throw an error if the model does not have a getModel function", () => {
        const repository = new FullImplBaseRepository();
        expect(repository.getModelForTest()).toBe(obj);
    });
});
