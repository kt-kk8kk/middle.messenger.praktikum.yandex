import Block from "../core/block";

export function withRouter<Props>(WrappedBlock: new (props: Props) => Block<Props>) {
    return class extends WrappedBlock {
        constructor(props: Props) {
            super({ ...props, router: window.router });
        }
    }
}
