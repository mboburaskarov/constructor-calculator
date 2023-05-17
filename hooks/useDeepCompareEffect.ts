import { useEffect, useRef } from 'react'
import isEqual from './isEqual'

function useDeepCompareEffect(fn, deps, options?) {
  const { initialEffect = true,  } = options || {}
  const firstRender = useRef(true)
  const shouldCompare = useRef(initialEffect)
  const prevDeps = useRef(deps)

  useEffect(() => {
  
    const isSame = isEqual(deps, prevDeps.current)

    if ((firstRender.current || !isSame) && fn) {
    
      if (shouldCompare.current) {
        fn()
      }

      prevDeps.current = deps
    }


    firstRender.current = false
    shouldCompare.current = true
  }, [deps, fn])
}
export default useDeepCompareEffect
