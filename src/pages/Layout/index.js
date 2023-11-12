import { useEffect } from 'react'

import { request } from '@/utils'

const Layout = () => {
  useEffect(() => {
    request.get('/user/profile')
  }, [])
  return <div>Layout</div>
}

export default Layout
