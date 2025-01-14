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

    describe("Метод use", () => {
        it("Должен добавлять новый маршрут", () => {
            router.use("/home", MockComponent);
            expect(router.routes.length).to.equal(1);
        });
    });

    describe("Метод start", () => {
        it("Должен вызывать рендер маршрута для текущего пути", () => {
            const renderSpy = sinon.spy(MockComponent.prototype, "render");

            router.use("/home", MockComponent);

            // Мокаем window.location.pathname через глобальный объект
            const mockLocation = { pathname: "/home" };

            // Мокаем глобальный window.location.pathname
            global.location = mockLocation as unknown as Location;

            // Запускаем роутер
            router.start();

            // Проверяем, что render был вызван один раз
            expect(renderSpy.calledOnce).to.be.true;

            // Восстанавливаем оригинальный объект после теста
            sinon.restore();
        });
    });

    // describe("Метод go", () => {
    //     it("Должен вызывать pushState с правильными аргументами", () => {
    //         const pushStateSpy = sinon.spy(window.history, "pushState");
    //         const pathname = "/home"; // Проверяем строку

    //         // Вызываем go
    //         router.go(pathname);

    //         // Проверяем, что pushState был вызван с правильными аргументами
    //         expect(pushStateSpy.calledOnceWithExactly({}, "", pathname)).to.be.true;

    //         sinon.restore();
    //     });

    //     it("Должен выбрасывать ошибку, если pathname не строка", () => {
    //         const pathname = {};  // Ошибка, это не строка
    //         expect(() => router.go(pathname)).to.throw('Expected pathname to be a string, but got object');
    //     });

    //     it("Должен вызывать _onRoute с правильным pathname", () => {
    //         const onRouteSpy = sinon.spy(router, "_onRoute");
    //         const pathname = "/home";

    //         // Вызываем go
    //         router.go(pathname);

    //         // Проверяем, что _onRoute был вызван с нужным pathname
    //         expect(onRouteSpy.calledOnceWith(pathname)).to.be.true;

    //         sinon.restore();
    //     });

    //     it("Не должен вызывать _onRoute, если путь не изменился", () => {
    //         const onRouteSpy = sinon.spy(router, "_onRoute");
    //         const pathname = "/home";

    //         // Устанавливаем текущий путь
    //         router.go(pathname);

    //         // Пытаемся вызвать go с тем же pathname
    //         router.go(pathname);

    //         // Проверяем, что _onRoute не был вызван второй раз
    //         expect(onRouteSpy.calledOnce).to.be.true;

    //         sinon.restore();
    //     });

    //     it("Должен изменить URL, не вызывая перезагрузку страницы", () => {
    //         // Создаем шпион на pushState
    //         const pushStateSpy = sinon.spy(window.history, "pushState");
            
    //         // Создаем шпион на window.location.reload
    //         const reloadSpy = sinon.spy(window.location, "reload");

    //         const pathname = "/home";

    //         // Проверяем, что URL изменяется без перезагрузки
    //         router.go(pathname);

    //         // Проверяем, что pushState был вызван с правильными аргументами
    //         expect(pushStateSpy.calledOnceWithExactly({}, "", pathname)).to.be.true;

    //         // Проверяем, что перезагрузка не была вызвана
    //         expect(reloadSpy.called).to.be.false;

    //         sinon.restore(); // Восстанавливаем исходное состояние после теста
    //     });

    //     // Дополнительный тест с асинхронной логикой
    //     it("Должен корректно обрабатывать асинхронные операции в _onRoute", async () => {
    //         // Допустим, что _onRoute асинхронно делает что-то (например, загружает данные)
    //         const onRouteSpy = sinon.spy(async (pathname) => {
    //             // Здесь асинхронная логика, например, загрузка данных
    //             return Promise.resolve(pathname);
    //         });

    //         router["_onRoute"] = onRouteSpy; // Переопределяем _onRoute для теста

    //         const pathname = "/home";

    //         // Вызываем go
    //         await router.go(pathname);

    //         // Проверяем, что асинхронная логика была вызвана с нужным pathname
    //         expect(onRouteSpy.calledOnceWith(pathname)).to.be.true;

    //         sinon.restore();
    //     });
    // });

    describe("Метод back", () => {
        it("Должен вызывать history.back", () => {
            const backSpy = sinon.spy(window.history, "back");
            router.back();
            expect(backSpy.calledOnce).to.be.true;
        });
    });

    describe("Метод forward", () => {
        it("Должен вызывать history.forward", () => {
            const forwardSpy = sinon.spy(window.history, "forward");
            router.forward();
            expect(forwardSpy.calledOnce).to.be.true;
        });
    });
});
