import React from 'react'
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky } from "../models";


const Home = () => {

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

   const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition, rotation;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
      rotation = [0.1,4.7,0];
      
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition, rotation];

    const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  };


  return (
    <section w-full h-screen relative>

      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
          {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
         camera={{near: 0.1, far: 1000}}> 
          <Suspense fallback={<Loader/>}>
            <directionalLight position={[1,1,1]} intensity={2}/>
            <ambientLight intensity={0.5}/>
            <pointLight position={[10, 5, 10]} intensity={2} />
            <hemisphereLight  
              skyColor='#b1e1ff'
              groundColor='#000000'
              intensity={1}
            />
            <Sky isRotating={isRotating}/>
            <Island 
              position={islandPosition}
              scale={islandScale}
              rotation={islandRotation}
            />

          </Suspense>
      </Canvas>
         
    </section>
  )
}

export default Home