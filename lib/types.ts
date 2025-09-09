export interface Client {
  clientId: string
  name: string
  age: number
  employer: string
  incomeAnnual: number
  riskTolerance: string
}

export interface ExtractedData {
  accounts: {
    '401k'?: {
      balance: number
      contributionPct: number
      employerMatchMaxPct: number
      funds: Array<{
        ticker: string
        weight: number
        expenseRatio: number
      }>
    }
    savings?: {
      balance: number
      target: number
    }
    checking?: {
      balance: number
    }
    brokerage?: {
      balance: number
      holdings: Array<{
        ticker: string
        weight: number
      }>
    }
    loans?: Array<{
      type: string
      balance: number
      apr: number
    }>
  }
  events: Array<{
    date: string
    type: string
    note: string
  }>
  mortgage?: {
    balance: number
    rateApr: number
    pitiMonthly: number
  }
  rsuSchedul?: {
    employer: string
    nextVestDate: string
    units: number
    estValue: number
  }
}

export interface Note {
  id: string
  timestamp: number
  text: string
  includeDisclosure: boolean
}
// Add other types as needed