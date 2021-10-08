export class ElementCreator {
  private nextElementPosX = 0

  public createAndAppend<TTagName extends keyof HTMLElementTagNameMap>(
    tagName: TTagName,
    textContent?: string,
  ): HTMLElementTagNameMap[TTagName] {
    const element = document.createElement(tagName)

    if (textContent) {
      element.textContent = textContent
    }

    element.style.top = `${this.nextElementPosX}px`
    element.style.position = 'absolute'

    document.body.append(element)
    this.nextElementPosX += element.offsetHeight

    return element
  }
}
