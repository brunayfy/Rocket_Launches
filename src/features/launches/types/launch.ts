export type Launch = {
  id: string
  name: string
  date_utc: string
  success: boolean | null
  upcoming: boolean
  details: string | null
  rocket: Rocket
  launchpad: Launchpad
  links: {
    wikipedia?: string | null
    webcast?: string | null
    youtube_id?: string | null
    flickr?: {
      original: string[]
    }
    patch: {
      small: string | null
    }
  }
}

export type Rocket = {
  id: string
  name: string
  type: string
}

export type Launchpad = {
  id: string
  name: string
  locality: string
  region: string
}

export type LaunchesResponse = {
  docs: Launch[]
  hasNextPage: boolean
}