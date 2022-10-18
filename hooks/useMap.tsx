import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export const useMap = () => useMemo(() => dynamic(
  () => import('../components/map/Map'),
  {
    loading: () => <p>Loading map...</p>,
    ssr: false,
  },
), [])
