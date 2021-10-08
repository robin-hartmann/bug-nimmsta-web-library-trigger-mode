import {
  NIMMSTA,
  NimmstaConnectionManager,
  NimmstaDevice,
  TriggerMode,
} from 'nimmsta-web-library'

export class NimmstaScanner {
  private device: NimmstaDevice | undefined

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

  public isConnected(): boolean {
    return Boolean(this.device)
  }

  private onConnected(device: NimmstaDevice): void {
    console.log('scanner is connected')

    this.device = device

    this.device.scanEvent.subscribe((event) => this._onScan(event.barcode))
    this.device.disconnectEvent.subscribe(() => {
      this.device = undefined
    })
  }
}
