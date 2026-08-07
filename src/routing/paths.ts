import { RelativePath } from '../types/navigation'

interface Paths {
  home: RelativePath
  dashboard: RelativePath
}

const paths: Paths = {
  home: '/',
  dashboard: '/dashboard',
}

export default paths
