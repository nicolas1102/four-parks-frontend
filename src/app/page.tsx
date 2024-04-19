import Steps from './_components/Steps'
import Hero from './_components/Hero'
import Benefits from './_components/Benefits'
import ConvinceYou from './_components/ConvinceYou'
import { ExperiencesCards } from './_components/ExperiencesCards'

export default function Home() {
  return (
    <div className='max-h-full m-auto flex flex-col'>
      <Hero />
      <Steps />
      <Benefits />
      <ConvinceYou />
      <ExperiencesCards />
    </div>
  )
}
