import { Button } from "@mui/material"
import React from "react"
import { useAppDispatch } from "../../app/hooks"
import { calculate, setOperator } from "../../slicers/calculatorSlice"

interface Props {}

const EqualButton: React.FC<Props> = () => {
  const dispatch = useAppDispatch()

  return (
    <Button
      onClick={() => {
        dispatch(calculate())
        dispatch(setOperator(""))
      }}
      key="equal-btn"
      sx={{ width: 232, height: 64 }}
      color="primary"
    >
      =
    </Button>
  )
}
export default EqualButton
