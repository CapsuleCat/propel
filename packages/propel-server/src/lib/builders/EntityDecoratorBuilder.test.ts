import { createAppBottle, getDependency } from "@capsule-cat/propel-core";
import { EntityDecoratorBuilder } from "./EntityDecoratorBuilder";

describe("EntityDecoratorBuilder", () => {
    let builder: EntityDecoratorBuilder;

    beforeEach(() => {
        builder = new EntityDecoratorBuilder();
    });

    it("should build a decorator", () => {
        const decorator = builder.build();

        expect(decorator).toBeInstanceOf(Function);
    });

    it("registers the class as a service in the bottle", () => {
        createAppBottle();

        // eslint-disable-next-line @typescript-eslint/no-extraneous-class -- test class
        const targetClass = class TestClass {};

        const decorator = builder.build();

        decorator(targetClass);

        const dep = getDependency("testclass");

        expect(dep).toBeInstanceOf(targetClass);
    });
});
