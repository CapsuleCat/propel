import { createAccessorKey } from "./accessors";

describe("accessors", () => {
    it("should convert the property key to lowercase", () => {
        const result = createAccessorKey("PropertyKey");
        expect(result).toBe("__propertykey__");
    });

    it("should use the name option if provided", () => {
        const result = createAccessorKey("propertyKey", { name: "CustomName" });
        expect(result).toBe("__customname__");
    });

    it("should use a symbol as property key", () => {
        const symbolKey = Symbol("propertyKey");
        const result = createAccessorKey(symbolKey);
        expect(result).toBe("__symbol_propertykey___");
    });
});
