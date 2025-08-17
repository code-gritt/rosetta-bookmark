import { Box, Stack, Typography, Avatar } from "@mui/material";
import { reviews } from "../../utils/content";

export default function Reviews() {
  return (
    <Box
      component="section"
      sx={{
        maxWidth: "90rem",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, md: 6 },
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: { xs: 2, md: 4 },
      }}
    >
      {/* Avatars */}
      <Stack direction="row" spacing={-1}>
        {reviews.map((review) => (
          <Avatar
            key={review.id}
            src={review.src}
            alt={review.alt}
            sx={{
              border: "2px solid",
              borderColor: "#ffffff",
              width: { xs: 36, md: 48 },
              height: { xs: 36, md: 48 },
            }}
          />
        ))}
      </Stack>

      {/* Text */}
      <Typography
        sx={{
          color: "#ffffff",
          fontSize: { xs: "1rem", md: "1.25rem" },
          fontWeight: 300,
          lineHeight: 1.6,
          mt: { xs: 2, md: 0 },
        }}
      >
        Loved by over{" "}
        <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
          12,653+{" "}
        </Box>
        developers, researchers & creators who organize smarter with Rosetta
      </Typography>
    </Box>
  );
}
