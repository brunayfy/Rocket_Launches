import { Box, Image, Text, Badge, VStack, HStack } from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom"
import rocket from "../../../assets/rocket.png"
import { type Launch } from "../types/launch"

function getStatusLabel(success?: boolean | null, upcoming?: boolean) {
  if (upcoming) return "Upcoming"
  if (success === true) return "Success"
  if (success === false) return "Failure"
  return "Unknown"
}

function getStatusPalette(success?: boolean | null, upcoming?: boolean) {
  if (upcoming) return "blue"
  if (success === true) return "green"
  if (success === false) return "red"
  return "gray"
}

export default function LaunchCard({ launch }: { launch: Launch }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box
      bg="cardBg"
      color="text"
      borderWidth="1px"
      borderColor="border"
      p={4}
      borderRadius="xl"
      cursor="pointer"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "md",
      }}
      onClick={() =>
        navigate(`/launch/${launch.id}`, {
          state: { from: `${location.pathname}${location.search}` },
        })
      }
    >
      <VStack align="stretch" gap={3}>
        <Image
          src={launch.links.patch.small || rocket}
          alt={launch.name}
          h="140px"
          objectFit="contain"
          borderRadius="md"
          bg="bg"
          p={2}
          onError={(e) => {
            e.currentTarget.src = rocket
          }}
        />

        <HStack justify="space-between" align="start">
          <Text fontWeight="bold" fontSize="lg" lineClamp={2}>
            {launch.name}
          </Text>

          <Badge
            colorPalette={getStatusPalette(launch.success, launch.upcoming)}
          >
            {getStatusLabel(launch.success, launch.upcoming)}
          </Badge>
        </HStack>

        <Text color="mutedText" fontSize="sm">
          {new Date(launch.date_utc).toLocaleDateString()}
        </Text>
        <VStack align="stretch" gap={1}>
          {launch.rocket?.name && (
            <Text fontSize="sm" color="mutedText">
              🚀 {launch.rocket.name}
            </Text>
          )}

          {launch.launchpad && (
            <Text fontSize="sm" color="mutedText">
              📍 {launch.launchpad.name}
              {launch.launchpad.locality && ` — ${launch.launchpad.locality}`}
            </Text>
          )}
        </VStack>
      </VStack>
    </Box>
  )
}
