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

export type LaunchLinks = {
  patch: {
    small: string | null
  }
  flickr?: {
    original: string[]
  }
  wikipedia?: string | null
  webcast?: string | null
  youtube_id?: string | null
}

export type LaunchListItem = {
  id: string
  name: string
  date_utc: string
  success?: boolean | null
  upcoming?: boolean
  rocket: Rocket
  launchpad: Launchpad
  links: LaunchLinks
}

export type LaunchDetail = {
  id: string
  name: string
  date_utc: string
  success: boolean | null
  upcoming: boolean
  details: string | null
  rocket: string
  launchpad: string
  links: LaunchLinks
}

export type LaunchesResponse = {
  docs: LaunchListItem[]
  hasNextPage: boolean
  hasPrevPage?: boolean
  page?: number
  totalPages?: number
}
