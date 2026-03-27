import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('https://api.spacexdata.com/v4/launches/query', async () => {
    return HttpResponse.json({
      docs: [
        {
          id: 'launch-1',
          name: 'Mock Launch',
          date_utc: '2026-04-12T10:00:00.000Z',
          success: true,
          upcoming: false,
          rocket: {
            id: 'rocket-1',
            name: 'Falcon 9',
            type: 'rocket',
          },
          launchpad: {
            id: 'launchpad-1',
            name: 'KSC LC 39A',
            locality: 'Cape Canaveral',
            region: 'Florida',
          },
          links: {
            patch: {
              small: null,
            },
            flickr: {
              original: [],
            },
            wikipedia: 'https://en.wikipedia.org/wiki/Falcon_9',
            webcast: 'https://www.youtube.com/watch?v=abc123',
            youtube_id: 'abc123',
          },
        },
      ],
      hasNextPage: false,
      hasPrevPage: false,
      page: 1,
      totalPages: 1,
    })
  }),

  http.get('https://api.spacexdata.com/v4/launches/:id', ({ params }) => {
    if (params.id !== 'launch-1') {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json({
      id: 'launch-1',
      name: 'Mock Launch',
      date_utc: '2026-04-12T10:00:00.000Z',
      success: true,
      upcoming: false,
      details: 'This is a mocked launch used in tests.',
      rocket: 'rocket-1',
      launchpad: 'launchpad-1',
      links: {
        patch: {
          small: null,
        },
        flickr: {
          original: [
            'https://images.example.com/mock-1.jpg',
            'https://images.example.com/mock-2.jpg',
          ],
        },
        wikipedia: 'https://en.wikipedia.org/wiki/Falcon_9',
        webcast: 'https://www.youtube.com/watch?v=abc123',
        youtube_id: 'abc123',
      },
    })
  }),

  http.post('https://api.spacexdata.com/v4/rockets/query', async () => {
    return HttpResponse.json({
      docs: [
        {
          id: 'rocket-1',
          name: 'Falcon 9',
          type: 'rocket',
        },
      ],
    })
  }),

  http.post('https://api.spacexdata.com/v4/launchpads/query', async () => {
    return HttpResponse.json({
      docs: [
        {
          id: 'launchpad-1',
          name: 'KSC LC 39A',
          locality: 'Cape Canaveral',
          region: 'Florida',
        },
      ],
    })
  }),
]