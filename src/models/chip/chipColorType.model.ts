// tslint:disable-next-line:variable-name
const ChipColorType = {
  StandardUS: 'StandardUS' as 'StandardUS',
  California: 'California' as 'California',
  WynnLasVegas: 'WynnLasVegas' as 'WynnLasVegas'
}

type ChipColorType = (typeof ChipColorType)[keyof typeof ChipColorType]
export { ChipColorType }
