import { Container, Grid, Typography, Link, Box } from "@mui/material";
import Logo from "../../assets/Staycation..png"; // path to your logo image

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "white", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo Column */}
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <img src={Logo} alt="Staycation Logo" style={{ height: 30 }} />
            </Box>
            <Typography variant="body2" color="#B0B0B0">
              © {new Date().getFullYear()} All Rights Reserved
            </Typography>
          </Grid>

          {/* For Beginners */}
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="#152C5B" gutterBottom>
              For Beginners
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="/signup" color="#B0B0B0" underline="hover">
                Create Account
              </Link>
              <Link href="/rooms" color="#B0B0B0" underline="hover">
                Browse Rooms
              </Link>
              <Link href="/faq" color="#B0B0B0" underline="hover">
                FAQs
              </Link>
            </Box>
          </Grid>

          {/* Explore Us */}
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="#152C5B" gutterBottom>
              Explore Us
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="/about" color="#B0B0B0" underline="hover">
                About Us
              </Link>
              <Link href="/blog" color="#B0B0B0" underline="hover">
                Blog
              </Link>
              <Link href="/careers" color="#B0B0B0" underline="hover">
                Careers
              </Link>
            </Box>
          </Grid>

          {/* Connect Us */}
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="#152C5B" gutterBottom>
              Connect Us
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link
                href="mailto:info@example.com"
                color="#B0B0B0"
                underline="hover"
              >
                info@example.com
              </Link>
              <Link href="tel:+123456789" color="#B0B0B0" underline="hover">
                +1 234 567 89
              </Link>
              <Link href="/contact" color="#B0B0B0" underline="hover">
                Contact Form
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
