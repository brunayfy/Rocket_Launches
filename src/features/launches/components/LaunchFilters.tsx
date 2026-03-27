import { Flex, Input, NativeSelect } from "@chakra-ui/react"

export default function LaunchFilters({
  search,
  success,
  upcoming,
  setParams,
}: any) {
  return (
    <Flex gap={4} wrap="wrap" mb={6}>
      <Input
        placeholder="Search launches"
        value={search}
        aria-label="Search launches"
        bg="cardBg"
        color="text"
        borderColor="border"
        _placeholder={{ color: "mutedText" }}
        onChange={(e) =>
          setParams((prev: any) => ({
            ...prev,
            search: e.target.value,
            page: 1,
          }))
        }
      />

      <NativeSelect.Root minW="180px">
        <NativeSelect.Field
          aria-label="Filter by success"
          bg="cardBg"
          color="text"
          borderColor="border"
          value={success || ""}
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
        <NativeSelect.Indicator color="text" />
      </NativeSelect.Root>

      <NativeSelect.Root minW="180px">
        <NativeSelect.Field
          aria-label="Filter by upcoming launches"
          bg="cardBg"
          color="text"
          borderColor="border"
          value={upcoming || ""}
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
        <NativeSelect.Indicator color="text" />
      </NativeSelect.Root>
    </Flex>
  )
}