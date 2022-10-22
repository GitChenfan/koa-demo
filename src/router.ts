import { Context } from 'koa';
import * as Router from 'koa-router';




let router = new Router();

router.get("/", async (ctx:Context, next: Function) =>{
    ctx.type = "html"
    ctx.body = "<h1>hello world!</h1>"
})




export { router };