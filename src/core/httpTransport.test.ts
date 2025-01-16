import { expect } from "chai";
import sinon from "sinon";
import { HTTPTransport, METHOD } from "./httpTransport";

describe("HTTPTransport", function () {
    let http: HTTPTransport;
    let requestStub: sinon.SinonStub;

    beforeEach(() => {
        http = new HTTPTransport("/test");
        requestStub = sinon.stub(http, "request").resolves({ data: "test" });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("Метод get", () => {
        it("Должен вызвать request с методом GET", async () => {
            const url = "/some-url";
            const options = { headers: { "X-Test": "test" } };
            await http.get(url, options);

            expect(requestStub.calledOnceWithExactly(`${http["apiUrl"]}${url}`, {
                ...options,
                method: METHOD.GET,
            })).to.be.true;
        });

        it("Должен вернуть данные из запроса", async () => {
            const response = await http.get("/some-url");
            expect(response).to.deep.equal({ data: "test" });
        });
    });

    describe("Метод post", () => {
        it("Должен вызвать request с методом POST", async () => {
            const url = "/some-url";
            const options = { headers: { "X-Test": "test" }, data: { key: "value" } };
            await http.post(url, options);

            expect(requestStub.calledOnceWithExactly(`${http["apiUrl"]}${url}`, {
                ...options,
                method: METHOD.POST,
            })).to.be.true;
        });

        it("Должен вернуть данные из запроса", async () => {
            const response = await http.post("/some-url");
            expect(response).to.deep.equal({ data: "test" });
        });
    });

    describe("Метод put", () => {
        it("Должен вызвать request с методом PUT", async () => {
            const url = "/some-url";
            const options = { headers: { "X-Test": "test" }, data: { key: "value" } };
            await http.put(url, options);

            expect(requestStub.calledOnceWithExactly(`${http["apiUrl"]}${url}`, {
                ...options,
                method: METHOD.PUT,
            })).to.be.true;
        });

        it("Должен вернуть данные из запроса", async () => {
            const response = await http.put("/some-url");
            expect(response).to.deep.equal({ data: "test" });
        });
    });

    describe("Метод delete", () => {
        it("Должен вызвать request с методом DELETE", async () => {
            const url = "/some-url";
            const options = { headers: { "X-Test": "test" } };
            await http.delete(url, options);

            expect(requestStub.calledOnceWithExactly(`${http["apiUrl"]}${url}`, {
                ...options,
                method: METHOD.DELETE,
            })).to.be.true;
        });

        it("Должен вернуть данные из запроса", async () => {
            const response = await http.delete("/some-url");
            expect(response).to.deep.equal({ data: "test" });
        });
    });
});
