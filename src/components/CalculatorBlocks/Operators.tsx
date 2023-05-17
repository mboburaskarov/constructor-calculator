import { Box, Button } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  calculate,
  selectIsRuntime,
  setInputNumToZero,
  setOperator,
} from "../../slicers/calculatorSlice"

interface Props {}

const Operators: React.FC<Props> = () => {
  const dispatch = useAppDispatch()
  const isRuntime = useAppSelector(selectIsRuntime)

  const operatorsArr = [
    {
      value: "/",
      title: "/",
    },
    {
      value: "*",
      title: "x",
    },
    {
      value: "-",
      title: "-",
    },
    {
      value: "+",
      title: "+",
    },
  ]

  return (
    <Box maxWidth={232} display="flex" gap="8px">
      {operatorsArr.map((el, _) => (
        <Button
          key={el.title}
          sx={{ minWidth: "auto", width: 52, height: 48, padding: "auto" }}
          variant="outlined"
          color="secondary"
          onClick={() => {
            if (isRuntime) {
              dispatch(calculate())
              dispatch(setOperator(el.value))
              dispatch(setInputNumToZero())
            }
          }}
        >
          {el.title}
        </Button>
      ))}
    </Box>
  )
}

export default Operators
