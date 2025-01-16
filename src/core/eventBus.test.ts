import EventBus from "./eventBus";
import { expect } from "chai";
import sinon from "sinon";

describe("EventBus", () => {
    const EVENT_1 = "eventTest1";
    const EVENT_2 = "eventTest2";

    let eventBus: EventBus<string>;

    beforeEach(() => {
        eventBus = new EventBus<string>();
    });

    it("Должен отрабатываться подписанный обработчик", () => {
        const handler = sinon.stub();
        const payloads = ["payload1", "payload2"];
        
        eventBus.on(EVENT_1, handler);

        eventBus.emit(EVENT_1, ...payloads);
        
        expect(handler.calledOnceWith(...payloads)).to.be.true;
    });

    it("Подписанный обработчик должен отрабатываться только для своего события", () => {
        const handlerEvent1 = sinon.stub();
        const handlerEvent2 = sinon.stub();
        
        eventBus.on(EVENT_1, handlerEvent1);
        eventBus.on(EVENT_2, handlerEvent2);

        eventBus.emit(EVENT_1);
        
        expect(handlerEvent1.calledOnce).to.be.true;
        expect(handlerEvent2.calledOnce).to.be.false;

        handlerEvent1.reset();
        eventBus.emit(EVENT_2);

        expect(handlerEvent1.calledOnce).to.be.false;
        expect(handlerEvent2.calledOnce).to.be.true;
    });

    it("Не должен вызываться отписанный обработчик", () => {
        const handler = sinon.stub();
        
        eventBus.on(EVENT_1, handler);
        eventBus.off(EVENT_1, handler);

        eventBus.emit(EVENT_1);
        
        expect(handler.calledOnce).to.be.false;
    });

    it("Должна выводиться ошибка, если такого события не существует", () => {
        const handler = sinon.stub();
        
        expect(() => eventBus.off(EVENT_1, handler)).to.throw(`Нет событ: ${EVENT_1}`);
    });
});
