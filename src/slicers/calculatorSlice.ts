import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface CalculatorState {
  inputNum: number
  calculatedNum: number
  operator: string
  decimal: boolean
  decimalCount: number
  isRuntime: boolean
}

const initialState: CalculatorState = {
  inputNum: 0,
  operator: "",
  calculatedNum: 0,
  decimal: false,
  decimalCount: 1,
  isRuntime: false,
}

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setInputNum: (state, action: PayloadAction<number>) => {
      state.inputNum = state.inputNum * 10 + action.payload
    },
    setCalculatedNum: (state, action: PayloadAction<number>) => {
      state.calculatedNum = action.payload
    },
    setDecimal: (state, action: PayloadAction<boolean>) => {
      state.decimal = action.payload
    },
    inputNumTotal: (state, action: PayloadAction<number>) => {
      if (state.decimal) {
        action.payload = action.payload / Math.pow(10, state.decimalCount)
        state.decimalCount = state.decimalCount + 1
        state.inputNum = parseFloat(
          (state.inputNum + action.payload).toFixed(state.decimalCount),
        )
      } else {
        state.inputNum = state.inputNum * 10 + action.payload
      }
    },
    setOperator: (state, action: PayloadAction<string>) => {
      state.operator = action.payload
    },
    calculate: (state) => {
      state.decimal = false
      state.decimalCount = 1
      if (state.operator === "/" && state.inputNum === 0) {
        state.calculatedNum = NaN
        state.inputNum = 0

        return
      }
      if (state.calculatedNum === 0 && state.inputNum === 0) {
        return
      }

      switch (state.operator) {
        case "+":
          state.calculatedNum = state.calculatedNum + state.inputNum
          break
        case "/":
          state.calculatedNum = state.calculatedNum / state.inputNum
          break
        case "*":
          state.calculatedNum = state.calculatedNum * state.inputNum
          break
        case "-":
          state.calculatedNum = state.calculatedNum - state.inputNum
          break
      }
      if (state.operator === "") state.calculatedNum = state.inputNum
      else state.inputNum = 0
    },
    setInputNumToZero: (state) => {
      state.inputNum = 0
    },
    resetAllData: (state) => {
      state.inputNum = 0
      state.operator = ""
      state.calculatedNum = 0
      state.decimal = false
      state.decimalCount = 1
    },
    setIsRuntime: (state, action: PayloadAction<boolean>) => {
      state.isRuntime = action.payload
    },
  },
})

export const {
  setInputNum,
  setOperator,
  setInputNumToZero,
  setCalculatedNum,
  calculate,
  inputNumTotal,
  setDecimal,
  setIsRuntime,
  resetAllData,
} = calculatorSlice.actions

export const selectCalculatorData = (state: RootState) => state.calculator
export const selectIsRuntime = (state: RootState) => state.calculator.isRuntime

export default calculatorSlice.reducer
