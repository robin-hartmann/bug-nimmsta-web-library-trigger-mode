import { Hs50Layout } from './hs50-layout'

export class SimpleScanLayout extends Hs50Layout {
  constructor() {
    const staticElementsContent = `
      <statusbar/>
      <scanresult horizontalAlignment="CENTER" verticalAlignment="CENTER" timeToShowBarcode="5" wrapMode="WRAP">
        &lt;scanned-data&gt;
      </scanresult>
    `
    super(staticElementsContent)
  }
}
