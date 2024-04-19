import Benefits from './_components/Steps';
import Hero from './_components/Hero';

export default function Home() {
  return (
    <div className='max-h-full m-auto flex flex-col gap-y-10'>
      <Hero />
      <Benefits />
    </div>
  )
}
