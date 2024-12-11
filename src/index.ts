import app from './server'
import config from './config'

app.listen(config.port, () => console.log(`http://localhost:${config.port}`))
