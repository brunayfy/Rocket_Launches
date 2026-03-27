import axios from 'axios'
import type { LaunchesResponse, Launchpad, Rocket } from '../types/launch'

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