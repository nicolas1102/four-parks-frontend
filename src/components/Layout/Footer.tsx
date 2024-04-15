export const FOOTER = 'FOUR PARKS, DONDE TU VEHÍCULO SIEMPRE ESTARÁ SEGURO.'

const Footer = async () => {
  return (
    <div className='flex flex-col inset-x-0 items-center justify-center w-full border bg-yellow-300 absolute bottom-0'>
      <div className='w-full text-center p-1'>
        <p className=' text-sm font-normal text-black tracking-widest'>
          {FOOTER}
        </p>
      </div>
    </div>
  )
}

export default Footer
