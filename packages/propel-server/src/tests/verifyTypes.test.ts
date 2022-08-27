import { Entity, Repository, Service } from "..";

@Entity("myEntity")
class TestEntity {
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

    test("Repository", () => {
        const testRepository = new TestRepository();

        expect(typeof testRepository).toBe("object");
    });

    test("Service", () => {
        const testService = new TestService();

        expect(typeof testService).toBe("object");
    });
});
