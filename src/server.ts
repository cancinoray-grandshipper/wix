import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import logger from 'koa-logger'
import router from './routes'
import { config } from './config'



const app = new Koa();
const PORT = config.port



app.use(bodyParser())
app.use(cors());
app.use(logger());
app.use(router.routes())
app.use(router.allowedMethods());

const server = app
    .listen(PORT,async () => {
        console.log(`Server is listening on port: ${PORT}`);
    })
    .on("error", err => {
        console.error(err)
    })

export default server