import { Controller } from './controller'

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
new Controller().run().catch((error) => alert(`critical error: ${error}`))
