import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { useCounterContext } from "../CounterProvider";

export default function RootLayout() {
  const { count } = useCounterContext();

  return (
    <div className="flex flex-col h-screen">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          height: "3rem",
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
              <Typography variant="h4" className="flex flex-1 justify-center">
                KERAMIKA
              </Typography>
            </Box>
            <nav>
              <ul style={{ display: "flex" }}>
                <li>
                  <Box sx={{ marginRight: "0" }}>
                    <NavLink to="/admin" data-cy="admin-link">
                      <AdminPanelSettingsIcon
                        className="cursor-pointer"
                        fontSize="medium"
                      />
                    </NavLink>
                  </Box>
                </li>
                <li>
                  <Box sx={{ marginRight: "50px" }}>
                    <NavLink to="/checkout" data-cy="cart-link">
                      <Badge
                        badgeContent={count}
                        color="warning"
                        data-cy="cart-items-count-badge"
                      >
                        <ShoppingCartIcon
                          className="cursor-pointer"
                          fontSize="medium"
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
      ></header>

      <main className="bg-neutral-100 flex flex-1 flex-col">
        <Outlet />
      </main>

      <footer className="flex  flex-col h-10 bg-neutral-400"></footer>
    </div>
  );
}
