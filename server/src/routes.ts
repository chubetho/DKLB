import { Elysia, t } from 'elysia'
import { middleware } from './utils'

interface Draw {
  cycleNo: number
  cycleYear: number
  eventDate: number
  eventWeekday: number
  key: string
  variantNo: number
}

interface BaseResult {
  drawDate: number
}

interface LottoResult extends BaseResult {
  numbersInNaturalOrder: number[]
  numbersInDrawOrder: number[]
  superZahl: number
  spiel77Number: string
  super6Number: string
}

interface EurojackpotResult extends BaseResult {
  numbersInNaturalOrder: number[]
  numbersInDrawOrder: number[]
  additionalNumbersInNaturalOrder: number[]
  additionalNumbersInDrawOrder: number[]
}

interface GluecksSpiraleResult extends BaseResult {
  gluecksSpiraleGameCycle: {
    cycleNo: number
    cycleYear: number
    eventDate: number
    eventWeekday: number
    key: string
    variantNo: number
  }
  siegerChanceGameCycle: {
    cycleNo: number
    cycleYear: number
    eventDate: number
    eventWeekday: number
    key: string
    variantNo: number
  }
  gluecksSpiraleNumbers: {
    1: string[]
    2: string[]
    3: string[]
    4: string[]
    5: string[]
    6: string[]
    7: string[]
  }
  siegerChanceNumbers: {
    1: string[]
    2: string[]
    3: string[]
  }
  bonusNumbers: any
  extraNumbers: any
  jokerNumber: any
  gluecksSpiraleOdds: any
  siegerChanceOdds: any
  gluecksSpiraleTurnover: any
  siegerChanceTurnover: any
  gluecksSpiralePayout: any
  siegerChancePayout: any
}

interface KenoResult extends BaseResult {
  numbersInNaturalOrder: number[]
  numbersInDrawOrder: number[]
  plus5Number: string
}

interface TotoEwResult extends BaseResult {
  numbersInDrawOrder: number[]
  totoEwGameTable: {
    eventNo: number
    team1: string
    team2: string
    teamShort1: string
    teamShort2: string
    tendency: string
    team1Result: number
    team2Result: number
    alternativeResult: number
  }[]
}

interface TotoAwResult extends BaseResult {
  numbersInNaturalOrder: number[]
  numbersInDrawOrder: number[]
  additionalNumber: number
  totoAwGameTable: {
    eventNo: number
    team1: string
    team2: string
    teamShort1: string
    teamShort2: string
    tendency: string
    team1Result: number
    team2Result: number
    alternativeResult: number
  }[]
}

interface LottoOdds extends BaseResult {
  lottoOdds1: {
    amount: number
    numberOfWins: number
    winningClass: number
    sequence: number
    jackpot: boolean
  }[]
  spiel77Odds: {
    amount: number
    numberOfWins: number
    winningClass: number
    sequence: number
    jackpot: boolean
  }[]
  super6Odds: {
    amount: number
    numberOfWins: number
    winningClass: number
    sequence: number
    jackpot: boolean
  }[]
  lottoTurnover: {
    amount: number
    jurisdiction: number
  }[]
  spiel77Turnover: {
    amount: number
    jurisdiction: number
  }[]
  super6Turnover: {
    amount: number
    jurisdiction: number
  }[]
  lottoPayout: {
    amount: number
    jurisdiction: number
  }
  spiel77Payout: {
    amount: number
    jurisdiction: number
  }
  super6Payout: {
    amount: number
    jurisdiction: number
  }
}

export function getNumbers() {
  const yearQuery = { query: t.Object({ year: t.String() }) }
  const gcQuery = { query: t.Object({ gckey: t.String() }) }

  return new Elysia()
    .get('/getDrawYears', middleware<{ years: number[] }>, {
      query: t.Object({
        game: t.Union([
          t.Literal('lotto'),
          t.Literal('eurojackpot'),
          t.Literal('gluecksspirale'),
          t.Literal('keno'),
          t.Literal('totoew'),
          t.Literal('totoaw'),
        ]),
        from: t.String(),
      }),
    })

    .get('/getLottoNumberDrawsForYear', middleware<Draw[]>, yearQuery)
    .get('/getLottoHistoricNumbers', middleware<LottoResult>, gcQuery)

    .get('/getEurojackpotNumberDrawsForYear', middleware<Draw[]>, yearQuery)
    .get('/getEurojackpotHistoricNumbers', middleware<EurojackpotResult>, gcQuery)

    .get('/getGluecksspiraleNumberDrawsForYear', middleware<Draw[]>, yearQuery)
    .get('/getGluecksspiraleHistoricNumbers', middleware<GluecksSpiraleResult>, gcQuery)

    .get('/getKenoNumberDrawsForYear', middleware<Draw[]>, yearQuery)
    .get('/getKenoHistoricNumbers', middleware<KenoResult>, gcQuery)

    .get('/getTotoEwNumberDrawsForYear', middleware<Draw[]>, yearQuery)
    .get('/getTotoEwHistoricNumbers', middleware<TotoEwResult>, gcQuery)

    .get('/getTotoAwNumberDrawsForYear', middleware<Draw[]>, yearQuery)
    .get('/getTotoAwHistoricNumbers', middleware<TotoAwResult>, gcQuery)

    .get('/getLottoHistoricOdds', middleware<LottoOdds>, gcQuery)
}
