import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { useSearchParams } from "react-router-dom"
import { useLaunches } from "../hooks/useLaunches"
import { useDebounce } from "../hooks/useDebounce"
import LaunchFilters from "../components/LaunchFilters"
import LaunchList from "../components/LaunchList"
import { ColorModeButton } from "../../../components/ColorModeProvider"

export default function LaunchListPage() {
  const [params, setParamsRaw] = useSearchParams()

  const setParams = (update: any) => {
    const current = Object.fromEntries(params.entries())
    const next = typeof update === "function" ? update(current) : update

    const cleaned = Object.fromEntries(
      Object.entries(next).filter(
        ([, value]) => value !== undefined && value !== null && value !== ""
      )
    )

    setParamsRaw(cleaned as Record<string, string>)
  }

  const search = params.get("search") || ""
  const page = Number(params.get("page") || 1)
  const success = params.get("success")
  const upcoming = params.get("upcoming")

  const debouncedSearch = useDebounce(search)

  const { data, isLoading, isError } = useLaunches({
    search: debouncedSearch,
    page,
    success,
    upcoming,
  })

  return (
    <Box minH="100vh" bg="bg" color="text">
      <Box
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 8 }}
        bgGradient="linear(to-b, transparent, bg)"
      >
        <Flex justify="space-between" align="center" mb={6} gap={4} wrap="wrap">
          <Box>
            <Heading size="xl">SpaceX Launches</Heading>
            <Text color="mutedText" mt={2}>
              Explore launches with filters, pagination and detailed views.
            </Text>
          </Box>

          <ColorModeButton />
        </Flex>

        <LaunchFilters
          search={search}
          success={success}
          upcoming={upcoming}
          setParams={setParams}
        />

        {isError && (
          <Box
            mt={6}
            p={4}
            borderWidth="1px"
            borderColor="border"
            borderRadius="xl"
            bg="cardBg"
          >
            <Text color="red.400">Error loading launches.</Text>
          </Box>
        )}

        <Box mt={6}>
          <LaunchList data={data} isLoading={isLoading} />
        </Box>

        <Flex mt={8} justify="space-between" align="center" gap={4}>
          <Button
            variant="outline"
            onClick={() =>
              setParams((prev: any) => ({
                ...prev,
                page: Math.max(1, page - 1),
              }))
            }
            disabled={page === 1}
          >
            Previous
          </Button>

          <Text color="mutedText">Page {page}</Text>

          <Button
            variant="outline"
            onClick={() =>
              setParams((prev: any) => ({
                ...prev,
                page: page + 1,
              }))
            }
            disabled={!data?.hasNextPage}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}