import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSearchParams, useLocation } from "react-router-dom"
import { useLaunches } from "../hooks/useLaunches"
import { useDebounce } from "../hooks/useDebounce"
import LaunchFilters from "../components/LaunchFilters"
import LaunchList from "../components/LaunchList"
import { ColorModeButton } from "../../../components/ColorModeProvider"

type SearchParamRecord = Record<string, string>

export default function LaunchListPage() {
  const [params, setParamsRaw] = useSearchParams()
  const location = useLocation()
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 120)
    return () => clearTimeout(timer)
  }, [])

  const setParams = (
    updater:
      | SearchParamRecord
      | ((prev: SearchParamRecord) => SearchParamRecord)
  ) => {
    const current: SearchParamRecord = Object.fromEntries(params.entries())

    const next = typeof updater === "function" ? updater(current) : updater

    const cleaned: SearchParamRecord = Object.fromEntries(
      Object.entries(next).filter(([, value]) => value !== "")
    ) as SearchParamRecord

    setParamsRaw(cleaned)
  }

  const scrollToLaunches = () => {
    const section = document.getElementById("launches-section")
    section?.scrollIntoView({ behavior: "smooth" })
  }

  const search = params.get("search") || ""
  const page = Number(params.get("page") || "1")
  const success = params.get("success") || ""
  const upcoming = params.get("upcoming") || ""
  const from = params.get("from") || ""
  const to = params.get("to") || ""

  const debouncedSearch = useDebounce(search)

  const { data, isLoading, isError } = useLaunches({
    search: debouncedSearch,
    page,
    success: success || null,
    upcoming: upcoming || null,
    from: from || null,
    to: to || null,
  })

  useEffect(() => {
    const restoreScrollY = location.state?.restoreScrollY

    if (typeof restoreScrollY === "number") {
      const timer = window.setTimeout(() => {
        window.scrollTo({ top: restoreScrollY, behavior: "auto" })
      }, 50)

      return () => window.clearTimeout(timer)
    }
  }, [location.state, data])

  return (
    <Box minH="100vh" bg="bg" color="text">
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={20}
        justify="space-between"
        align="center"
        px={{ base: 4, md: 8 }}
        py={4}
        bg="rgba(0, 0, 0, 0.16)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor="rgba(255,255,255,0.08)"
      >
        <Text
          color="white"
          fontWeight="bold"
          letterSpacing="0.08em"
          textTransform="uppercase"
          fontSize="sm"
        >
          SpaceX Explorer
        </Text>

        <ColorModeButton />
      </Flex>

      <Box position="relative" minH="100vh" overflow="hidden">
        <Box position="absolute" inset={0} overflow="hidden">
          <Box
            position="absolute"
            top="50%"
            left="50%"
            w={{ base: "220vw", md: "160vw", lg: "120vw" }}
            h={{ base: "120vh", md: "120vh", lg: "120vh" }}
            transform="translate(-50%, -50%) scale(1.08)"
            pointerEvents="none"
          >
            <iframe
              src="https://www.youtube.com/embed/gA6ppby3JC8?autoplay=1&mute=1&loop=1&playlist=gA6ppby3JC8&controls=0&modestbranding=1&rel=0"
              title="SpaceX launch video"
              style={{
                border: 0,
                width: "100%",
                height: "100%",
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </Box>
        </Box>

        <Box position="absolute" inset={0} bg="rgba(0,0,0,0.25)" />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, rgba(0,0,0,0.10), rgba(0,0,0,0.38), rgba(0,0,0,0.72), rgba(0,0,0,0.92), bg)"
        />
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          h={{ base: "180px", md: "260px" }}
          bgGradient="linear(to-b, transparent, bg)"
        />

        <Flex
          position="relative"
          zIndex={2}
          minH="100vh"
          align="center"
          justify="center"
          px={{ base: 6, md: 10 }}
          textAlign="center"
        >
          <VStack
            gap={7}
            maxW="920px"
            opacity={heroVisible ? 1 : 0}
            transform={heroVisible ? "translateY(0)" : "translateY(18px)"}
            transition="all 900ms ease"
          >
            <Heading
              color="white"
              textTransform="uppercase"
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              lineHeight="0.9"
              letterSpacing="-0.04em"
              fontWeight="extrabold"
              textShadow="0 8px 30px rgba(0,0,0,0.45)"
            >
              SpaceX Rocket Launches
            </Heading>

            <Text
              color="whiteAlpha.900"
              fontSize={{ base: "md", md: "xl" }}
              maxW="760px"
              lineHeight="1.7"
              opacity={heroVisible ? 1 : 0}
              transition="opacity 1400ms ease"
            >
              Track missions across SpaceX’s launch history with powerful
              filters, launch details, imagery, and mission context.
            </Text>
          </VStack>
        </Flex>

        <Box
          position="absolute"
          bottom={8}
          left="50%"
          transform="translateX(-50%)"
          zIndex={2}
          cursor="pointer"
          onClick={scrollToLaunches}
        >
          <VStack gap={2}>
            <Text
              color="whiteAlpha.800"
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="0.14em"
            >
              Scroll
            </Text>

            <Box
              w="26px"
              h="44px"
              border="2px solid"
              borderColor="whiteAlpha.700"
              borderRadius="full"
              position="relative"
              bg="rgba(255,255,255,0.03)"
              backdropFilter="blur(4px)"
            >
              <Box
                position="absolute"
                top="8px"
                left="50%"
                transform="translateX(-50%)"
                w="4px"
                h="8px"
                borderRadius="full"
                bg="whiteAlpha.900"
                animation="scrollDot 1.6s ease-in-out infinite"
              />
            </Box>
          </VStack>
        </Box>

        <style>
          {`
            @keyframes scrollDot {
              0% { transform: translateX(-50%) translateY(0); opacity: 0.9; }
              50% { transform: translateX(-50%) translateY(12px); opacity: 0.35; }
              100% { transform: translateX(-50%) translateY(0); opacity: 0.9; }
            }
          `}
        </style>
      </Box>

      <Box
        id="launches-section"
        position="relative"
        px={{ base: 4, md: 8 }}
        pt={{ base: 12, md: 16 }}
        pb={{ base: 10, md: 14 }}
        bg="bg"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="120px"
          transform="translateY(-100%)"
          bgGradient="linear(to-b, transparent, bg)"
          pointerEvents="none"
        />

        <Box mb={10}>
          <Text
            color="mutedText"
            textTransform="uppercase"
            letterSpacing="0.12em"
            fontSize="sm"
            mb={2}
          >
            Mission Explorer
          </Text>

          <Heading size="2xl" mb={3}>
            Browse launches
          </Heading>

          <Text color="mutedText" maxW="720px">
            Search launches, narrow by mission status and date interval, and
            open each mission for detailed information.
          </Text>
        </Box>

        <LaunchFilters
          search={search}
          success={success}
          upcoming={upcoming}
          from={from}
          to={to}
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

        <Box mt={8}>
          <LaunchList data={data} isLoading={isLoading} />
        </Box>

        <Flex mt={10} justify="space-between" align="center" gap={4}>
          <Button
            variant="outline"
            onClick={() =>
              setParams((prev) => ({
                ...prev,
                page: String(Math.max(1, page - 1)),
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
              setParams((prev) => ({
                ...prev,
                page: String(page + 1),
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
