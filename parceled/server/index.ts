import * as express from 'express'

import {parcelMiddleware} from './middleware/parcel'

const port = process.env.PORT || 3000
const app = express()

app.use(parcelMiddleware())

app.listen(port)
