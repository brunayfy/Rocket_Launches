import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getLaunch } from '../api/launchesApi'
import { Box, Text } from '@chakra-ui/react'

export default function LaunchDetailPage() {
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['launch', id],
    queryFn: () => getLaunch(id!)
  })

  if (isLoading) return <Text>Loading...</Text>
  if (!data) return <Text>No data</Text>

  return (
    <Box p={6}>
      <Text fontSize="2xl">{data.name}</Text>
      <Text>{data.details}</Text>
    </Box>
  )
}
