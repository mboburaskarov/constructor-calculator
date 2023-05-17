import { createTheme } from "@mui/material/styles"

export let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5D5FEF",
      light: "#6B6A69",
      contrastText: "#EFF6FF",
    },
    secondary: {
      main: "#000000",
      light: "#E2E3E5",
      contrastText: "#E0E7EE",
    },
    grey: {
      100: "#1B191810",
      200: "#D9D9D9",
      300: "#999999",
      500: "#64748B",
      600: "#717171",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
        fixed: true,
        maxWidth: "xl",
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 6,
          border: "1px solid",
        },
      },
    },
  },
})

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          [theme.breakpoints.down("xl")]: {
            fontSize: 14,
            lineHeight: "16px",
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: 16,
            lineHeight: "20px",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: {
          [theme.breakpoints.down("xl")]: {
            padding: "0 16px",
            maxWidth: "100%",
          },
          [theme.breakpoints.up("xl")]: {
            maxWidth: "1024px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          [theme.breakpoints.down("xl")]: {
            fontSize: 14,
            lineHeight: "15px",
            padding: "24px 25px",
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: 14,
            lineHeight: "15px",
            padding: "24px 25px",
          },
        },
        sizeLarge: {
          [theme.breakpoints.down("xl")]: {
            fontSize: 16,
            lineHeight: "20px",
            padding: "20px 27px",
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: 24,
            lineHeight: "32px",
            padding: "28px 32px",
          },
        },

        containedPrimary: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        },
        containedSecondary: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        },

        outlinedSecondary: {
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.light,

          ":hover": {
            border: "1px solid",
            borderColor: theme.palette.primary.main,
            outline: "1px solid",
            outlineColor: theme.palette.primary.main,
            background: "none",
          },
        },
        outlinedPrimary: {
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,

          ":hover": {
            borderColor: theme.palette.secondary.main,
          },
        },
      },
    },
  },
})
