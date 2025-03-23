import HeroMain from '@/components/hero'
import Horarios from '@/components/horarios'
import Ministerios from '@/components/ministerios'

const PageIndex = () => {
  return (
    <>
      <HeroMain />
      <div className='mx-auto py-8 bg-gray-300'>
        <Horarios />
        <Ministerios />
      </div>
    </>
  )
}

export default PageIndex