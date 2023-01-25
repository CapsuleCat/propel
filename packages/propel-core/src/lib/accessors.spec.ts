import { createAccessorKey } from "./accessors";

describe("accessors", () => {
    it("should convert the property key to lowercase", () => {
        const result = createAccessorKey("PropertyKey");
        expect(result).toBe("propertykey");
    });

    it("should use the name option if provided", () => {
        const result = createAccessorKey("propertyKey", { name: "CustomName" });
        expect(result).toBe("customname");
    });

    it("should use a symbol as property key", () => {
        const symbolKey = Symbol("propertyKey");
        const result = createAccessorKey(symbolKey);
        expect(result).toBe("symbol_propertykey_");
    });
});
