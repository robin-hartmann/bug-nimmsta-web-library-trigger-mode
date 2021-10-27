import { NimmstaLayout } from 'nimmsta-web-library'

export class Hs50Layout extends NimmstaLayout {
  constructor(
    staticElementsContent: string,
    values?: {
      [elementName: string]: string
    },
  ) {
    // name attributes omitted from tags NimmstaLayout and screen
    const xml = `
      <?xml version="1.0" encoding="utf-8"?>
      <NimmstaLayout>
        <device width="1.54" height="1.54" pxx="200" pxy="200">
          <screen default="true">
            <staticElements>
      ${staticElementsContent}
            </staticElements>
          </screen>
        </device>
      </NimmstaLayout>
    `
    // requires target to be es6
    // https://stackoverflow.com/a/50203532
    super(xml, values)
  }
}
