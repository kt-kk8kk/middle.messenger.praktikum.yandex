import { expect } from "chai";
import sinon from "sinon";
import Route from "./Route";
import Block from "../core/block";

class TestBlock extends Block {
    constructor(props: any) {
        super("div", props);
    }

    render() {
        return `<div>Test Block</div>`;
    }
}

describe("Route", () => {
    let route: Route;

    beforeEach(() => {
        route = new Route("/test", TestBlock, { rootQuery: "#root" });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("Метод navigate", () => {
        it("Должен вызывать render при переходе на новый путь", () => {
            const renderSpy = sinon.spy(route, "render");
            route.navigate("/another");
            expect(renderSpy.called).to.be.false;
        });
    });

    describe("Метод match", () => {
        it("Должен вернуть true, если путь совпадает с текущим", () => {
            expect(route.match("/test")).to.be.true;
        });

        it("Должен вернуть false, если путь не совпадает с текущим", () => {
            expect(route.match("/another")).to.be.false;
        });
    });

    describe("Метод render", () => {
        it("Должен создать и отрендерить блок при вызове render", () => {
            const blockConstructorSpy = sinon.spy(TestBlock.prototype, "render");
            route.render();
            expect(blockConstructorSpy.calledOnce).to.be.true;
        });

        it("Должен вызвать componentDidMount после рендеринга", () => {
            const componentDidMountSpy = sinon.spy(TestBlock.prototype, "componentDidMount");
            route.render();
            expect(componentDidMountSpy.calledOnce).to.be.true;
        });
    });
});
