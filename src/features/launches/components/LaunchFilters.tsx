import { Input, NativeSelect, Flex } from '@chakra-ui/react'

//filtros completos(search + selects) para a página de listagem de lançamentos
export default function LaunchFilters({
  search,
  setParams,
  success,
  upcoming,
}: any) {
  return (
    <Flex gap={4} wrap="wrap" mb={6}>
      <Input
        placeholder="Search launches"
        value={search}
        aria-label="Search launches"
        onChange={(e) =>
          setParams((prev: any) => ({
            ...prev,
            search: e.target.value,
            page: 1,
          }))
        }
      />

      <NativeSelect.Root>
        <NativeSelect.Field
          aria-label="Filter by success"
          value={success || ''}
          onChange={(e) =>
            setParams((prev: any) => ({
              ...prev,
              success: e.target.value,
              page: 1,
            }))
          }
        >
          <option value="">All</option>
          <option value="true">Success</option>
          <option value="false">Failure</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      <NativeSelect.Root>
        <NativeSelect.Field
          aria-label="Filter by upcoming launches"
          value={upcoming || ''}
          onChange={(e) =>
            setParams((prev: any) => ({
              ...prev,
              upcoming: e.target.value,
              page: 1,
            }))
          }
        >
          <option value="">All</option>
          <option value="true">Upcoming</option>
          <option value="false">Past</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Flex>
  )
}