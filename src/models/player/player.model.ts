import { MathRandomStringService } from '../../common/randomString.service'
import { IRandomStringService } from '../../common/randomStringService.interface'
import { IHand } from '../cardCollection/hand.interface'
import { Hand } from '../cardCollection/hand.model'
import { IPlayer } from './player.interface'

/**
 * Represents a Player
 */
export class Player implements IPlayer {
  public id: string
  public score: number

  constructor (
    public name: string,
    private hand: IHand,
    randomStringService: IRandomStringService = new MathRandomStringService()) {
    this.id = randomStringService.get(7)
    if (!this.hand) {
      this.hand = new Hand()
    }
  }

  public updateScore (score: number): this {
    this.score = score
    return this
  }

  public getHand (): IHand {
    return this.hand
  }

  public setHand (hand: IHand): this {
    this.hand = hand
    return this
  }

  public toString (): string {
    return `${this.name}`
  }
}
