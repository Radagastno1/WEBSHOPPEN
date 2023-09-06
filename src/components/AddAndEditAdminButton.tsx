import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  onClick: () => void;
  titel: string;
  onSubmitTitel: string;
}

const AddAndEditAdminButton = (props: Props) => {
  const [productAddedOrEdited, setProductAddedOrEdited] = useState(false);
  const [resetButton, setResetButton] = useState(false);

  const handleButtonClick = () => {
    if (!productAddedOrEdited) {
      setProductAddedOrEdited(true);
      props.onClick(); // Anropa den medföljande funktionen direkt när knappen klickas
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
      type="submit"
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
          {props.onSubmitTitel}
        </Typography>
      ) : (
        <Typography variant="body1">{props.titel}</Typography>
      )}
    </Button>
  );
};

export default AddAndEditAdminButton;
