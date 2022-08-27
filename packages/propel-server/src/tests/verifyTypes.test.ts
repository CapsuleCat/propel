import { Entity, Repository, Service, getAppBottle } from "..";

@Entity("myEntity")
class TestEntity {
    // TODO empty on purpose
}

@Entity("myOptionalEntity", {
    when: () => false,
})
class OptionalEntity {
    // TODO empty on purpose
}

@Service("myService")
class TestService {
    // TODO empty on purpose
}

@Repository("testRepository")
class TestRepository {
    // TODO empty on purpose
}

describe("Verify that types don't change so much that they would break old code", () => {
    test("Entity", () => {
        const testEntity = new TestEntity();

        expect(typeof testEntity).toBe("object");
    });

    test("myOptionalEntity", () => {
        const optionalEntity = getAppBottle().container.myOptionalEntity;

        expect(typeof optionalEntity).toBe("undefined");
    });

    test("Repository", () => {
        const testRepository = new TestRepository();

        expect(typeof testRepository).toBe("object");
    });

    test("Service", () => {
        const testService = new TestService();

        expect(typeof testService).toBe("object");
    });
});
