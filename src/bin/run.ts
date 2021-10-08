import { getAsciiArtHelloWorld } from '../lib/lib'

export const run = async (): Promise<void> => {
  /* eslint-disable no-console */
  try {
    console.log(await getAsciiArtHelloWorld())
  } catch (error) {
    console.error('Error while creating ASCII art:')
    console.error(error)
  }
  /* eslint-enable no-console */
}
