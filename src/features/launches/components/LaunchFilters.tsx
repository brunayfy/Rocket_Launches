import { Flex, Input, NativeSelect, Box, Text } from "@chakra-ui/react"

type LaunchFiltersProps = {
  search: string
  success?: string | null
  upcoming?: string | null
  from?: string | null
  to?: string | null
  setParams: (
    updater:
      | Record<string, string>
      | ((prev: Record<string, string>) => Record<string, string>)
  ) => void
}

export default function LaunchFilters({
  search,
  success,
  upcoming,
  from,
  to,
  setParams,
}: LaunchFiltersProps) {
  return (
    <Flex gap={4} wrap="wrap" mb={6}>
      <Box minW="220px">
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Search
        </Text>
        <Input
          placeholder="Search launches"
          value={search}
          aria-label="Search launches"
          bg="cardBg"
          color="text"
          borderColor="border"
          _placeholder={{ color: "mutedText" }}
          onChange={(e) =>
            setParams((prev) => ({
              ...prev,
              search: e.target.value,
              page: "1",
            }))
          }
        />
      </Box>

      <Box minW="180px">
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Success
        </Text>
        <NativeSelect.Root>
          <NativeSelect.Field
            aria-label="Filter by success"
            bg="cardBg"
            color="text"
            borderColor="border"
            value={success || ""}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                success: e.target.value,
                page: "1",
              }))
            }
          >
            <option value="">All</option>
            <option value="true">Success</option>
            <option value="false">Failure</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator color="text" />
        </NativeSelect.Root>
      </Box>

      <Box minW="180px">
        <Text mb={2} fontSize="sm" fontWeight="medium">
          Upcoming
        </Text>
        <NativeSelect.Root>
          <NativeSelect.Field
            aria-label="Filter by upcoming launches"
            bg="cardBg"
            color="text"
            borderColor="border"
            value={upcoming || ""}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                upcoming: e.target.value,
                page: "1",
              }))
            }
          >
            <option value="">All</option>
            <option value="true">Upcoming</option>
            <option value="false">Past</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator color="text" />
        </NativeSelect.Root>
      </Box>

      <Box minW="180px">
        <Text mb={2} fontSize="sm" fontWeight="medium">
          From
        </Text>
        <Input
          type="date"
          value={from || ""}
          aria-label="Filter from date"
          bg="cardBg"
          color="text"
          borderColor="border"
          onChange={(e) =>
            setParams((prev) => ({
              ...prev,
              from: e.target.value,
              page: "1",
            }))
          }
        />
      </Box>

      <Box minW="180px">
        <Text mb={2} fontSize="sm" fontWeight="medium">
          To
        </Text>
        <Input
          type="date"
          value={to || ""}
          aria-label="Filter to date"
          bg="cardBg"
          color="text"
          borderColor="border"
          onChange={(e) =>
            setParams((prev) => ({
              ...prev,
              to: e.target.value,
              page: "1",
            }))
          }
        />
      </Box>
    </Flex>
  )
}