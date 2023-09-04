import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Link } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { useCounterContext } from "../CounterProvider";

export default function RootLayout() {
  const { count } = useCounterContext();

  return (
    <div className="flex flex-col h-screen">
      <header
        className="flex h-40 min-h-700 bg-neutral-600 items-end justify-end"
        style={{
          backgroundImage: `url('https://i.imgur.com/nh4oD1B.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
                  <Badge badgeContent={count} color="warning" data-cy="cart-items-count-badge">
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
      </header>

      <main className="bg-neutral-100 flex flex-1 flex-col">
        <Outlet />
      </main>

      <footer className="flex bg-neutral-400">
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            "& a": {
              ml: 2,
              color: "#424242",
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
