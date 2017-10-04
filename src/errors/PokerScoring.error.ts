export class PokerScoringError extends Error {
  constructor (message: string) {
    super(`Poker Scoring: ${message}`)
  }
}
