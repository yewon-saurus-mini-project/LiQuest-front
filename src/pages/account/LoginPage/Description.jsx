import { useState, useCallback, useRef, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'

function Description() {
  const ref = useRef([])
  const [items, set] = useState([])
  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      color: '#8fa5b6',
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: 'perspective(600px) rotateX(180deg)', color: '#28d79f' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: '#c23369' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: '#28b4d7' },
  })

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(setTimeout(() => set(['Liquest', 'aivle', '아름답다']), 500))
    ref.current.push(setTimeout(() => set(['Liquest', '아름답다']), 3500))
    ref.current.push(setTimeout(() => set(['Liquest', '토리', '아름답다']), 6500))
  }, [])

  useEffect(() => {
    reset()
    return () => ref.current.forEach(clearTimeout)
  }, [reset])

  return (
    <div className='w-full m-auto'>
        <div className="flex items-center h-full justify-center">
          <div className="min-w-24 pr-[20px] mx-auto h-[260px]">
            {transitions((animationStyles, item) => (
              <animated.div
                className="overflow-hidden w-full text-white flex justify-start items-center text-[4em] font-extrabold uppercase will-change-auto whitespace-nowrap cursor-pointer leading-[80px]"
                style={animationStyles}
                onClick={reset}
              >
                <animated.div style={{ overflow: 'hidden', height: animationStyles.innerHeight }}>{item}</animated.div>
              </animated.div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default Description