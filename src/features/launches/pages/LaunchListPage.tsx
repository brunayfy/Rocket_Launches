import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
import { useLaunches } from '../hooks/useLaunches'
import { useDebounce } from '../hooks/useDebounce'
import LaunchFilters from '../components/LaunchFilters'
import LaunchList from '../components/LaunchList'

export default function LaunchListPage() {
  const [params, setParamsRaw] = useSearchParams()

  const setParams = (update: any) => {
    const newParams = typeof update === 'function' ? update(Object.fromEntries(params)) : update
    setParamsRaw(newParams)
  }

  const search = params.get('search') || ''
  const page = Number(params.get('page') || 1)
  const success = params.get('success')
  const upcoming = params.get('upcoming')

  const debounced = useDebounce(search)

  const { data, isLoading, isError } = useLaunches({ search: debounced, page, success, upcoming })

  return (
    <Box p={6}>
      <LaunchFilters
        search={search}
        success={success}
        upcoming={upcoming}
        setParams={setParams}
      />

      {isError && <Text color="red.400">Error loading launches</Text>}

      <LaunchList data={data} isLoading={isLoading} />

      <Flex mt={6} justify="space-between">
        <Button onClick={() => setParams((p: any) => ({ ...p, page: page - 1 }))} disabled={page === 1}>
          Prev
        </Button>
        <Text>Page {page}</Text>
        <Button
          onClick={() => setParams((p: any) => ({ ...p, page: page + 1 }))}
          disabled={!data?.hasNextPage}
        >
          Next
        </Button>
      </Flex>
    </Box>
  )
}