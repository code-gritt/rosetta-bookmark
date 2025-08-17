import { AppBar, Toolbar, Box } from "@mui/material";

export default function Header({ children }) {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to bottom, #061212, #0e2e2e)",
        py: { xs: 1, sm: 2 },
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 2,
        }}
      >
        <Box width="100%">{children}</Box>
      </Toolbar>
    </AppBar>
  );
}
