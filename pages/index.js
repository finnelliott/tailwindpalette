import Image from "next/image";
import Red from "../public/wheel/Red.png"
import Orange from "../public/wheel/Orange.png"
import Yellow from "../public/wheel/Yellow.png"
import Lime from "../public/wheel/Lime.png"
import Green from "../public/wheel/Green.png"
import Teal from "../public/wheel/Teal.png"
import Cyan from "../public/wheel/Cyan.png"
import Sky from "../public/wheel/Sky.png"
import Blue from "../public/wheel/Blue.png"
import Purple from "../public/wheel/Purple.png"
import Pink from "../public/wheel/Pink.png"
import Rose from "../public/wheel/Rose.png"
import { useState } from "react";
import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon } from '@heroicons/react/20/solid'


const wheel = [Red, Orange, Yellow, Lime, Green, Teal, Cyan, Sky, Blue, Purple, Pink, Rose]

const pairings = {
  monochrome: [true, false, false, false, false, false, false, false, false, false, false, false],
  analogous: [true, true, true, false, false, false, false, false, false, false, false, false],
  complimentary: [true, false, false, false, false, false, true, false, false, false, false, false],
  triadic: [true, false, false, false, true, false, false, false, true, false, false, false],
  split_complementary: [true, true, false, false, false, false, true, true, false, false, false, false],
  tetriadic: [true, false, true, false, false, false, true, false, true, false, false, false]
}

const images = {
  "Red": Red, "Orange": Orange, "Yellow": Yellow, "Lime": Lime, "Green": Green, "Teal": Teal, "Cyan": Cyan, "Sky": Sky, "Blue": Blue, "Purple": Purple, "Pink": Pink, "Rose": Rose
}

function ClipboardButton({ type, primary }) {
  const [ copied, setCopied ] = useState(false)

  const copyConfigToClipboard = (type) => {
    setCopied(true)
    let index = []
    for (let i = 0; i < pairings[type].length; i++) {
      if (pairings[type][i]) {
        index.push(i)
      }
    }
    if (index.length > 3) {
      index = [index[0], index[2], index[1], index[3]]
    }
    const currentPaletteOrder = Object.keys(images).slice(Object.keys(images).indexOf(primary)).concat(Object.keys(images).slice(0, Object.keys(images).indexOf(primary)))
    const primaryColor = currentPaletteOrder[index[0]]?.toLowerCase()
    const secondaryColor = currentPaletteOrder[index[1]]?.toLowerCase() || null
    const tertiaryColor = currentPaletteOrder[index[2]]?.toLowerCase() || null
    const quaternaryColor = currentPaletteOrder[index[3]]?.toLowerCase() || null

    let config = `const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.slate,
        primary: colors.${String(primaryColor)}${secondaryColor ? `,\n        secondary: colors.${String(secondaryColor)}`:""}${tertiaryColor ? `,\n        tertiary: colors.${String(tertiaryColor)}`:""}${quaternaryColor ? `,\n        quaternary: colors.${String(quaternaryColor)}`:""}
      },
    },
  }  
}`
    const el = document.createElement('textarea');
    el.value = config
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    let timeout;
    timeout = setTimeout(revertIcon, 3000);
    function revertIcon() {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      className="block h-full rounded-r-md border-l border-gray-800 bg-transparent px-3 py-2 ml-4 text-sm font-medium text-gray-700 hover:bg-gray-900 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
      onClick={() => {copyConfigToClipboard(type);}}
    >
      {copied ?
      <ClipboardDocumentCheckIcon className="-ml-1 -mr-1 h-4 w-4 text-gray-50" aria-hidden="true" /> :
      <ClipboardDocumentIcon className="-ml-1 -mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
      }
    </button>
  )
}


export default function Home() {

  const [ primary, setPrimary ] = useState("Red")

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
          Select the primary color for your palette
        </label>
        <select
          id="primary"
          name="primary"
          className="mt-1 block w-full rounded-md border-gray-200 border py-2 pl-3 pr-10 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm bg-black text-gray-200"
          value={primary} 
          onChange={(e) => setPrimary(e.target.value)}
        >
          {Object.keys(images).map((color, index) => (
            <option key={index}>{color}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-16 max-w-3xl mx-auto">
      {Object.keys(pairings).map((type, index) => (
        <div key={index} className="w-full max-w-xs mx-auto">
          <div className="w-full flex flex-col place-items-center">
            <div className="isolate flex justify-between place-items-center rounded-md shadow-sm mb-8 mx-auto border border-gray-800 w-full items-stretch">
              <div className="text-gray-400 w-full text-left uppercase text-xs font-semibold py-2 px-3 h-12 flex place-items-center">{type.replace("_", " ")}</div>
              <div>
                <ClipboardButton type={type} primary={primary} />
              </div>
            </div>
          </div>
          <div className="relative aspect-square">
            {wheel.map((color, index) => (
              <Image key={index} src={color} layout="fill" objectFit="contain" className={pairings[type][wheel.slice(Object.keys(images).indexOf(primary)).concat(wheel.slice(0, Object.keys(images).indexOf(primary))).indexOf(color)] ? "opacity-100" : "opacity-20"} />
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}