import React, { useRef, useEffect } from "react"

export default function KittenCanvas({
  kittens,
  offsetX,
  offsetY,
  scale,
  kittenSize,
  maxColumns,
  maxRows,
  onKittenClicked,
  onPanelMoved,
  onCanvasSizeChanged,
  width,
  height,
  clickThreshold = 150,
  ...props
}) {
  /** @type {React.MutableRefObject<HTMLCanvasElement>} */
  const canvasRef = useRef(null)
  const mouseStateRef = useRef()

  const onMouseDown = e => {
    mouseStateRef.current = 'pending'

    setTimeout(() => {
      if(mouseStateRef.current === 'up') {
        mouseStateRef.current = 'click'
        onMouseClick(e)
      } else {
        mouseStateRef.current = 'hold'
      }
    }, clickThreshold)
  }

  const onMouseClick = e => {
    const { left, top } = canvasRef.current.getBoundingClientRect()

    const x = Math.floor(((e.clientX - left - offsetX) / scale) / kittenSize)
    const y = Math.floor(((e.clientY - top - offsetY) / scale) / kittenSize)
    const id = y * maxColumns + x

    onKittenClicked({ id, x, y })
  }

  const onMouseUp = () => {
    mouseStateRef.current = 'up'
  }

  const onMouseMove = e => {
    if(mouseStateRef.current !== 'hold')
      return

    onPanelMoved({
      moveX: e.movementX,
      moveY: e.movementY
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext("2d")
    
    context.fillStyle = 'white'
    context.clearRect(0, 0, width, height)
    
    const scaledKittenSize = kittenSize * scale

    kittens.forEach((kitten, index) => {
      const column = index % maxColumns
      const row = Math.floor(index / maxColumns)

      let x = offsetX + column * scaledKittenSize
      let y = offsetY + row * scaledKittenSize
      context.drawImage(kitten.image, x, y, scaledKittenSize, scaledKittenSize)
    })
  }, [kittens, offsetX, offsetY, scale, width, height])

  useEffect(() => {
    const observer = new ResizeObserver(() =>
      onCanvasSizeChanged({
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight
      })
    )

    observer.observe(canvasRef.current)

    return () => observer.disconnect()
  }, [onCanvasSizeChanged])

  return (
    <canvas
      {...props}
      ref={canvasRef}

      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}

      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseOut={onMouseUp}
      onTouchEnd={onMouseUp}
      onTouchCancel={onMouseUp}

      onMouseMove={onMouseMove}

    >
    </canvas>
  )
}