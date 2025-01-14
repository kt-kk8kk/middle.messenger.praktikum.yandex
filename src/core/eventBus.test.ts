import EventBus from "./eventBus";
import { expect } from "chai";
import sinon from "sinon";

describe("EventBus", () => {
    let eventBus: EventBus<string>;

    beforeEach(() => {
        eventBus = new EventBus<string>();
    });

    describe("Метод on", () => {
        it("Должен добавлять слушателей событий с помощью 'on'", () => {
            const callback = sinon.spy();
            
            eventBus.on("testEvent", callback);
            
            expect(eventBus['listeners']['testEvent']).to.have.lengthOf(1);
        });
    });

    describe("Метод emit", () => {
        it("Должен вызывать слушателя при эмитировании события", () => {
            const callback = sinon.spy();
            
            eventBus.on("testEvent", callback);
            
            eventBus.emit("testEvent");

            expect(callback.calledOnce).to.be.true;
        });

        it("Должен вызывать всех слушателей при эмитировании события с несколькими слушателями", () => {
            const callback1 = sinon.spy();
            const callback2 = sinon.spy();

            eventBus.on("testEvent", callback1);
            eventBus.on("testEvent", callback2);

            eventBus.emit("testEvent");

            expect(callback1.calledOnce).to.be.true;
            expect(callback2.calledOnce).to.be.true;
        });

        it("Должен не генерировать ошибку при эмитировании события без слушателей", () => {
            const emitSpy = sinon.spy(eventBus, "emit");

            eventBus.emit("nonExistentEvent");

            expect(emitSpy.calledOnce).to.be.true;
        });

        it("Должен передавать параметры слушателям при эмитировании события", () => {
            const callback = sinon.spy();
            
            eventBus.on("testEventWithArgs", callback);
            
            const param1 = "param1";
            const param2 = 42;
            
            eventBus.emit("testEventWithArgs", param1, param2);
            
            expect(callback.calledOnceWith(param1, param2)).to.be.true;
        });
    });

    describe("Метод off", () => {
        it("Должен удалять слушателей с помощью 'off'", () => {
            const callback = sinon.spy();
            
            eventBus.on("testEvent", callback);
            eventBus.off("testEvent", callback);
            
            expect(eventBus['listeners']['testEvent']).to.have.lengthOf(0);
        });

        it("Должен генерировать ошибку при удалении несуществующего слушателя", () => {
            const nonExistentCallback = sinon.spy();
            
            expect(() => {
                eventBus.off("testEvent", nonExistentCallback);
            }).to.throw(Error, "Нет события: testEvent");
        });
    });
});
