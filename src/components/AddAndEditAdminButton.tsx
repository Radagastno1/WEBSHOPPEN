import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  onClick: () => void;
}

const AddAndEditAdminButton: React.FC<Props> = ({ onClick }) => {
  const [productAddedOrEdited, setProductAddedOrEdited] = useState(false);
  const [resetButton, setResetButton] = useState(false);

  const handleButtonClick = () => {
    if (!productAddedOrEdited) {
      setProductAddedOrEdited(true);
      onClick(); // Anropa den medföljande funktionen direkt när knappen klickas
      setTimeout(() => {
        // Återställ knappen efter 1 sekund
        setResetButton(true);
        setTimeout(() => {
          setResetButton(false);
          setProductAddedOrEdited(false); // Återställ också productAddedOrEdited
        }, 1000);
      }, 1000);
    }
  };

  return (
    <Button
      data-cy="admin-add-product"
      onClick={handleButtonClick}
      variant="contained"
      disabled={productAddedOrEdited || resetButton}
      sx={{
        mt: 1,
        mb: 1,
        background: "#000",
        color: "#fff",
        "&:hover": {
          backgroundColor: "black",
          transform: "scale(1.05)",
          transition: "transform 0.2s ease-in-out",
        },
      }}
    >
      <EditIcon fontSize="small" style={{ marginRight: "8px" }} />
      {productAddedOrEdited ? (
        <Typography variant="body1" data-cy="added-edited-toast">
          Har lagts till eller redigerats
        </Typography>
      ) : (
        <Typography variant="body1">Lägg till produkt</Typography>
      )}
    </Button>
  );
};

export default AddAndEditAdminButton;

