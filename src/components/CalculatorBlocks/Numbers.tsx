import { Box, Button } from "@mui/material"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  setDecimal,
  inputNumTotal,
  selectIsRuntime,
} from "../../slicers/calculatorSlice"

interface Props {}

const Numbers: React.FC<Props> = () => {
  const dispatch = useAppDispatch()
  const isRuntime = useAppSelector(selectIsRuntime)

  const numbersArr = [
    {
      value: 7,
      title: "7",
    },
    {
      value: 8,
      title: "8",
    },
    {
      value: 9,
      title: "9",
    },
    {
      value: 4,
      title: "4",
    },
    {
      value: 5,
      title: "5",
    },
    {
      value: 6,
      title: "6",
    },
    {
      value: 3,
      title: "3",
    },
    {
      value: 2,
      title: "2",
    },
    {
      value: 1,
      title: "1",
    },
    {
      value: 0,
      title: "0",
    },
    {
      value: "decimal",
      title: ",",
    },
  ]
  console.log("isRuntime", isRuntime)
  return (
    <Box maxWidth={232} flexWrap="wrap" display="flex" gap="8px">
      {numbersArr.map((el, _) => (
        <Button
          key={el.title}
          sx={{ width: el.title === "0" ? 152 : 72, height: 48 }}
          variant="outlined"
          color="secondary"
          onClick={() => {
            if (isRuntime) {
              el.value === "decimal"
                ? dispatch(setDecimal(true))
                : dispatch(inputNumTotal(Number(el.value)))
            }
          }}
        >
          {el.title}
        </Button>
      ))}
    </Box>
  )
}

export default Numbers
