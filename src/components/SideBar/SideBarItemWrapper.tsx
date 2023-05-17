import { Box } from "@mui/material"
import React, { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"

interface Props {
  children: JSX.Element
  name: string
  setBlocks: (data: any) => void
  active: Boolean
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void
  index: number
  fromConstructor?: Boolean
  isRuntime?: Boolean
}

const SideBarItemWrapper: React.FC<Props> = ({
  name,
  children,
  setBlocks,
  moveCardHandler,
  active,
  index,
  fromConstructor = false,
  isRuntime = false,
}) => {
  const ref = useRef<HTMLInputElement>(null)

  const [, drop] = useDrop({
    accept: "calculator-blocks",
    hover(item: any, monitor: any) {
      if (!fromConstructor) {
        return
      }
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCardHandler(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { index, name },
    type: "calculator-blocks",
    canDrag: !(name === "display" && fromConstructor),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()

      if (dropResult) {
        setBlocks((prevState: any) => {
          return prevState.map((e: any) => {
            return {
              ...e,
              active: e.name === name ? true : e.active,
            }
          })
        })
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <>
      <Box
        ref={ref}
        sx={{
          position: "relative",
          opacity: fromConstructor || !(isDragging || active) ? 1 : 0.5,
          boxShadow: active
            ? "none"
            : "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "4px",
          background: "white",
          cursor:
            (active && !fromConstructor) ||
            (name === "display" && fromConstructor)
              ? "not-allowed"
              : "move",
          userSelect: "none",
          padding: 0.5,
          button: {
            "&:hover": {
              borderColor: isRuntime ? "#5D5FEF" : "#E2E3E5",
              outlineColor: isRuntime ? "#5D5FEF !important" : "#E2E3E5",

              outline: isRuntime ? "1px solid" : "none",
            },
            cursor: isRuntime
              ? "pointer"
              : active && !fromConstructor
              ? "not-allowed"
              : "move",
          },
        }}
        onMouseDown={(e) => active && !fromConstructor && e.preventDefault()}
        onDoubleClick={() => {
          !isRuntime &&
            setBlocks((prevState: any) => {
              return prevState.map((e: any) => {
                return {
                  ...e,
                  active: e.name === name ? false : e.active,
                }
              })
            })
        }}
      >
        {children}
        {isDragging && fromConstructor && (
          <Box sx={{ position: "absolute", right: "-4px", top: "-18px" }}>
            <svg
              width="250"
              height="6"
              viewBox="0 0 250 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.113249 3L3 5.88675L5.88675 3L3 0.113249L0.113249 3ZM249.887 3L247 0.113249L244.113 3L247 5.88675L249.887 3ZM3 3.5H247V2.5H3V3.5Z"
                fill="#5D5FEF"
              />
            </svg>
          </Box>
        )}
      </Box>
    </>
  )
}

export default SideBarItemWrapper
