export class ElementCreator {
  private nextElementTop = 0

  public createAndAppend<TTagName extends keyof HTMLElementTagNameMap>(
    tagName: TTagName,
    textContent?: string,
  ): HTMLElementTagNameMap[TTagName] {
    const element = document.createElement(tagName)

    if (textContent) {
      element.textContent = textContent
    }

    element.style.top = `${this.nextElementTop}px`
    element.style.position = 'absolute'

    document.body.append(element)
    this.nextElementTop += element.offsetHeight

    return element
  }
}
