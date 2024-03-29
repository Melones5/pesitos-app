import React from 'react'
import Header from './sections/Header'
import Main from './sections/Main'
import Footer from './sections/Footer'

const Home = () => {
  return (
    <div>
      <section>
        <Header />
      </section>
      <section className='min-h-screen'>
        <Main />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default Home