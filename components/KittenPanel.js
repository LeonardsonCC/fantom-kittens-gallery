import React, { useEffect, useState, useCallback } from "react"
import { kittensDict } from '../utils/fantomKittensDict'
import KittenCanvas from "./KittenCanvas"

const KITTEN_SIZE = 512
const MAX_COLUMNS = 21
const MAX_ROWS = 20
const WORLD_WIDTH = KITTEN_SIZE * MAX_COLUMNS
const WORLD_HEIGHT = KITTEN_SIZE * MAX_ROWS

const initialConfig = { offsetX: 0, offsetY: 0, scale: 0.1 }

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const clampOffset = (newOffset, worldDimmension, canvasDimmension) => clamp(newOffset, canvasDimmension - worldDimmension, 0)

export default function KittenPanel() {
  const [kittens, setKittens] = useState([])
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [kittenSelected, setKittenSelected] = useState(null)
  const [{ offsetX, offsetY, scale }, setConfig] = useState(initialConfig)

  async function loadImages() {
    const imagePromises = Object.values(kittensDict)
      .map(image => `https://kittens.fakeworms.studio/assets/${image}`)
      .map(src => {
        return new Promise((res, rej) => {
          const image = new Image()
          image.src = src
    
          image.addEventListener('load', () => res({ image }))
        })
      })

    const images = await Promise.all(imagePromises)
    setKittens(images)
  }

  useEffect(() => {
    loadImages()
  }, [])

  const setNewConfig = useCallback(
    (deltaOffsetX, deltaOffsetY, deltaScale) =>
      setConfig(({ offsetX, offsetY, scale }) => ({
        offsetX: clampOffset(offsetX + deltaOffsetX, WORLD_WIDTH * scale, canvasSize.width),
        offsetY: clampOffset(offsetY + deltaOffsetY, WORLD_HEIGHT * scale, canvasSize.height),
        scale: clamp(scale + deltaScale, 0.1, 0.6)
      })),
    [canvasSize])

  const onPanelMoved = useCallback(({ moveX, moveY }) => setNewConfig(moveX * 1.1, moveY * 1.1, 0), [setNewConfig])
  
  const onZoomIn = useCallback(() => setNewConfig(0, 0, 0.1), [setNewConfig])

  const onZoomOut = useCallback(() => setNewConfig(0, 0, -0.1), [setNewConfig])

  const onCanvasSizeChanged = useCallback(size => {
    setCanvasSize(size);
    setNewConfig(0, 0, 0)
  }, [setNewConfig])

  return (
    <div style={{ width: '100%' }}>
      <button className="nes-btn" onClick={onZoomIn}>+</button>
      <button className="nes-btn" onClick={onZoomOut}>-</button>
      <button className="nes-btn" onClick={() => setConfig(initialConfig)}>Reset</button>

      <div className="overflow-hidden">
        <div className="relative">
          {kittenSelected != null ? 
            <a
              className="nes-btn is-primary block absolute text-xs"
              style={{
                left: kittenSelected.x * KITTEN_SIZE * scale + offsetX + (KITTEN_SIZE * scale)/2,
                top: kittenSelected.y * KITTEN_SIZE * scale + offsetY + KITTEN_SIZE * scale,
                transform: 'translate(-50%)',
              }}
              href={`https://paintswap.finance/marketplace/assets/0xfd211f3b016a75bc8d73550ac5adc2f1cae780c0/${kittenSelected.id}`}
              target="_blank"
              rel="noreferrer"
            >
              See Kitten #{kittenSelected.id}
            </a>
            : null
          }
          <KittenCanvas
            style={{ width: '100%', height: KITTEN_SIZE * 0.1 * 8 }}
            width={canvasSize.width}
            height={canvasSize.height}
            kittens={kittens}
            offsetX={offsetX}
            offsetY={offsetY}
            scale={scale}
            kittenSize={KITTEN_SIZE}
            maxColumns={MAX_COLUMNS}
            maxRows={MAX_ROWS}
            onKittenClicked={setKittenSelected}
            onPanelMoved={onPanelMoved}
            onCanvasSizeChanged={onCanvasSizeChanged}
          />
        </div>
      </div>
    </div>
  )
}