import Circle from '~/components/circle'
import type { Route } from './+types/home'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Dash from '~/components/dash'
import { Plus } from 'lucide-react'

gsap.registerPlugin(useGSAP)

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function Home() {
  const [count, setCount] = useState(1)

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-row items-center gap-1 transition-all">
        {/* one circle and dash for every count */}
        {Array.from({ length: count }).map((_, index) => (
          <Moment key={index} />
        ))}

        <button
          className="circle-button group w-10 h-10 rounded-full border-slate-400 text-slate-400 hover:border-slate-600 hover:text-slate-600 border-4 flex justify-center items-center cursor-pointer transition-colors"
          onClick={() => setCount(count + 1)}
        >
          <Plus
            strokeWidth={4}
            className="group-hover:scale-110 transition-transform"
          />
        </button>
      </div>
    </div>
  )
}

function Moment() {
  const containerRef = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      gsap
        .timeline()
        .from('.circle', { y: 10, alpha: 0 })
        .from('.dash', { y: 10, alpha: 0 }, '<0.1')
    },
    { scope: containerRef }
  )
  return (
    <div ref={containerRef} className="flex flex-row items-center gap-1">
      <Circle />
      <Dash />
    </div>
  )
}
