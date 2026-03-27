import { useParams, useLocation, Link as RouterLink } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Link,
  SimpleGrid,
  Image,
  Spinner,
  AspectRatio,
} from "@chakra-ui/react"

import { getLaunch, getRocket, getLaunchpad } from "../api/launchesApi"

function getStatus(success: boolean | null, upcoming: boolean) {
  if (upcoming) return { label: "Upcoming", color: "blue" }
  if (success === true) return { label: "Success", color: "green" }
  if (success === false) return { label: "Failure", color: "red" }
  return { label: "Unknown", color: "gray" }
}

export default function LaunchDetailPage() {
  const { id } = useParams()
  const location = useLocation()

  const backUrl = location.state?.from || "/"

  const { data: launch, isLoading } = useQuery({
    queryKey: ["launch", id],
    queryFn: () => getLaunch(id!),
    enabled: !!id,
  })

  const { data: rocket } = useQuery({
    queryKey: ["rocket", launch?.rocket],
    queryFn: () => getRocket(launch!.rocket),
    enabled: !!launch?.rocket,
  })

  const { data: launchpad } = useQuery({
    queryKey: ["launchpad", launch?.launchpad],
    queryFn: () => getLaunchpad(launch!.launchpad),
    enabled: !!launch?.launchpad,
  })

  if (isLoading || !launch) {
    return (
      <Box p={10}>
        <Spinner />
      </Box>
    )
  }

  const status = getStatus(launch.success, launch.upcoming)

  const youtubeUrl = launch.links.youtube_id
    ? `https://www.youtube.com/embed/${launch.links.youtube_id}`
    : null

  const gallery = launch.links.flickr?.original || []

  return (
    <Box minH="100vh" bg="bg" color="text" px={{ base: 4, md: 8 }} py={8}>
      <VStack align="stretch" gap={8}>
        
        <HStack justify="space-between" wrap="wrap">
          <Box>
            <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
              {launch.name}
            </Text>

            <Text color="mutedText" mt={2}>
              {new Date(launch.date_utc).toLocaleString()}
            </Text>
          </Box>

          <Badge colorPalette={status.color} fontSize="sm" px={3} py={1}>
            {status.label}
          </Badge>
        </HStack>

        <Box
          p={6}
          borderWidth="1px"
          borderColor="border"
          borderRadius="xl"
          bg="cardBg"
        >
          <Text fontSize="lg" fontWeight="semibold" mb={2}>
            Details
          </Text>

          <Text color="mutedText">
            {launch.details || "No details available for this launch."}
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <Box
            p={6}
            borderWidth="1px"
            borderColor="border"
            borderRadius="xl"
            bg="cardBg"
          >
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Rocket
            </Text>

            {rocket ? (
              <VStack align="start">
                <Text>
                  <strong>Name:</strong> {rocket.name}
                </Text>
                <Text>
                  <strong>Type:</strong> {rocket.type}
                </Text>
              </VStack>
            ) : (
              <Text color="mutedText">Loading rocket...</Text>
            )}
          </Box>

          <Box
            p={6}
            borderWidth="1px"
            borderColor="border"
            borderRadius="xl"
            bg="cardBg"
          >
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Launchpad
            </Text>

            {launchpad ? (
              <VStack align="start">
                <Text>
                  <strong>Name:</strong> {launchpad.name}
                </Text>
                <Text>
                  <strong>Location:</strong>{" "}
                  {launchpad.locality}, {launchpad.region}
                </Text>
              </VStack>
            ) : (
              <Text color="mutedText">Loading launchpad...</Text>
            )}
          </Box>
        </SimpleGrid>

        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={3}>
            Links
          </Text>

          <VStack align="start" gap={2}>
            {launch.links.wikipedia && (
              <Link href={launch.links.wikipedia} target="_blank">
                Wikipedia
              </Link>
            )}

            {launch.links.webcast && (
              <Link href={launch.links.webcast} target="_blank">
                Webcast
              </Link>
            )}

            {launch.links.youtube_id && (
              <Link
                href={`https://www.youtube.com/watch?v=${launch.links.youtube_id}`}
                target="_blank"
              >
                YouTube
              </Link>
            )}

            {!launch.links.wikipedia &&
              !launch.links.webcast &&
              !launch.links.youtube_id && (
                <Text color="mutedText">No links available</Text>
              )}
          </VStack>
        </Box>

        {youtubeUrl && (
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb={3}>
              Video
            </Text>

            <AspectRatio ratio={16 / 9}>
              <iframe
                src={youtubeUrl}
                title={launch.name}
                style={{ border: 0 }}
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        )}

        <Box>
          <Text fontSize="lg" fontWeight="semibold" mb={3}>
            Gallery
          </Text>

          {gallery.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {gallery.map((img: string) => (
                <Image
                  key={img}
                  src={img}
                  borderRadius="xl"
                  objectFit="cover"
                  w="100%"
                  h="220px"
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text color="mutedText">No images available</Text>
          )}
        </Box>

        <Button asChild variant="outline" alignSelf="start">
          <RouterLink to={backUrl}>← Back to launches</RouterLink>
        </Button>
      </VStack>
    </Box>
  )
}