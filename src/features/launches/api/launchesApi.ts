import axios from "axios"
import type { LaunchesResponse, Launch, Rocket, Launchpad } from "../types/launch"

const API = import.meta.env.VITE_API_BASE_URL

type GetLaunchesParams = {
  search: string
  page: number
  success?: string | null
  upcoming?: string | null
  from?: string | null
  to?: string | null
}

export const getLaunches = async ({
  search,
  page,
  success,
  upcoming,
  from,
  to,
}: GetLaunchesParams): Promise<LaunchesResponse> => {
  const dateQuery =
    from || to
      ? {
          date_utc: {
            ...(from ? { $gte: `${from}T00:00:00.000Z` } : {}),
            ...(to ? { $lte: `${to}T23:59:59.999Z` } : {}),
          },
        }
      : {}

  const { data } = await axios.post<LaunchesResponse>(`${API}/launches/query`, {
    query: {
      name: { $regex: search || "", $options: "i" },
      ...(success ? { success: success === "true" } : {}),
      ...(upcoming ? { upcoming: upcoming === "true" } : {}),
      ...dateQuery,
    },
    options: {
      page,
      limit: 12,
      sort: { date_utc: "desc" },
      populate: ["rocket", "launchpad"],
    },
  })

  return data
}

export const getLaunch = async (id: string): Promise<Launch> => {
  const { data } = await axios.get<Launch>(`${API}/launches/${id}`)
  return data
}

export const getRocket = async (id: string): Promise<Rocket> => {
  const response = await axios.post(`${API}/rockets/query`, {
    query: { id },
    options: {},
  })
  return response.data.docs[0] as Rocket
}

export const getLaunchpad = async (id: string): Promise<Launchpad> => {
  const response = await axios.post(`${API}/launchpads/query`, {
    query: { id },
    options: {},
  })
  return response.data.docs[0] as Launchpad
}