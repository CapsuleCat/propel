import {
    Bootstrap,
    Inject,
    Repository,
    CRUDRepository,
} from "@capsule-cat/propel-server";
import { UserData } from "./types";
import { User } from "./User";

@Repository()
export class UserRepository extends CRUDRepository<UserData, number> {
    @Inject("User")
    model!: User;

    @Bootstrap()
    async bootstrap() {
        if (process.env.NODE_ENV !== "production") {
            await this.model.sync({ force: true });
        }
    }
}
