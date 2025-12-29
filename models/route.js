export class Route {
    constructor(path = "/", method = "GET", status = 200, handler = (req, res) => { res.send("Hello World") }) {
        this.path = path;
        this.method = method;
        this.status = status;
        this.handler = handler;
    }   
    register(app) {
        switch (this.method.toUpperCase()) {
            case "get":
                app.get(this.path, this.handler);
                break;
            case "post":
                app.post(this.path, this.handler);
                break;
        }
    }   
}