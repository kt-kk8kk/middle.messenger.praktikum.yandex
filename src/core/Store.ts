import EventBus from "./eventBus";
interface StoreState {
    [key: string]: any;
}

export enum StoreEvents {
    Updated = "Updated",
}

export class Store extends EventBus<StoreEvents> {
    private state!: StoreState;

    private static __instance: Store | null = null;

    constructor(defaultState: StoreState) {
        if (Store.__instance) {
            return Store.__instance;
        }
        super();

        this.state = defaultState;
        this.set(defaultState);

        Store.__instance = this;
    }

    public getState(): StoreState {
        return this.state;
    }

    public set(nextState: StoreState): void {
        const prevState = { ...this.state };

        this.state = { ...this.state, ...nextState };

        this.emit(StoreEvents.Updated, prevState, nextState);
    }
}
