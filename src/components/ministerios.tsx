import Image from 'next/image'
import Link from 'next/link'
import { Card } from './ui/card'

interface Ministerio {
  id: number
  title: string
  description: string
  image: string
  link: string
}
const ministeriosList: Ministerio[] = [
  {
    id: 1,
    title: 'Alabanza',
    description: 'Descripción del ministerio de alabanza',
    image: '/images/ministerios/alabanza.jpg',
    link: '/ministerios/jovenes'
  },
  {
    id: 2,
    title: 'Jóvenes - Linaje',
    description: 'Descripción del ministerio de jóvenes',
    image: '/images/ministerios/alabanza.jpg',
    link: '/ministerios/jovenes'
  },
  {
    id: 3,
    title: 'Niños - Patrulla del Rey',
    description: 'Descripción del ministerio de niños',
    image: '/images/ministerios/alabanza.jpg',
    link: '/ministerios/jovenes'
  },
  {
    id: 4,
    title: 'Damas',
    description: 'Descripción del ministerio de damas',
    image: '/images/ministerios/alabanza.jpg',
    link: '/ministerios/jovenes'
  },
  {
    id: 5,
    title: 'Caballeros',
    description: 'Descripción del ministerio de caballeros',
    image: '/images/ministerios/alabanza.jpg',
    link: '/ministerios/jovenes'
  },
  {
    id: 6,
    title: 'Linaje Teens - Adolecentes',
    description: 'Descripción del ministerio de adolecentes',
    image: '/images/ministerios/alabanza.jpg',
    link: '/ministerios/jovenes'
  },
  {
    id: 7,
    title: 'Escuela Dominical',
    description: 'Descripción de la escuela bíblica',
    image: '/images/ministerios/alabanza.jpg',
    link: '/ministerios/jovenes'
  },
  {
    id: 8,
    title: 'Diaconado',
    description: 'Descripción del ministerio de diaconado',
    image: '/images/ministerios/alabanza.jpg',
    link: '/ministerios/jovenes'
  }, 
  {
    id: 9,
    title: 'Protocolo',
    description: 'Descripción del ministerio de misiones',
    image: '/images/ministerios/alabanza.jpg',
    link: '/ministerios/jovenes'
  }
]

const Ministerios = () => {
  return (
    <section className='py-8 bg-gray-50 px-4 lg:px-0'>
      <div className='container mx-auto'>
        <h2 className='text-4xl text-center mb-8'>Ministerios</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {ministeriosList.map(ministerio => (
            <Card key={ministerio.id} className='p-0 pb-4 gap-4 max-w-lg'>
              <Image src={ministerio.image} alt={ministerio.title} className='object-contain rounded-t-xl mx-auto' width={400} height={400} />
              <h3 className='text-2xl text-center px-4'>{ministerio.title}</h3>
              <p className='text-center px-4'>{ministerio.description}</p>
              <Link href={ministerio.link} className='text-blue-600 hover:underline mx-auto'>Ver más</Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Ministerios