import { Box, Typography } from "@mui/material"
import DragAndDropIcon from "../../public/icons/DragAndDrop"
import { useDrop } from "react-dnd"
import SideBarItemWrapper from "./SideBar/SideBarItemWrapper"
import Display from "./CalculatorBlocks/Display"

interface activeBlocks {
  id: string
  name: string
  item: JSX.Element
  active: Boolean
  orderNumber: number
}

interface Props {
  activeBlocks: [] | activeBlocks[]
  setBlocks: (data: any) => void
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void
  isRuntime: boolean
}

const ConstructorCanvas: React.FC<Props> = ({
  activeBlocks = [],
  moveCardHandler,
  setBlocks,
  isRuntime,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "calculator-blocks",
    drop: () => ({ name: "Calculator blocks" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const displayBlock = activeBlocks.find((el) => el.name === "display")

  return (
    <Box
      ref={drop}
      width={243}
      sx={{
        ml: "56px",
        border: activeBlocks.length > 0 ? "none" : "2px dashed #C4C4C4",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: activeBlocks.length > 0 ? "flex-start" : "center",
        backgroundColor:
          isOver && canDrop && activeBlocks.length === 0
            ? "#F0F9FF"
            : "transparent",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {!!displayBlock && (
        <SideBarItemWrapper
          moveCardHandler={moveCardHandler}
          setBlocks={setBlocks}
          name={displayBlock.name}
          key={displayBlock.id}
          active={displayBlock.active}
          index={0}
          fromConstructor={true}
        >
          <Display />
        </SideBarItemWrapper>
      )}
      {activeBlocks.length > 0 ? (
        activeBlocks
          .filter((el) => el.name !== "display")
          .sort((a, b) => a.orderNumber - b.orderNumber)
          .map((el, ind) => (
            <SideBarItemWrapper
              moveCardHandler={moveCardHandler}
              setBlocks={setBlocks}
              name={el.name}
              key={el.id}
              active={el.active}
              index={ind}
              fromConstructor={true}
              isRuntime={isRuntime}
            >
              {el.item}
            </SideBarItemWrapper>
          ))
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <DragAndDropIcon />
          <Typography
            sx={{ fontWeight: 500, lineHeight: "17px", color: "#5D5FEF" }}
            mt={1.5}
          >
            Перетащите сюда
          </Typography>
          <Typography
            mt={0.5}
            sx={{
              fontWeight: 400,
              fontSize: "12px",
              lineHight: "15px",
              color: "#6B7280",
              textAlign: "center",
            }}
          >
            любой элемент <br /> из левой панели
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default ConstructorCanvas
