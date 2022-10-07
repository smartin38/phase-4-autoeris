import { Hero, Button } from "react-daisyui"
import { React } from 'react'

function LandingHero() {
  return(
    <Hero className="bg-gray-900 text-white" id="home">
      <Hero.Overlay className="bg-opacity-10" />
      <Hero.Content className="text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold">Github, Begone</h1>
          <p className="py-6">
            Did you know that interacting with github directly is known to cause a 65% increase in blood pressure? Now you do! Don't become another victim of this terrible 
            epidemic. Eris is here now, and it's aaaall gonna be okay. 
          </p>
          <Button href="login" color="info">Get Started</Button>
          <br></br>
        </div>
        
        <img style={{left:"calc(50% + 80px)"}} src="/img/bg1.png" alt="Hero" className="object-cover h-96 rounded-xl mt-10" />

      </Hero.Content>
    </Hero>
  )
}

export default LandingHero;