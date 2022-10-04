import Image from "next/image";
import Red from "../public/wheel/Red.png"
import Orange from "../public/wheel/Orange.png"
import Yellow from "../public/wheel/Yellow.png"
import Green from "../public/wheel/Green.png"
import Teal from "../public/wheel/Teal.png"
import Cyan from "../public/wheel/Cyan.png"
import LightBlue from "../public/wheel/LightBlue.png"
import Blue from "../public/wheel/Blue.png"
import Indigo from "../public/wheel/Indigo.png"
import Purple from "../public/wheel/Purple.png"
import Pink from "../public/wheel/Pink.png"
import Rose from "../public/wheel/Rose.png"
import { useState } from "react";

export default function Home() {
  const wheel = [Red, Orange, Yellow, Green, Teal, Cyan, LightBlue, Blue, Indigo, Purple, Pink, Rose]

  const [ primary, setPrimary ] = useState("Red")

  const pairings = {
    monochrome: [true, false, false, false, false, false, false, false, false, false, false, false],
    analogous: [true, true, true, false, false, false, false, false, false, false, false, false],
    complimentary: [true, false, false, false, false, false, true, false, false, false, false, false],
    triadic: [true, false, false, false, true, false, false, false, true, false, false, false],
    split_complementary: [true, true, false, false, false, false, true, true, false, false, false, false],
    tetriadic: [true, false, true, false, false, false, true, false, true, false, false, false]
  }

  const images = {
    "Red": Red, "Orange": Orange, "Yellow": Yellow, "Green": Green, "Teal": Teal, "Cyan": Cyan, "LightBlue": LightBlue, "Blue": Blue, "Indigo": Indigo, "Purple": Purple, "Pink": Pink, "Rose": Rose
  }

  
  return (
    <div className="w-screen min-h-screen bg-black py-24 px-8">
      <div className="">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-50 sm:text-5xl lg:text-6xl">
              Tailwind Palette Pairings
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-200">
              Color theory helps to ensure palettes are visually harmonious. Select a primary color to see what colors it pairs well with. Using only <a className="text-gray-400 hover:underline" href="https://tailwindcss.com/docs/customizing-colors" target="_blank" rel="noopener noreferrer">TailwindCSS colors</a>.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-xs pb-16 mx-auto">
        <label htmlFor="primary" className="block text-sm font-medium text-gray-200 text-center w-full mb-4">
          Primary
        </label>
        <select
          id="primary"
          name="primary"
          className="mt-1 block w-full rounded-md border-gray-200 border py-2 pl-3 pr-10 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm bg-black text-gray-200"
          value={primary} 
          onChange={(e) => setPrimary(e.target.value)}
        >
          {Object.keys(images).map((color) => (
            <option>{color}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-16 max-w-3xl mx-auto">
      {Object.keys(pairings).map((key) => (
        <div className="w-full max-w-xs mx-auto">
          <div className="text-gray-400 w-full text-center uppercase text-xs font-semibold pb-8">{key.replace("_", " ")}</div>
          <div className="relative aspect-square">
            {wheel.map((color) => (
              <Image src={color} layout="fill" objectFit="contain" className={pairings[key][wheel.slice(Object.keys(images).indexOf(primary)).concat(wheel.slice(0, Object.keys(images).indexOf(primary))).indexOf(color)] ? "opacity-100" : "opacity-20"} />
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}