// src/features/launches/pages/LaunchDetailPage.tsx
import { useParams, Link as RouterLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
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
} from '@chakra-ui/react'
import { getLaunch, getRocket, getLaunchpad } from '../api/launchesApi'

function getLaunchStatus(success: boolean | null, upcoming: boolean) {
  if (upcoming) return 'Upcoming'
  if (success === true) return 'Success'
  if (success === false) return 'Failure'
  return 'Unknown'
}

export default function LaunchDetailPage() {
  const { id } = useParams()

  const {
    data: launch,
    isLoading: isLaunchLoading,
    isError: isLaunchError,
  } = useQuery({
    queryKey: ['launch', id],
    queryFn: () => getLaunch(id!),
    enabled: !!id,
  })

  const { data: rocket, isLoading: isRocketLoading } = useQuery({
    queryKey: ['rocket', launch?.rocket],
    queryFn: () => getRocket(launch!.rocket),
    enabled: !!launch?.rocket,
  })

  const { data: launchpad, isLoading: isLaunchpadLoading } = useQuery({
    queryKey: ['launchpad', launch?.launchpad],
    queryFn: () => getLaunchpad(launch!.launchpad),
    enabled: !!launch?.launchpad,
  })

  if (isLaunchLoading) {
    return (
      <Box p={8}>
        <Spinner />
      </Box>
    )
  }

  if (isLaunchError || !launch) {
    return (
      <Box p={8}>
        <Text>Could not load launch details.</Text>
      </Box>
    )
  }

  const status = getLaunchStatus(launch.success, launch.upcoming)
  const gallery = launch.links.flickr?.original ?? []
  const youtubeUrl = launch.links.youtube_id
    ? `https://www.youtube.com/embed/${launch.links.youtube_id}`
    : launch.links.webcast?.includes('watch?v=')
      ? launch.links.webcast.replace('watch?v=', 'embed/')
      : null

  return (
    <Box p={{ base: 6, md: 10 }}>
      <VStack align="stretch" gap={6}>
        <HStack justify="space-between" align="start" wrap="wrap">
          <Box>
            <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold">
              {launch.name}
            </Text>

            <Text color="gray.400" mt={2}>
              {new Date(launch.date_utc).toLocaleString()}
            </Text>
          </Box>

          <Badge size="lg" colorPalette={status === 'Success' ? 'green' : status === 'Failure' ? 'red' : 'blue'}>
            {status}
          </Badge>
        </HStack>

        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={2}>
            Details
          </Text>
          <Text color="gray.300">
            {launch.details || 'No details available for this launch.'}
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <Box p={5} borderWidth="1px" borderRadius="xl">
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Rocket
            </Text>

            {isRocketLoading ? (
              <Spinner size="sm" />
            ) : rocket ? (
              <VStack align="start" gap={1}>
                <Text>
                  <strong>Name:</strong> {rocket.name}
                </Text>
                <Text>
                  <strong>Type:</strong> {rocket.type}
                </Text>
              </VStack>
            ) : (
              <Text>Rocket information not available.</Text>
            )}
          </Box>

          <Box p={5} borderWidth="1px" borderRadius="xl">
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Launchpad
            </Text>

            {isLaunchpadLoading ? (
              <Spinner size="sm" />
            ) : launchpad ? (
              <VStack align="start" gap={1}>
                <Text>
                  <strong>Name:</strong> {launchpad.name}
                </Text>
                <Text>
                  <strong>Location:</strong> {launchpad.locality}, {launchpad.region}
                </Text>
              </VStack>
            ) : (
              <Text>Launchpad information not available.</Text>
            )}
          </Box>
        </SimpleGrid>

        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={3}>
            Links
          </Text>

          <VStack align="start" gap={2}>
            {launch.links.wikipedia && (
              <Link href={launch.links.wikipedia} target="_blank" rel="noreferrer">
                Wikipedia
              </Link>
            )}

            {launch.links.webcast && (
              <Link href={launch.links.webcast} target="_blank" rel="noreferrer">
                Webcast
              </Link>
            )}

            {launch.links.youtube_id && (
              <Link
                href={`https://www.youtube.com/watch?v=${launch.links.youtube_id}`}
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </Link>
            )}

            {!launch.links.wikipedia && !launch.links.webcast && !launch.links.youtube_id && (
              <Text>No external links available.</Text>
            )}
          </VStack>
        </Box>

        {youtubeUrl && (
          <Box>
            <Text fontSize="xl" fontWeight="semibold" mb={3}>
              Video
            </Text>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={youtubeUrl}
                title={launch.name}
                allowFullScreen
                style={{ border: 0, width: '100%', height: '100%' }}
        
              />
            </AspectRatio>
          </Box>
        )}

        <Box>
          <Text fontSize="xl" fontWeight="semibold" mb={3}>
            Gallery
          </Text>

          {gallery.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {gallery.map((imageUrl: string ) => (
                <Image
                  key={imageUrl}
                  src={imageUrl}
                  alt={`${launch.name} gallery image`}
                  borderRadius="xl"
                  objectFit="cover"
                  w="100%"
                  h="240px"
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text>No gallery images available.</Text>
          )}
        </Box>
        <Button asChild variant="outline" alignSelf="start">
          <RouterLink to="/">Back to launches</RouterLink>
        </Button>
      </VStack>
    </Box>
  )
}