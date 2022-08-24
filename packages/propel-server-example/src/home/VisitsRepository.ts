import {
    Bootstrap,
    Inject,
    Repository,
    SingletonRepository,
} from "@capsule-cat/propel-server";
import { VisitData } from "./types";
import { Visits } from "./Visits";

@Repository()
export class VisitsRepository extends SingletonRepository<VisitData> {
    @Inject("Visits")
    model!: Visits;

    @Bootstrap()
    async bootstrap() {
        if (process.env.NODE_ENV !== "production") {
            await this.model.getModel().sync({ force: true });
        }
    }
}
