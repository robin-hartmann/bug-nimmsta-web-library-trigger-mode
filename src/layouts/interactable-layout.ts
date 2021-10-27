import { Hs50Layout } from './hs50-layout'

export class InteractableLayout extends Hs50Layout {
  constructor(counter: string) {
    const staticElementsContent = `
      <statusbar/>
      <cell name="counter" fontSize="26pt" horizontalAlignment="CENTER" verticalAlignment="CENTER" />
      <button y="150" x="0" width="100" height="50" name="increment">+</button>
      <button y="150" x="100" width="100" height="50" name="decrement">-</button>
    `
    super(staticElementsContent, { counter })
  }
}
