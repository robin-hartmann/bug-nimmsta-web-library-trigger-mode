import bind from 'bind-decorator'
import {
  ButtonEvent,
  NIMMSTA,
  NimmstaConnectionManager,
  NimmstaDevice,
  TriggerMode,
} from 'nimmsta-web-library'
import { Hs50Layout } from './layouts/hs50-layout'
import { InteractableLayout } from './layouts/interactable-layout'
import { SimpleScanLayout } from './layouts/simple-scan-layout'

export enum ScannerScreen {
  SimpleScan,
  Interactable,
}

export class NimmstaScanner {
  private device: NimmstaDevice | undefined

  private counter = 0

  private _onScan: (data: string) => void

  constructor(onScan: (data: string) => void) {
    this._onScan = onScan
  }

  public init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      NIMMSTA.onError((error: unknown) => {
        reject(
          new Error(
            `error while trying to connect to NIMMSTA app: ${String(error)}`,
          ),
        )
      })
      NIMMSTA.onReady(() => {
        console.log('connected to NIMMSTA App')
        resolve()
      })
    })
  }

  public connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const connectionManager = new NimmstaConnectionManager()

      if (connectionManager.devices.length > 0) {
        console.log('scanner already connected')
        this.onConnected(connectionManager.devices[0]!)
        resolve()

        return
      }

      console.log('no scanner connected, waiting for connection')
      connectionManager
        .displayConnectActivity()
        // eslint-disable-next-line promise/always-return
        .then(() => {
          const connectSubscribtion = connectionManager.connectEvent.subscribe(
            (device) => {
              connectSubscribtion.cancel()
              this.onConnected(device)
              resolve()
            },
          )
        })
        .catch(reject)
    })
  }

  public setEnabled(isEnabled: boolean): void {
    if (!this.device) {
      throw new Error('not connected')
    }

    this.device.preferredTriggerMode = isEnabled
      ? TriggerMode.ButtonAndTouch
      : TriggerMode.Disabled
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async setScreen(screen: ScannerScreen): Promise<void> {
    if (!this.device) {
      throw new Error('not connected')
    }

    let layout: Hs50Layout

    switch (screen) {
      case ScannerScreen.SimpleScan:
        layout = new SimpleScanLayout()
        break

      case ScannerScreen.Interactable:
        layout = new InteractableLayout(this.counter.toString())
        break

      default:
        throw new Error('unknown screen')
    }

    this.device.setLayout(layout).catch(console.warn)
  }

  public isConnected(): boolean {
    return Boolean(this.device)
  }

  private onConnected(device: NimmstaDevice): void {
    console.log('scanner is connected')

    this.device = device

    this.device.scanEvent.subscribe((event) => this._onScan(event.barcode))
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.device.buttonEvent.subscribe(this.onButtonEvent)
    this.device.disconnectEvent.subscribe(() => {
      this.device = undefined
    })
  }

  @bind
  private onButtonEvent(event: ButtonEvent): void {
    if (!this.device) {
      throw new Error('not connected')
    }

    switch (event.name) {
      case 'increment':
        this.counter++
        break

      case 'decrement':
        this.counter--
        break

      default:
        throw new Error('unknown event name')
    }

    this.device
      .updateLayout({ counter: this.counter.toString() })
      .catch(console.warn)
  }
}
