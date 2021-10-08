import figlet from 'figlet'

function promisedFiglet(txt: string): Promise<string> {
  return new Promise((resolve, reject) =>
    figlet(txt, (error, result) => (error ? reject(error) : resolve(result))),
  )
}

export function getAsciiArtHelloWorld(): Promise<string> {
  return promisedFiglet('Hello World!')
}
