
import { NODE_ENV, port } from '../config/config.service.js'
import { checkDBconnection, checkSYNCconnection } from './DB/connection.db.js'
import { CommentRouter } from './modules/comment/index.js'
import { PostRouter, userRouter } from './modules/index.js'
import express from 'express'

async function bootstrap() {
    const app = express()
    //convert buffer data
    app.use(express.json())

    //DB
    await checkDBconnection()
    await checkSYNCconnection()

    //application routing
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/users', userRouter)
    app.use('/user', userRouter)
    app.use('/posts', PostRouter)
    app.use('/comments', CommentRouter)


    //invalid routing
    app.use('{/*dummy}', (req, res) => {
        return res.status(404).json({ message: "Invalid application routing" })
    })

    //error-handling
    app.use((error, req, res, next) => {
        const status = error.cause?.status ?? 500
        return res.status(status).json({
            error,
            error_message:
            status == 500 ? 'something went wrong' : error.message ?? 'something went wrong',
            stack: NODE_ENV == "development" ? error.stack : undefined
        })
    })
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default bootstrap