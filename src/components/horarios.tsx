import React from 'react'
import { Card } from './ui/card'

const Horarios = () => {
  return (
    <section className='pb-8'>
      <h2 className='text-4xl text-center mb-8'>Horarios de Reuniones</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 text-center max-w-6xl mx-auto'>
        <Card className='p-4'>
          <h3 className='text-2xl mb-4'>Domingos</h3>
          <p><span className='font-semibold'>08h00</span> Primer Culto</p>
          <p><span className='font-semibold'>09h45</span> Segundo Culto</p>
          <p><span className='font-semibold'>11h30</span> Tercer Culto</p>
        </Card>

        <Card className='p-4'>
          <h3 className='text-2xl mb-4'>Lunes</h3>
          <p><span className='font-semibold'>14h30</span> Reunión de Damas</p>
          <p><span className='font-semibold'>19h30</span> Reunión de Caballeros</p>
        </Card>

        <Card className='p-4'>
          <h3 className='text-2xl mb-4'>Miércoles y Viernes</h3>
          <p><span className='font-semibold'>19h00</span> Alabanza y Enseñanza</p>
        </Card>

        <Card className='p-4'>
          <h3 className='text-2xl mb-4'>Sábados</h3>
          <p><span className='font-semibold'>10h00</span> Reunión de Niños</p>
          <p><span className='font-semibold'>14h00</span> Reunión de Adolecentes</p>
          <p><span className='font-semibold'>16h30</span> Reunión de Jóvenes</p>
        </Card>
      </div>
    </section>
  )
}

export default Horarios