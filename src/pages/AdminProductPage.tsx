import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import AddAndEditAdminButton from "../components/AddAndEditAdminButton";
import { Products } from "../contexts/CartContext";
import { useProductContext } from "../contexts/ProductContext";

const FormSchema = z.object({
  title: z.string().min(1, { message: "Titel är obligatoriskt." }),
  description: z
    .string()
    .min(1, { message: "Beskrivning måste vara 5 siffror." }),
  price: z.string().refine((value) => /^\d{1}$/.test(value), {
    message: "Pris är obligatoriskt.",
  }),
  image: z.string().url({ message: "Bild ska vara en url" }),
});

// type Product = z.infer<typeof FormSchema>;

export default function AdminProductPage() {
  const { products, editProduct, addProduct, setProduct } = useProductContext();
  const [isProductAdded, setProductAdded] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  // const navigate = useNavigate();

  const productToEdit = products.find((p) => p.id == id);

  const { register, handleSubmit, formState, getValues, reset } =
    useForm<Products>({
      resolver: zodResolver(FormSchema),
    });

  const handleOnSubmit = async () => {
    const product: Products = {
      //om det är ny så får den ju ett riktigt id i productcontexrt
      id: productToEdit ? productToEdit.id : "default",
      title: getValues("title"),
      description: getValues("description"),
      price: getValues("price"),
      image: getValues("image"),
      quantity: getValues("quantity"),
    };

    productToEdit ? editProduct(product) : addProduct(product);

    setProductAdded(true);

    setProduct(product);

    reset();

    navigate("/admin");
  };

  return (
    <Paper sx={{ display: "flex", flexDirection: "column" }} >
      <Paper
        sx={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" padding={2} data-cy="product-form">
          {productToEdit ? "Redigera produkt" : "Lägg till ny produkt"}
        </Typography>

        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          data-cy="product-form"
          className="flex flex-1 flex-col items-center"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              label="Titel"
              {...register("title")}
              inputProps={{
                "data-cy": "product-title",
              }}
              variant="standard"
              defaultValue={productToEdit?.title}
              helperText={
                formState.errors.title ? (
                  <Typography
                    variant="caption"
                    data-cy="product-title-error"
                    sx={{ color: "red" }}
                  >
                    {formState.errors.title?.message}
                  </Typography>
                ) : null
              }
              error={Boolean(formState.errors.title)}
            />

            <TextField
              label="Beskrivning"
              {...register("description")}
              inputProps={{
                "data-cy": "product-description",
              }}
              variant="standard"
              defaultValue={productToEdit?.description}
              helperText={
                formState.errors.description ? (
                  <Typography
                    variant="caption"
                    data-cy="product-description-error"
                    sx={{ color: "red" }}
                  >
                    {formState.errors.description?.message}
                  </Typography>
                ) : null
              }
              error={Boolean(formState.errors.description)}
            />

            <TextField
              label="Pris"
              {...register("price")}
              variant="standard"
              inputProps={{
                "data-cy": "product-price",
              }}
              defaultValue={productToEdit?.price}
              helperText={
                formState.errors.price ? (
                  <Typography
                    variant="caption"
                    data-cy="product-price-error"
                    sx={{ color: "red" }}
                  >
                    {formState.errors.price?.message}
                  </Typography>
                ) : null
              }
              error={Boolean(formState.errors.price)}
            />

            <TextField
              label="Bild (url)"
              {...register("image")}
              variant="standard"
              inputProps={{
                "data-cy": "product-image",
              }}
              defaultValue={productToEdit?.image}
              helperText={
                formState.errors.image ? (
                  <Typography
                    variant="caption"
                    data-cy="product-image-error"
                    sx={{ color: "red" }}
                  >
                    {formState.errors.image?.message}
                  </Typography>
                ) : null
              }
              error={Boolean(formState.errors.image)}
            />

            <TextField
              label="Antal"
              {...register("quantity")}
              variant="standard"
              defaultValue={productToEdit ? productToEdit.quantity : 1}
            />

            <Box mt={2} mb={2}>
              <AddAndEditAdminButton
                onClick={handleOnSubmit}
                titel={productToEdit ? "Redigera" : "Lägg till"}
                onSubmitTitel={
                  productToEdit ? "Produkt uppdateras" : "Produkt tillagd"
                }
              />
            </Box>
          </Box>
        </form>
      </Paper>
    </Paper>
  );
}
