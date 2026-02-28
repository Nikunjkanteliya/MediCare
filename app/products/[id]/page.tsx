"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Divider,
  Rating,
  Tab,
  Tabs,
  Paper,
  Breadcrumbs,
} from "@mui/material";
import {
  ArrowBack,
  Add,
  Remove,
  ShoppingCart,
  LocalShipping,
  VerifiedUser,
  Info,
  MedicalServices,
} from "@mui/icons-material";
import { Product } from "@/types";
import { productService } from "@/services/productService";
import { useCart } from "@/hooks/useCart";
import { AppButton } from "@/components/ui/AppButton";
import { ProductDetailSkeleton } from "@/components/ui/SkeletonCard";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/utils/formatters";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const { addToCart, isInCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      const p = await productService.getProductById(id);
      if (!p) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }
      setProduct(p);
      const related = await productService.getRelatedProducts(p.id, p.category);
      setRelatedProducts(related);
      setIsLoading(false);
    };
    fetchAll();
  }, [id]);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <ProductDetailSkeleton />
      </Container>
    );
  }

  if (notFound || !product) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <MedicalServices sx={{ fontSize: 80, color: "#e2e8f0", mb: 3 }} />
        <Typography variant="h4" fontWeight={700} color="#94a3b8" mb={2}>
          Product not found
        </Typography>
        <AppButton onClick={() => router.push("/")}>
          <ArrowBack sx={{ mr: 1 }} />
          Back to Home
        </AppButton>
      </Container>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const inCart = isInCart(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
  };
  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <Box
      sx={{ background: "#f8fafc", minHeight: "100vh", py: { xs: 3, md: 6 } }}
    >
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#64748b",
              fontSize: "0.875rem",
            }}
          >
            Home
          </Link>
          <Typography variant="body2" color="#64748b">
            {product.category}
          </Typography>
          <Typography variant="body2" color="#0f172a" fontWeight={600}>
            {product.name}
          </Typography>
        </Breadcrumbs>

        {/* Main Product Section */}
        <Paper
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            mb: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Grid container spacing={5}>
            {/* Images */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  background: "white",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  mb: 2,
                }}
              >
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  style={{ objectFit: "contain", padding: "16px" }}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                {discount > 0 && (
                  <Chip
                    label={`-${discount}%`}
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "#ef4444",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                  />
                )}
              </Box>
              {images.length > 1 && (
                <Box display="flex" gap={1}>
                  {images.map((img, i) => (
                    <Box
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        overflow: "hidden",
                        position: "relative",
                        cursor: "pointer",
                        flexShrink: 0,
                        border:
                          selectedImage === i
                            ? "2px solid #0ea5e9"
                            : "2px solid transparent",
                        "&:hover": { borderColor: "#0ea5e9" },
                        transition: "all 0.2s",
                      }}
                    >
                      <Image
                        src={img}
                        alt={`thumb-${i}`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="64px"
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>

            {/* Info */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#0ea5e9",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {product.brand}
              </Typography>
              <Typography
                variant="h3"
                fontWeight={800}
                color="#0f172a"
                sx={{ lineHeight: 1.2, mt: 0.5, mb: 1.5 }}
              >
                {product.name}
              </Typography>

              <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                <Rating
                  value={product.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" fontWeight={600} color="#0f172a">
                  {product.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({product.reviewCount} reviews)
                </Typography>
              </Box>

              <Box display="flex" alignItems="baseline" gap={1.5} mb={2}>
                <Typography variant="h4" fontWeight={800} color="#0f172a">
                  {formatPrice(product.price)}
                </Typography>
                {product.originalPrice && (
                  <>
                    <Typography
                      variant="h6"
                      color="text.disabled"
                      sx={{ textDecoration: "line-through", fontWeight: 400 }}
                    >
                      {formatPrice(product.originalPrice)}
                    </Typography>
                    <Chip
                      label={`${discount}% OFF`}
                      size="small"
                      sx={{
                        background: "#dcfce7",
                        color: "#15803d",
                        fontWeight: 700,
                      }}
                    />
                  </>
                )}
              </Box>

              <Typography
                variant="body1"
                color="text.secondary"
                mb={3}
                lineHeight={1.7}
              >
                {product.shortDescription}
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                mb={3}
                p={1.5}
                sx={{
                  background: product.stock > 0 ? "#f0fdf4" : "#fef2f2",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      product.stock > 10
                        ? "#10b981"
                        : product.stock > 0
                          ? "#f59e0b"
                          : "#ef4444",
                  }}
                />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={
                    product.stock > 10
                      ? "#065f46"
                      : product.stock > 0
                        ? "#92400e"
                        : "#991b1b"
                  }
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                      ? `Only ${product.stock} left!`
                      : "Out of Stock"}
                </Typography>
              </Box>

              {product.requiresPrescription && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={3}
                  p={2}
                  sx={{
                    background: "#fffbeb",
                    borderRadius: 2,
                    border: "1px solid #fde68a",
                  }}
                >
                  <Info sx={{ fontSize: 18, color: "#b45309" }} />
                  <Typography variant="body2" color="#92400e" fontWeight={500}>
                    ⚕️ Prescription required. Upload prescription at checkout.
                  </Typography>
                </Box>
              )}

              <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={3}
                flexWrap="wrap"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    border: "2px solid #e2e8f0",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    sx={{
                      p: 1.2,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#475569",
                      "&:hover": { background: "#f1f5f9", color: "#0ea5e9" },
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label="Decrease quantity"
                  >
                    <Remove fontSize="small" />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ px: 2.5, minWidth: 50, textAlign: "center" }}
                  >
                    {quantity}
                  </Typography>
                  <Box
                    component="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    disabled={product.stock === 0}
                    sx={{
                      p: 1.2,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#475569",
                      "&:hover": { background: "#f1f5f9", color: "#0ea5e9" },
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label="Increase quantity"
                  >
                    <Add fontSize="small" />
                  </Box>
                </Box>
                <AppButton
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  sx={{ flex: 1, py: 1.5, minWidth: 140 }}
                >
                  <ShoppingCart sx={{ mr: 1, fontSize: 18 }} />
                  {inCart ? "Update Cart" : "Add to Cart"}
                </AppButton>
                <AppButton
                  variant="primary"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  sx={{ flex: 1, py: 1.5, minWidth: 140 }}
                >
                  Buy Now
                </AppButton>
              </Box>

              <Box display="flex" gap={2} flexWrap="wrap">
                {[
                  { icon: LocalShipping, text: "Free delivery above ₹499" },
                  { icon: VerifiedUser, text: "100% genuine product" },
                ].map(({ icon: I, text }) => (
                  <Box key={text} display="flex" alignItems="center" gap={0.7}>
                    <I sx={{ fontSize: 16, color: "#10b981" }} />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs */}
        <Paper
          sx={{
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            mb: 4,
            overflow: "hidden",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderBottom: "1px solid #f1f5f9",
              "& .MuiTab-root": {
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.95rem",
              },
              "& .Mui-selected": { color: "#0ea5e9 !important" },
              "& .MuiTabs-indicator": { background: "#0ea5e9" },
            }}
          >
            <Tab label="Description" />
            <Tab label="Dosage & Usage" />
            <Tab label="Ingredients" />
            <Tab label="Storage" />
            <Tab label="Disclaimer" />
          </Tabs>
          <Box sx={{ p: { xs: 3, md: 4 } }} className="whitespace-break-spaces">
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="#0f172a" mb={3}>
                  Product Description
                </Typography>
                <Box
                  sx={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Box display="flex" gap={2} alignItems="flex-start">
                    <Typography sx={{ fontSize: 26, lineHeight: 1, flexShrink: 0, mt: 0.3 }}>🌿</Typography>
                    <Typography
                      variant="body1"
                      color="#14532d"
                      lineHeight={1.9}
                      fontWeight={500}
                    >
                      {product.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="#0f172a" mb={3}>
                  Dosage &amp; Usage
                </Typography>
                <Box
                  sx={{
                    background: '#faf5ff',
                    border: '1px solid #e9d5ff',
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Box display="flex" gap={2} alignItems="flex-start" mb={2}>
                    <Typography sx={{ fontSize: 26, lineHeight: 1, flexShrink: 0, mt: 0.3 }}>💊</Typography>
                    <Typography
                      variant="body1"
                      color="#581c87"
                      lineHeight={1.9}
                      fontWeight={500}
                    >
                      {product.dosage ||
                        'Please consult a pharmacist or your doctor for proper dosage instructions.'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: 'white',
                      border: '1px solid #e9d5ff',
                      borderRadius: 2,
                      p: 2,
                      mt: 1,
                    }}
                  >
                    <Typography variant="caption" fontWeight={700} color="#7c3aed" display="block" mb={0.5}>
                      ⚕️ General Recommendation
                    </Typography>
                    <Typography variant="body2" color="#6b21a8" lineHeight={1.7}>
                      Take as directed by a physician. Do not exceed the recommended dosage without medical advice.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="#0f172a" mb={1}>
                  Each 10 ml contains extract of the following herbs:
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={3}>
                  *All quantities are per 10 ml serving
                </Typography>

                {/* Herb table */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 1,
                    mb: 4,
                  }}
                >
                  {[
                    { name: 'Blueberry', botanical: 'Vaccinium sect. Cyanococcus', qty: '100 mg' },
                    { name: 'Cranberry', botanical: 'Vaccinium subg. Oxycoccus', qty: '70 mg' },
                    { name: 'Goji Berry', botanical: 'Lycium barbarum', qty: '50 mg' },
                    { name: 'Mangosteen', botanical: 'Garcinia mangostana', qty: '100 mg' },
                    { name: 'Raspberry', botanical: 'Rubus idaeus', qty: '100 mg' },
                    { name: 'Strawberry', botanical: 'Fragaria × ananassa', qty: '125 mg' },
                    { name: 'Seabuckthorn', botanical: 'Hippophae', qty: '75 mg' },
                    { name: 'Basil (Tulsi)', botanical: 'Ocimum tenuiflorum', qty: '150 mg' },
                    { name: 'Aloe Vera', botanical: 'Aloe barbadensis miller', qty: '200 mg' },
                    { name: 'Kali Musli', botanical: 'Curculigo orchioides', qty: '100 mg' },
                    { name: 'Guduchi', botanical: 'Tinospora cordifolia', qty: '125 mg' },
                    { name: 'Haridra (Turmeric)', botanical: 'Curcuma longa', qty: '200 mg' },
                    { name: 'Noni', botanical: 'Morinda citrifolia', qty: '200 mg' },
                    { name: 'Amla', botanical: 'Phyllanthus emblica', qty: '125 mg' },
                    { name: 'Gajar (Carrot)', botanical: 'Daucus carota subsp. sativus', qty: '125 mg' },
                    { name: 'Green Tea', botanical: 'Camellia sinensis', qty: '100 mg' },
                    { name: 'Draksha (Grapes)', botanical: 'Vitis vinifera Linn', qty: '75 mg' },
                    { name: 'Pomegranate', botanical: 'Punica granatum', qty: '125 mg' },
                    { name: 'Neem', botanical: 'Azadirachta indica', qty: '100 mg' },
                    { name: 'Moringa', botanical: 'Moringa oleifera', qty: '75 mg' },
                    { name: 'Brahmi', botanical: 'Bacopa monnieri', qty: '125 mg' },
                    { name: 'Beetroot', botanical: 'Beta vulgaris', qty: '100 mg' },
                    { name: 'Harad', botanical: 'Terminalia chebula', qty: '125 mg' },
                    { name: 'Baheda', botanical: 'Terminalia bellirica', qty: '125 mg' },
                    { name: 'Bhui Amla', botanical: 'Phyllanthus niruri', qty: '100 mg' },
                    { name: 'Shankhpushpi', botanical: 'Convolvulus prostratus', qty: '125 mg' },
                    { name: 'Ginger', botanical: 'Zingiber officinale', qty: '75 mg' },
                    { name: 'Garcinia Cambogia', botanical: 'Garcinia Cambogia', qty: '125 mg' },
                    { name: 'Ashwagandha', botanical: 'Withania somnifera', qty: '200 mg' },
                    { name: 'Curcuminoids', botanical: 'Curcuminoids', qty: '150 mg' },
                    { name: 'Anjeer (Fig)', botanical: 'Ficus carica', qty: '75 mg' },
                    { name: 'Jaiphal', botanical: 'Myristica fragrans', qty: '50 mg' },
                    { name: 'Rose Alba', botanical: 'Rosa alba', qty: '25 mg' },
                    { name: 'Alsi (Flax Seeds)', botanical: 'Linum usitatissimum', qty: '25 mg' },
                    { name: 'Kesar (Saffron)', botanical: 'Crocus sativus', qty: '2 mg' },
                    { name: 'Elaichi', botanical: 'Elettaria cardamomum', qty: '25 mg' },
                    { name: 'Arjun', botanical: 'Terminalia arjuna', qty: '200 mg' },
                    { name: 'Mulethi', botanical: 'Glycyrrhiza glabra', qty: '125 mg' },
                    { name: 'Shatavari', botanical: 'Asparagus racemosus', qty: '150 mg' },
                    { name: 'Watermelon', botanical: 'Citrullus lanatus', qty: '50 mg' },
                  ].map((herb, idx) => (
                    <Box
                      key={herb.name}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 2,
                        background: idx % 2 === 0 ? '#f8fafc' : '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        gap: 1,
                      }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={700} color="#0f172a" noWrap>
                          {herb.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                          {herb.botanical}
                        </Typography>
                      </Box>
                      <Chip
                        label={herb.qty}
                        size="small"
                        sx={{
                          background: '#e0f2fe',
                          color: '#0369a1',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          flexShrink: 0,
                        }}
                      />
                    </Box>
                  ))}
                </Box>

                {/* Other Ingredients */}
                <Box
                  sx={{
                    background: '#fffbeb',
                    border: '1px solid #fde68a',
                    borderRadius: 2,
                    p: 2.5,
                  }}
                >
                  <Typography variant="body2" fontWeight={700} color="#92400e" mb={1}>
                    Other Ingredients:
                  </Typography>
                  <Typography variant="body2" color="#78350f" lineHeight={1.8}>
                    Potassium, Sucralose, Sodium Benzoate (Preservative), Citric Acid, EDTA, Caramel Flavour q.s., D.M. Aqua q.s.
                  </Typography>
                </Box>
              </Box>
            )}
            {activeTab === 3 && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="#0f172a" mb={3}>
                  Storage Conditions
                </Typography>
                <Box
                  sx={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Box
                    component="ul"
                    sx={{ m: 0, pl: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    {[
                      { text: 'Store in a cool, dry place at a temperature not exceeding 25°C.', icon: '🌡️' },
                      { text: 'Protect from direct sunlight and moisture.', icon: '☀️' },
                      { text: 'Refrigerate after opening and keep the bottle tightly closed.', icon: '❄️' },
                      { text: 'Keep out of reach of children.', icon: '⚠️' },
                    ].map((item) => (
                      <Box component="li" key={item.text} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', p: 2, background: 'white', borderRadius: 2, border: '1px solid #dbeafe' }}>
                        <Typography sx={{ fontSize: 20, lineHeight: 1, mt: 0.2, flexShrink: 0 }}>{item.icon}</Typography>
                        <Typography variant="body1" color="#1e3a8a" lineHeight={1.7} fontWeight={500}>{item.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
            {activeTab === 4 && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="#0f172a" mb={3}>
                  Disclaimer
                </Typography>
                <Box
                  sx={{
                    background: '#fff7ed',
                    border: '1px solid #fed7aa',
                    borderRadius: 3,
                    p: 3,
                    mb: 2,
                  }}
                >
                  <Box display="flex" gap={2} alignItems="flex-start">
                    <Typography sx={{ fontSize: 26, lineHeight: 1, flexShrink: 0, mt: 0.3 }}>⚕️</Typography>
                    <Typography variant="body1" color="#7c2d12" lineHeight={1.9} fontWeight={500}>
                      This product is not intended to diagnose, treat, cure, or prevent any disease.
                      The information provided is for educational purposes only and should not be
                      considered as medical advice.
                    </Typography>
                  </Box>
                </Box>
                {[
                  { icon: '👨‍⚕️', text: 'Always consult a qualified healthcare professional before purchasing or consuming any medicine.', color: '#fef2f2', border: '#fecaca', text_color: '#7f1d1d' },
                  { icon: '🤰', text: 'Pregnant or nursing mothers, children under 18, and individuals with known medical conditions should consult a physician before use.', color: '#fef2f2', border: '#fecaca', text_color: '#7f1d1d' },
                  { icon: '⚠️', text: 'Results may vary from person to person. Keep out of reach of children.', color: '#fff7ed', border: '#fed7aa', text_color: '#7c2d12' },
                ].map((item) => (
                  <Box
                    key={item.text}
                    display="flex"
                    gap={2}
                    alignItems="flex-start"
                    sx={{
                      background: item.color,
                      border: `1px solid ${item.border}`,
                      borderRadius: 2,
                      p: 2,
                      mb: 1.5,
                    }}
                  >
                    <Typography sx={{ fontSize: 20, lineHeight: 1, mt: 0.2, flexShrink: 0 }}>{item.icon}</Typography>
                    <Typography variant="body2" color={item.text_color} lineHeight={1.7} fontWeight={500}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Paper>

        {/* Related Products */}
        {/* {relatedProducts.length > 0 && (
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h5" fontWeight={800} color="#0f172a">
                Related Products
              </Typography>
              <Link
                href={`/?category=${encodeURIComponent(product.category)}`}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="body2" color="#0ea5e9" fontWeight={600}>
                  View All →
                </Typography>
              </Link>
            </Box>
            <Grid container spacing={3}>
              {relatedProducts.map((rp) => (
                <Grid key={rp.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ProductCard product={rp} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )} */}
      </Container>
    </Box>
  );
}
