import { useQuery } from '@tanstack/react-query'
import { getLaunches } from '../api/launchesApi'
import { type LaunchesResponse } from '../types/launch'

export const useLaunches = (filters: any) => {
  return useQuery<LaunchesResponse>({
    queryKey: ['launches', filters],
    queryFn: () => getLaunches(filters),
    placeholderData: (previousData) => previousData,
  })
}

