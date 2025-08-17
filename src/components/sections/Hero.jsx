import HeroGraphic from "../../assets/graphics/HeroGraphic.webp";
import { useModalContext } from "../../contexts/ModalContext";
import { Box, Typography, Button, Stack } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function Hero() {
  const { setActiveModal } = useModalContext();

  return (
    <Box
      sx={{
        maxWidth: "90rem",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
        py: { xs: 6, sm: 8, md: 12 },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "5fr 4fr" },
        gap: { xs: 6, md: 12, lg: 18 },
        alignItems: "center",
      }}
    >
      {/* Text Section */}
      <Box>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: "primary.contrastText",
            mb: { xs: 4, md: 6 },
            fontWeight: 600,
            lineHeight: 1.2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.75rem" },
            letterSpacing: "-1px",
          }}
        >
          Save, Organize & Find Anything Instantly with Rosetta
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#ffffff",
            mb: { xs: 4, md: 10 },
            fontWeight: 300,
            fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
            lineHeight: 1.6,
          }}
        >
          A smarter way to manage bookmarks, code snippets, and notes.
          <br />
          Auto-tagging, cross-device sync, and lightning-fast search—all in one
          private hub.
        </Typography>
        <Button
          variant="contained"
          onClick={() => setActiveModal("sign-up")}
          endIcon={<ArrowRightIcon />}
          sx={{
            bgcolor: "#36B7B9", // fixed button color
            color: "primary.contrastText",
            borderRadius: "9999px",
            px: { xs: 3, md: 5 }, // compact horizontal padding
            py: { xs: 1, md: 2 }, // compact vertical padding
            fontSize: { xs: "0.75rem", md: "1rem" },
            textTransform: "none",
            "&:hover": {
              bgcolor: "#36B7B9", // hover keeps the same color
              opacity: 0.9, // subtle hover effect
            },
          }}
        >
          Start Free
        </Button>
      </Box>

      {/* Graphic Section */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            borderRadius: "50%",
            filter: "blur(3rem)",
          }}
        />
        <Box
          component="img"
          src={HeroGraphic}
          alt="Hero graphic of Rosetta showing bookmarks, snippets, and notes organized"
          sx={{
            position: "relative",
            maxHeight: { xs: "auto", md: "30rem" },
            maxWidth: { xs: "90%", md: "100%" },
          }}
        />
      </Box>
    </Box>
  );
}
