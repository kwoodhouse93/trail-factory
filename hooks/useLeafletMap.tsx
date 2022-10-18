import dynamic from 'next/dynamic'
import { useMemo } from 'react'

const useLeafletMap = () => useMemo(() => dynamic(
  () => import('components/map/LeafletMap'),
  {
    loading: () => <p>Loading map...</p>,
    ssr: false,
  },
), [])

export default useLeafletMap
