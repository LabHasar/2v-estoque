import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Link href="/" passHref>
          <AiFillHome
            style={{
              fontSize: "30px",
              marginLeft: "10px",
              color: "inherit",
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          />
        </Link>

        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            display: "flex",
            alignItems: "center",
            fontFamily: "monospace",
            fontWeight: 900,
            fontSize: "30px",
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          CONTROLE DE ESTOQUE
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
