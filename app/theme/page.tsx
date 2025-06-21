// Material 3 Expressive-style conversion of your hero landing page
"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Chip,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub, FaCalendarAlt, FaUserLock } from "react-icons/fa";

export default function Landing() {
  return (
    <Box
      sx={{
        bgcolor: "#F8F5FF",
        minHeight: "100vh",
        py: 8,
        px: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={4}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          sx={{
            borderRadius: 6,
            p: 6,
            bgcolor: "#ffffff",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            sx={{
              fontWeight: 900,
              color: "#1C0424",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Never <span style={{ color: "#5E9ED6" }}>Lose</span> A <span style={{ color: "#B883F9" }}>Thought</span> Again
          </Typography>

          <Stack direction="row" justifyContent="center" spacing={1} sx={{ mb: 3 }}>
            <Chip
              icon={<FaCalendarAlt />}
              label="2025-06-17"
              sx={{ backgroundColor: "#F3D0FF" }}
            />
            <Chip label="Personal" sx={{ backgroundColor: "#D8F3DC" }} />
            <Chip label="Private" icon={<FaUserLock />} sx={{ backgroundColor: "#FFDADA" }} />
            <Chip label="Low" sx={{ backgroundColor: "#FFF2B2" }} />
            <Chip label="9 Subtasks" sx={{ backgroundColor: "#FCD7FF" }} />
          </Stack>

          <Typography variant="body1" sx={{ mb: 4, color: "#4A4458" }}>
            Your digital second brain for capturing, organizing, and rediscovering everything that matters.
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{ borderRadius: 999, px: 4, py: 1.5, fontWeight: 600 }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{ borderRadius: 999, px: 4, py: 1.5 }}
              >
                See How It Looks?
              </Button>
            </Grid>
          </Grid>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<FaGoogle />}
              sx={{ borderRadius: 999, textTransform: "none", fontWeight: 500 }}
            >
              Continue with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FaGithub />}
              sx={{ borderRadius: 999, textTransform: "none", fontWeight: 500 }}
            >
              Continue with GitHub
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}