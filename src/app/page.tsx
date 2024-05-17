import Steps from './_components/Steps'
import Hero from './_components/Hero'
import Features from './_components/Features'
import ConvinceYou from './_components/ConvinceYou'
import { ExperiencesCards } from './_components/ExperiencesCards'
import { FAQ } from './_components/FAQ'

export default function Home() {
  return (
    <div className='max-h-full m-auto flex flex-col'>
      <Hero />
      <Steps />
      {/* <Features />
      <ConvinceYou />
      <ExperiencesCards />
      <FAQ /> */}
    </div>
  )
}
