import { Box, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { selectCalculatorData } from "../../slicers/calculatorSlice"
import { useAppSelector } from "../../app/hooks"

interface Props {}

const Display: React.FC<Props> = () => {
  const calculatorData = useAppSelector(selectCalculatorData)
  const { calculatedNum, inputNum } = calculatorData
  const [monitor, setMonitor] = useState<number>(0)

  useEffect(() => {
    setMonitor(inputNum)
  }, [inputNum])

  useEffect(() => {
    setMonitor(calculatedNum)
  }, [calculatedNum])
  console.log("calculatorData", calculatorData)
  return (
    <Box
      sx={{
        background: "#F3F4F6",
        padding: "4px 8px",
        borderRadius: "6px",
        display: "flex",
        alignItems: "flex-end",
        width: 232,
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: Number.isNaN(monitor) ? "24px" : "36px",
          lineHeight: "44px",
          color: "#111827",
          textAlign: "right",
          width: "100%",
        }}
      >
        {Number.isNaN(monitor) ? "Не определено" : monitor || 0}
      </Typography>
    </Box>
  )
}

export default Display
