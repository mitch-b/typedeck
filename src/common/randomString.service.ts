import { IRandomStringService } from './randomStringService.interface'

/**
 * Generate a random string
 */
export class MathRandomStringService implements IRandomStringService {
  public get (length: number, charSet?: string): string {
    let text = ''
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      text += charSet.charAt(Math.floor(Math.random() * charSet.length))
    }
    return text
  }
}
