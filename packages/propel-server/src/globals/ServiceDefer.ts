export class ServiceDefer {
    private defers: Array<{ cb: () => Promise<void>; priority: number }> = [];

    push(defer: () => Promise<void>, priority: number) {
        this.defers.push({
            cb: defer,
            priority,
        });
    }

    async execute() {
        // Run defers in parallel
        const sorted = this.defers.sort((a, b) => {
            return b.priority - a.priority;
        });

        for (const defer of sorted) {
            await defer.cb();
        }
    }
}

export function getServiceDefer(): ServiceDefer {
    return new ServiceDefer();
}
