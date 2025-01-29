import Router from "./Router";
import Block from "../core/block"; // Путь к Block
import { expect } from "chai";
import sinon from "sinon";

describe("Router", () => {
    let router: Router;
    let MockComponent: { new (props: any): Block };

    beforeEach(() => {
        router = new Router("#app");

        MockComponent = class extends Block {
            render() {
                return "<div>Home</div>";
            }
        };
    });

    it("Должен добавлять новый маршрут", () => {
        router.use("/home", MockComponent);
        expect(router.routes.length).to.equal(1);
    });

    it("Должен вызывать history.back", () => {
        const backSpy = sinon.spy(window.history, "back");
        router.back();
        expect(backSpy.calledOnce).to.be.true;
    });
    
    it("Должен вызывать history.forward", () => {
        const forwardSpy = sinon.spy(window.history, "forward");
        router.forward();
        expect(forwardSpy.calledOnce).to.be.true;
    });
});
