import Bottle from "bottlejs";
import {
    createAppBottle,
    getDependency,
    register,
    resetAppBottle,
} from "./ioc";

describe("createAppBottle", () => {
    beforeEach(() => {
        resetAppBottle();
    });

    it("should create a new Bottle instance if none is provided", () => {
        const bottle = createAppBottle();
        expect(bottle).toBeInstanceOf(Bottle);
    });

    it("should use the provided Bottle instance", () => {
        const bottle = new Bottle();
        const result = createAppBottle(bottle);
        expect(result).toBe(bottle);
    });
});

describe("getDependency", () => {
    beforeEach(() => {
        resetAppBottle();
    });

    it("should return undefined if the Bottle instance is not created", () => {
        resetAppBottle();
        const result = getDependency("test");
        expect(result).toBeUndefined();
    });

    it("should return the dependency if it is registered", () => {
        const testFn = jest.fn();
        const bottle = createAppBottle();

        bottle.service("test", function () {
            return testFn;
        });
        const result = getDependency("test");

        expect(result).toBe(testFn);
    });
});

describe("register", () => {
    beforeEach(() => {
        resetAppBottle();
    });

    it("should register a service with the Bottle instance", () => {
        const testFn = jest.fn();

        register("test", function () {
            return testFn;
        });

        const result = getDependency("test");

        expect(result).toBe(testFn);
    });
});

describe("resetAppBottle", () => {
    it("should reset the appBottle variable", () => {
        createAppBottle();
        // Assert no error is thrown
        expect(() => {
            resetAppBottle();
        }).not.toThrow();
    });
});
