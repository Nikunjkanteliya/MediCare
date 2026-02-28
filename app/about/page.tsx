"use client";

import { Box, Typography, Grid, Avatar, Chip, Divider } from "@mui/material";
import {
  EmojiNature,
  VerifiedUser,
  Shield,
  Handshake,
  Stars,
  WorkspacePremium,
} from "@mui/icons-material";

const commitments = [
  {
    icon: EmojiNature,
    label: "Authentic Ayurvedic Principles",
    color: "#22c55e",
  },
  {
    icon: WorkspacePremium,
    label: "Premium-Quality Herbal Formulations",
    color: "#38bdf8",
  },
  {
    icon: VerifiedUser,
    label: "Strict Quality Assurance Standards",
    color: "#a78bfa",
  },
  {
    icon: Handshake,
    label: "Transparent and Ethical Practices",
    color: "#fb923c",
  },
  { icon: Stars, label: "Long-Term Customer Trust", color: "#facc15" },
  { icon: Shield, label: "GMP-Compliant Manufacturing", color: "#f43f5e" },
];

export default function AboutPage() {
  return (
    <Box
      sx={{
        background: "linear-gradient(160deg, #0f172a 0%, #020617 100%)",
        minHeight: "100vh",
        color: "white",
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 3, md: 6 } }}>
        {/* Hero */}
        <Box textAlign="center" mb={10}>
          <Chip
            label="About Us"
            sx={{
              background: "rgba(56,189,248,0.12)",
              color: "#38bdf8",
              fontWeight: 700,
              mb: 3,
              fontSize: "0.85rem",
              px: 1,
            }}
          />
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              background: "linear-gradient(135deg, #e2e8f0 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: "2rem", md: "2.8rem" },
              lineHeight: 1.2,
            }}
          >
            Swami Shakti Ayurved Private Limited
          </Typography>
          <Typography
            variant="h5"
            fontWeight={500}
            sx={{
              color: "#64748b",
              mb: 4,
              fontStyle: "italic",
              fontSize: { xs: "1.1rem", md: "1.35rem" },
            }}
          >
            Where Timeless Ayurveda Meets Modern Excellence
          </Typography>
        </Box>

        {/* About Block */}
        <Box
          sx={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            mb: 8,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#94a3b8",
              lineHeight: 2.1,
              mb: 3,
              fontSize: "1.05rem",
            }}
          >
            Swami Shakti Ayurved Private Limited is a distinguished Ayurvedic
            wellness enterprise committed to redefining natural healthcare
            through{" "}
            <strong style={{ color: "#e2e8f0" }}>
              authenticity, precision, and uncompromising quality
            </strong>
            .
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#94a3b8",
              lineHeight: 2.1,
              mb: 3,
              fontSize: "1.05rem",
            }}
          >
            As the proud owner of the trademark brand{" "}
            <strong style={{ color: "#38bdf8" }}>Swami Shakti Juice</strong>,
            the company is driven by a singular vision — to elevate Ayurvedic
            wellness into a trusted, globally respected healthcare movement.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#94a3b8",
              lineHeight: 2.1,
              mb: 3,
              fontSize: "1.05rem",
            }}
          >
            Rooted in the profound science of Ayurveda, our formulations are
            thoughtfully conceptualized to promote
            <strong style={{ color: "#e2e8f0" }}>
              {" "}
              holistic vitality, immunity, and long-term well-being
            </strong>
            . Every product reflects a deep respect for India's ancient healing
            heritage while adhering to structured quality systems and
            contemporary compliance standards.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#94a3b8", lineHeight: 2.1, fontSize: "1.05rem" }}
          >
            Our products are manufactured through{" "}
            <strong style={{ color: "#e2e8f0" }}>
              certified GMP-compliant facilities
            </strong>
            , ensuring stringent quality control, purity of ingredients, and
            consistency across every batch.
          </Typography>
        </Box>

        {/* Commitment */}
        <Box mb={10}>
          <Typography
            variant="h4"
            fontWeight={700}
            mb={6}
            textAlign="center"
            sx={{ color: "#e2e8f0" }}
          >
            Our Commitment
          </Typography>
          <Grid container spacing={3}>
            {commitments.map((c) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={c.label}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2.5,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 3,
                    p: 3,
                    "&:hover": {
                      borderColor: `${c.color}50`,
                      background: `${c.color}08`,
                    },
                    transition: "all 0.3s",
                  }}
                >
                  <Avatar
                    sx={{
                      background: `${c.color}20`,
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                    }}
                  >
                    <c.icon sx={{ color: c.color, fontSize: 22 }} />
                  </Avatar>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: "#e2e8f0", lineHeight: 1.5 }}
                  >
                    {c.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Legacy Banner */}
        <Box
          textAlign="center"
          sx={{
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.08) 0%, rgba(168,85,247,0.08) 100%)",
            border: "1px solid rgba(56,189,248,0.2)",
            borderRadius: 4,
            p: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#e2e8f0", lineHeight: 1.8, fontStyle: "italic" }}
          >
            "Swami Shakti Ayurved — A Legacy of Wellness. A Future of Trust."
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
