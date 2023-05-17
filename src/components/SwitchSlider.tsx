import React from "react"
import { Box, Typography } from "@mui/material"

interface Options {
  title: string
  value: any
  icon?: JSX.Element
}

interface Props {
  id: string
  options?: Options[]
  value?: any
  onChange: (value: any) => void
}

const SwitchSlider: React.FC<Props> = ({
  id,
  options = [],
  value,
  onChange,
}) => {
  return (
    <Box
      sx={{
        background: "#F3F4F6",
        padding: "1px",
        borderRadius: "6px",
        display: "inline-flex",
      }}
    >
      {options.map((option, index) => {
        const checked = value === option.value
        return (
          <Box
            key={option.value}
            sx={{
              background: checked ? "#FFFFFF" : "transparent",
              borderRadius: "5px",
              border: checked ? "1px solid" : "1px solid",
              borderColor: checked ? "#E2E3E5" : "transparent",
              transition: "all 0.2s ease",

              "& > input": {
                display: "none",
              },
              "& > label": {
                height: "100%",
                padding: "10.5px 12px",
                cursor: "pointer",
                display: "inline-flex",
              },
            }}
          >
            <input
              type="radio"
              id={id + index}
              name={id + index}
              value={option.value}
              onChange={() => onChange(option.value)}
              checked={checked}
            />
            <label htmlFor={id + index}>
              <Box
                sx={{ cursor: "pointer" }}
                display="inline-flex"
                alignItems="center"
              >
                {option.icon && (
                  <Box
                    sx={{
                      path: {
                        stroke: checked ? "#5D5FEF" : "#4D5562",
                      },
                    }}
                    display="inline-flex"
                    mr={1}
                  >
                    {option.icon}
                  </Box>
                )}
                <Typography
                  fontWeight={500}
                  fontSize="14px"
                  lineHeight="15px"
                  color="#4D5562"
                  id={value + index}
                >
                  {option.title}
                </Typography>
              </Box>
            </label>
          </Box>
        )
      })}
    </Box>
  )
}

export default SwitchSlider
