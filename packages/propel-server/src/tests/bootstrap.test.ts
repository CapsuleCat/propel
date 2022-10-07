import { Autowired } from "../decorators/Autowired";
import { Bootstrap } from "../decorators/Bootstrap";
import { Service } from "../decorators/Service";
import { testBootstrap, testInit } from "./utils";

describe("bootstrap", () => {
    const handler = jest.fn();

    beforeEach(async () => {
        @Service()
        class DepService {
            getValue() {
                return 1;
            }
        }

        @Service()
        class TestService {
            @Autowired()
            depService!: DepService;

            @Bootstrap()
            myBootstrap() {
                handler(this.depService.getValue());
            }
        }

        testInit();
        await testBootstrap();
    });

    it("bootstrap function are bound to their class", () => {
        expect(handler).toHaveBeenCalledWith(1);
    });
});
