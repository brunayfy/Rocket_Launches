export type Launch = {
  id: string
  name: string
  date_utc: string
  success?: boolean
  upcoming?: boolean
  links: {
    patch: {
      small: string | null
    }
  }
}

export type LaunchesResponse = {
  docs: Launch[]
  hasNextPage: boolean
}