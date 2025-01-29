import Block from "./block";
import sinon from "sinon";
import { expect } from "chai";

describe("Block", () => {
    let PageComponent: any;

    before(() => {
        class Page extends Block {
            constructor(props: any) {
                super("div", props);
            }

            render() {
                return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`;
            }
        }

        PageComponent = Page;
    });

    it("Должен создать компонент с состоянием из конструктора", () => {
        const text = "Hello";
        
        const pageComponent = new PageComponent({ text });

        const spanText = pageComponent.element?.querySelector("#test-text")?.innerHTML;

        expect(spanText).to.be.eq(text);
    });

    it("Компонент должен иметь реактивное поведение", () => {
        const newValue = "New value";
        
        const pageComponent = new PageComponent({ text: "Hello" });

        pageComponent.setProps({ text: newValue });
        const spanText = pageComponent.element?.querySelector("#test-text")?.innerHTML;

        expect(spanText).to.be.eq(newValue);
    });

    it("Компонент должен установить события на элемент", () => {
        const clickHandlerStub = sinon.stub();
        const pageComponent = new PageComponent({
            events: {
                click: clickHandlerStub
            }
        });

        const event = new MouseEvent("click");
        pageComponent.element?.dispatchEvent(event);

        expect(clickHandlerStub.calledOnce).to.be.true;
    });

    describe("Метод getContent", () => {
        it("Должен вернуть элемент компонента", () => {
            const text = "Hello";
            const pageComponent = new PageComponent({ text });

            const content = pageComponent.getContent();

            expect(content).to.equal(pageComponent.element);
        });
    });

    describe("Методы show и hide", () => {
        it("Должен установить стиль display в 'block' при вызове show", () => {
            const pageComponent = new PageComponent({ text: "Hello" });
            pageComponent.show();
            expect(pageComponent.getContent().style.display).to.equal("block");
        });

        it("Должен установить стиль display в 'none' при вызове hide", () => {
            const pageComponent = new PageComponent({ text: "Hello" });
            pageComponent.hide();
            expect(pageComponent.getContent().style.display).to.equal("none");
        });
    });

    describe("Метод dispatchComponentDidMount", () => {
        it("Компонент должен вызвать dispatchComponentDidMount метод", () => {
            const clock = sinon.useFakeTimers();
            const pageComponent = new PageComponent();
    
            const spyCDM = sinon.spy(pageComponent, 'componentDidMount');
    
            pageComponent.eventBus().emit(Block.EVENTS.FLOW_CDM);
    
            clock.tick(0);
    
            expect(spyCDM.calledOnce).to.be.true;
        });
    });
});
