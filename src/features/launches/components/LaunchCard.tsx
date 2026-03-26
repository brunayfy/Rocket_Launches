import { Box, Text, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import fallback from '../../../assets/fallback.png'

export default function LaunchCard({ launch }: any) {
  const navigate = useNavigate()

  return (
    <Box
      bg="gray.800"
      p={4}
      borderRadius="2xl"
      cursor="pointer"
      _hover={{ transform: 'scale(1.03)' }}
      onClick={() => navigate(`/launch/${launch.id}`)}
    >
      <Image
        src={launch.links.patch.small || fallback}
        alt={launch.name}
        onError={(e) => {
          e.currentTarget.src = fallback
        }}
      />
      <Text mt={2}>{launch.name}</Text>
    </Box>
  )
}