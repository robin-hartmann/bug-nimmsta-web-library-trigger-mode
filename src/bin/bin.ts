#!/usr/bin/env node
// eslint-disable-next-line node/shebang
import { run } from './run'

run().catch((error) => {
  /* eslint-disable no-console */
  console.error('Uncaught error:')
  console.error(error)
  /* eslint-enable no-console */
})
