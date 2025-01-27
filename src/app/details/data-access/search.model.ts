export interface SearchDetailResInterface {
  id: number
  name: string
  favorite_color: string
  quotes: {
    [key: string]: string[]
  }
}
