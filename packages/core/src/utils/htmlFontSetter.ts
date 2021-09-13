import { RemScalingOptions } from '../types'
import { getRemFontSize } from './getRemFontSize'

export class HtmlFontSetter {
  private resize: OmitThisParameter<() => void>

  constructor(private options: RemScalingOptions) {
    this.resize = this.resizeCallback.bind(this)

    window.addEventListener('resize', this.resize)
    window.addEventListener('orientationchange', this.resize)

    this.resize()
  }

  private resizeCallback() {
    this.setFontSize(getRemFontSize(this.options))
  }

  private setFontSize(size: string | number) {
    document.body.style.fontSize = `${size}px`

    if (document.body.parentElement) {
      document.body.parentElement.style.fontSize = `${size}px`
    }
  }

  public destroy() {
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('orientationchange', this.resize)

    this.setFontSize(this.options.base)
  }
}