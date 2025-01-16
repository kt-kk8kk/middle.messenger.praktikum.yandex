import { StoreEvents } from "../core/Store";
import Block from "../core/block";
import isEqual from "./isEqual";

interface State {
    isLoading: boolean;
    loginError: string | null;
}

type MapStateToProps = (state: State) => Record<string, unknown>;

type ComponentConstructor<Props = object> = new (props: Props) => Block<Props>;

export function connect(mapStateToProps: MapStateToProps) {
    return function <Props>(Component: ComponentConstructor<Props>) {
        return class extends Component {
            private onChangeStoreCallback: () => void;
            constructor(props: Props) {
                const store = window.store;
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                this.onChangeStoreCallback = () => {

                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                };

                // подписываемся на событие
                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            componentWillUnmount() {
                super.componentWillUnmount();
                window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        };
    };
}
