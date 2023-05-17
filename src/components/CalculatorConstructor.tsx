import { Box, Container } from "@mui/material"
import SwitchSlider from "./SwitchSlider"
import Eye from "../../public/icons/Eye"
import Selector from "../../public/icons/Selector"
import SideBar from "./SideBar/SideBar"
import ConstructorCanvas from "./ConstructorCanvas"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useState } from "react"
import Display from "./CalculatorBlocks/Display"
import Operators from "./CalculatorBlocks/Operators"
import Numbers from "./CalculatorBlocks/Numbers"
import EqualButton from "./CalculatorBlocks/EqualButton"
import { TouchBackend } from "react-dnd-touch-backend"
import { useAppDispatch } from "../app/hooks"
import { resetAllData, setIsRuntime } from "../slicers/calculatorSlice"

const switchOptions = [
  { title: "Runtime", value: "runtime", icon: <Eye /> },
  { title: "Constructor", value: "constructor", icon: <Selector /> },
]

const draggableItems = [
  {
    id: "display",
    name: "display",
    item: <Display />,
    active: false,
    orderNumber: -1,
  },
  {
    id: "operators",
    name: "operators",
    item: <Operators />,
    active: false,
    orderNumber: 0,
  },
  {
    id: "numbers",
    name: "numbers",
    item: <Numbers />,
    active: false,
    orderNumber: 1,
  },
  {
    id: "equalbutton",
    name: "equalbutton",
    item: <EqualButton />,
    active: false,
    orderNumber: 2,
  },
]

export default function CalculatorConstructor() {
  const dispatch = useAppDispatch()
  const isMobile = window.innerWidth < 600
  const [blocks, setBlocks] = useState(draggableItems)
  const [swtichValue, setSwtichValue] = useState<string>("constructor")

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    setBlocks((prevState) => {
      return prevState.map((el) => ({
        ...el,
        orderNumber:
          dragIndex === el.orderNumber
            ? hoverIndex
            : el.orderNumber === hoverIndex
            ? dragIndex
            : el.orderNumber,
      }))
    })
  }

  return (
    <Container>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          justifyContent="flex-end"
          display="flex"
          width={538}
          id="switch-box"
        >
          <SwitchSlider
            id="switch"
            options={switchOptions}
            value={swtichValue}
            onChange={(value) => {
              if (
                value === "runtime" &&
                blocks.filter((el) => el.active).length < 4
              ) {
                alert(
                  "Вы не закончили построение калькулятора, пожалуйста, закончите до конца",
                )
              } else {
                dispatch(setIsRuntime(value === "runtime"))
                setSwtichValue(value)
              }
              dispatch(resetAllData())
            }}
          />
        </Box>
        <Box mt="30px" display="flex">
          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            {swtichValue !== "runtime" ? (
              <SideBar
                moveCardHandler={moveCardHandler}
                setBlocks={setBlocks}
                draggableItems={blocks}
              />
            ) : (
              <Box width={240} />
            )}
            <ConstructorCanvas
              isRuntime={swtichValue === "runtime"}
              moveCardHandler={moveCardHandler}
              setBlocks={setBlocks}
              activeBlocks={blocks.filter((el) => el.active)}
            />
          </DndProvider>
        </Box>
      </Box>
    </Container>
  )
}
