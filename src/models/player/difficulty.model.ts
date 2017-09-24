// tslint:disable-next-line:variable-name
const Difficulty = {
  Easy: 'Easy' as 'Easy',
  Normal: 'Normal' as 'Normal',
  Hard: 'Hard' as 'Hard',
  Expert: 'Expert' as 'Expert'
}

type Difficulty = (typeof Difficulty)[keyof typeof Difficulty]
export { Difficulty }
