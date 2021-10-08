import bind from 'bind-decorator'
import { ElementCreator } from './element-creator'
import { NimmstaScanner } from './nimmsta-scanner'

export class Controller {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  private readonly scanner = new NimmstaScanner(this.onScan)

  private readonly elementCreator = new ElementCreator()

  private readonly inputs: HTMLInputElement[] = []

  private scannerStateLabel: HTMLLabelElement

  constructor() {
    for (let i = 0; i < 6; i++) {
      const input = this.elementCreator.createAndAppend('input')

      /* eslint-disable @typescript-eslint/unbound-method */
      input.addEventListener('focus', () => {
        input.value = ''
        this.enableScanner()
      })
      input.addEventListener('blur', this.disableScanner)
      /* eslint-enable @typescript-eslint/unbound-method */

      this.inputs.push(input)
    }

    this.elementCreator
      .createAndAppend('button', 'Enable Scanner')
      // eslint-disable-next-line @typescript-eslint/unbound-method
      .addEventListener('click', this.enableScanner)

    this.elementCreator
      .createAndAppend('button', 'Disable Scanner')
      // eslint-disable-next-line @typescript-eslint/unbound-method
      .addEventListener('click', this.disableScanner)

    this.scannerStateLabel = this.elementCreator.createAndAppend(
      'label',
      'unknown scanner state',
    )
  }

  public async run(): Promise<void> {
    await this.scanner.init()
    await this.scanner.connect()
    this.inputs[0]?.focus()
  }

  @bind
  private onScan(data: string): void {
    const activeEl = document.activeElement

    if (!(activeEl instanceof HTMLInputElement)) {
      return
    }

    const activeIndex = this.inputs.indexOf(activeEl)

    if (activeIndex < 0) {
      return
    }

    const nextInput = this.inputs[(activeIndex + 1) % this.inputs.length]

    activeEl.value = data
    nextInput.focus()
  }

  @bind
  private enableScanner(): void {
    if (this.scanner.isConnected()) {
      this.scanner.setEnabled(true)
      this.updateScannerState(true)
    }
  }

  @bind
  private disableScanner(): void {
    if (this.scanner.isConnected()) {
      this.scanner.setEnabled(false)
      this.updateScannerState(false)
    }
  }

  private updateScannerState(isEnabled: boolean): void {
    this.scannerStateLabel.textContent = `scanner should be ${
      isEnabled ? 'enabled' : 'disabled'
    }`
  }
}
