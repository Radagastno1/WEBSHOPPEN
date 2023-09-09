import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Badge, Box, Link, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import PopupListComponent from "../components/PopupListComponent";
import { useCart } from "../contexts/CartContext";


export default function RootLayout() {
  const { cart } = useCart();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#e5e0e0",
          height: "3.6rem",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NavLink to="/">
                <Typography
                  variant="h4"
                  className="flex flex-1 justify-center"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  KERAMIKA
                </Typography>
              </NavLink>
            </Box>
            <nav>
              <ul style={{ display: "flex" }}>
                <li>
                  <Box sx={{ marginRight: "0" }}>
                    <NavLink to="/admin" data-cy="admin-link">
                      <AdminPanelSettingsIcon
                        className="cursor-pointer"
                        fontSize="large"
                      />
                    </NavLink>
                  </Box>
                </li>
                <li>
                  <Box sx={{ marginRight: "50px" }}>
                    <NavLink to="/checkout" data-cy="cart-link">
                      <Badge
                        badgeContent={cart.length}
                        color="warning"
                        data-cy="cart-items-count-badge"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <ShoppingCartIcon
                          className="cursor-pointer"
                          fontSize="large"
                        />
                      </Badge>
                    </NavLink>
                  </Box>
                </li>
              </ul>
            </nav>
          </Box>
        </Toolbar>
      </AppBar>

      <header
        className="flex h-80 min-h-700 bg-neutral-600 items-end justify-end "
        style={{
          backgroundImage: `url('https://i.imgur.com/nh4oD1B.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {" "}
        {isPopupVisible && (
          <div className="absolute top-10 right-2 w-50" style={{ zIndex: 1 }}>
            <PopupListComponent products={cart} />
          </div>
        )}
      </header>

      <main className="bg-neutral-100 flex flex-1 flex-col">
        <Outlet />
      </main>

      <footer className="flex bg-neutral-900">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            "& a": {
              ml: 2,
              color: "white",
              fontSize: 14,
              padding: 1,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          }}
        >
          <Link href="#">{"Kundservice"}</Link>
          <Link href="#">{"Om mig"}</Link>
        </Box>
      </footer>
    </div>
  );
}
