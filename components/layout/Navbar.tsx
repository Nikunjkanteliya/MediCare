"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ShoppingCart,
  Search,
  Menu as MenuIcon,
  LocalPharmacy,
  Close,
} from "@mui/icons-material";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { totalItems } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/#products" },
    { label: "Offers", href: "/#offers" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(14, 165, 233, 0.1)",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            py: 1,
            gap: 2,
            maxWidth: 1400,
            mx: "auto",
            width: "100%",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <LocalPharmacy sx={{ fontSize: 32, color: "#0ea5e9" }} />
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
              }}
            >
              Swami Shakti Ayurved
            </Typography>
          </Link>
          {/* Search bar - desktop */}
          {/*  {!isMobile && 
                    (
                        <Box
                            component="form"
                            onSubmit={handleSearch}
                            sx={{
                                flex: 1,
                                maxWidth: 500,
                                mx: 3,
                                display: 'flex',
                                alignItems: 'center',
                                background: '#f1f5f9',
                                borderRadius: 3,
                                px: 2,
                                py: 0.5,
                                border: '2px solid transparent',
                                transition: 'all 0.2s',
                                '&:focus-within': {
                                    border: '2px solid #0ea5e9',
                                    background: '#fff',
                                    boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.1)',
                                },
                            }}
                        >
                            <Search sx={{ color: '#94a3b8', mr: 1, fontSize: 20 }} />
                            <InputBase
                                placeholder="Search medicines, vitamins..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                fullWidth
                                sx={{ fontSize: '0.9rem', color: '#334155' }}
                            />
                        </Box>
                    )
                    } */}

          <Box flex={1} />

          {/* Nav links - desktop */}
          {!isMobile && (
            <Box display="flex" gap={1}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      px: 2,
                      py: 0.8,
                      color: "#475569",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      borderRadius: 2,
                      transition: "all 0.2s",
                      "&:hover": { color: "#0ea5e9", background: "#f0f9ff" },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}

          {/* Cart */}
          <IconButton
            component={Link}
            href="/cart"
            aria-label={`Cart with ${totalItems} items`}
            sx={{
              ml: 1,
              color: "#0ea5e9",
              background: "rgba(14, 165, 233, 0.08)",
              "&:hover": {
                background: "rgba(14, 165, 233, 0.15)",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s",
            }}
          >
            <Badge
              badgeContent={totalItems}
              sx={{
                "& .MuiBadge-badge": {
                  background: "#e11d48",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                },
              }}
            >
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Mobile menu icon */}
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              sx={{ color: "#475569" }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight={700} color="#0ea5e9">
              Menu
            </Typography>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <Close />
            </IconButton>
          </Box>

          {/* Mobile Search */}
          {/* <Box
                        component="form"
                        onSubmit={handleSearch}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#f1f5f9',
                            borderRadius: 2,
                            px: 2,
                            py: 1,
                            mb: 2,
                        }}
                    >
                        <Search sx={{ color: '#94a3b8', mr: 1, fontSize: 18 }} />
                        <InputBase
                            placeholder="Search medicines..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            fullWidth
                            sx={{ fontSize: '0.85rem' }}
                        />
                    </Box> */}

          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.label}
                component={Link}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  "&:hover": { background: "#f0f9ff", color: "#0ea5e9" },
                  textDecoration: "none",
                  color: "#475569",
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
