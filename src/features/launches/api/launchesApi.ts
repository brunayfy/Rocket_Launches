import axios from 'axios'
import type { LaunchesResponse } from '../types/launch'

const API = 'https://api.spacexdata.com/v4'

export const getLaunches = async ({ search, page, success, upcoming }: any): Promise<LaunchesResponse> => {
  const { data } = await axios.post<LaunchesResponse>(`${API}/launches/query`, {
    query: {
      name: { $regex: search || '', $options: 'i' },
      ...(success ? { success: success === 'true' } : {}),
      ...(upcoming ? { upcoming: upcoming === 'true' } : {})
    },
    options: {
      page,
      limit: 12,
      sort: { date_utc: 'desc' },
      populate: ['rocket', 'launchpad']
    }
  })
  return data
}

export const getLaunch = async (id: string) => {
  const { data } = await axios.get(`${API}/launches/${id}`)
  return data
}
