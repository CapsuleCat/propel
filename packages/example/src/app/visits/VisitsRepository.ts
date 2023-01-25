import { SingletonRepository } from "@capsule-cat/propel-sequelize";
import { Autowired, Bootstrap, Repository } from "@capsule-cat/propel-server";
import type { VisitData } from "./types";
import type { Visits } from "./Visits";

@Repository()
export class VisitsRepository extends SingletonRepository<VisitData> {
    @Autowired()
    visits!: Visits;

    constructor() {
        super("visits");
    }

    @Bootstrap({
        when: () => process.env.NODE_ENV !== "production",
    })
    async bootstrap() {
        await this.visits.sync({ force: true });
    }
}
