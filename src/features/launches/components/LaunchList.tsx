import { SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import LaunchCard from './LaunchCard'
//grid + loading + empty state para a página de listagem de lançamentos
export default function LaunchList({ data, isLoading }: any) {
  if (!isLoading && data?.docs?.length === 0) {
    return <Text>No launches found</Text>
  }

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} h="200px" borderRadius="xl" />)
        : data?.docs.map((l: any) => <LaunchCard key={l.id} launch={l} />)}
    </SimpleGrid>
  )
}