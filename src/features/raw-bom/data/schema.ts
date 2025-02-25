export interface Raw {
  id: number
  status: 'active' | 'inactive'
  date: string
  rawBomFileName: string
  path: string
  actions: string
}
