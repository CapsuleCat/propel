import { Autowired, Bootstrap, Repository } from "@capsule-cat/propel-server";
import type { UserData } from "./types";
import type { User } from "./User";
import { CRUDRepository } from "@capsule-cat/propel-sequelize";

@Repository()
export class UserRepository extends CRUDRepository<UserData, number> {
    @Autowired()
    user!: User;

    constructor() {
        super("user");
    }

    @Bootstrap({
        when: () => process.env.NODE_ENV !== "production",
    })
    async bootstrap() {
        await this.user.sync({ force: true });
    }
}
