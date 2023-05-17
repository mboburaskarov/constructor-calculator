import { Box } from "@mui/material"
import SideBarItemWrapper from "./SideBarItemWrapper"

interface DraggableItems {
  id: string
  name: string
  item: JSX.Element
  active: Boolean
}

interface Props {
  draggableItems: DraggableItems[]
  setBlocks: (data: any) => void
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void
}

const SideBar: React.FC<Props> = ({
  draggableItems,
  setBlocks,
  moveCardHandler,
}) => {
  return (
    <Box flexDirection="column" display="flex" gap="12px">
      {draggableItems.map((el, ind) => (
        <SideBarItemWrapper
          moveCardHandler={moveCardHandler}
          setBlocks={setBlocks}
          name={el.name}
          key={el.id}
          active={el.active}
          index={ind}
        >
          {el.item}
        </SideBarItemWrapper>
      ))}
    </Box>
  )
}

export default SideBar
