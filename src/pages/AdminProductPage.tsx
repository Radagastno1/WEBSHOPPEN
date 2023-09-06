import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
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
  const { products, editProduct, addProduct } = useProductContext();

  const { id } = useParams();

  const productToEdit = products.find((p) => p.id == id);

  const { register, handleSubmit, formState, getValues } = useForm<Products>({
    //defaultvalues ska ju vara om det är med id och finns en produkt på idt
    resolver: zodResolver(FormSchema),
  });

  //när det är id - förifyllda produkt fält
  const handleOnSubmit = async () => {
    const product: Products = {
      id: productToEdit ? productToEdit.id : "default",
      title: getValues("title"),
      description: getValues("description"),
      price: getValues("price"),
      image: getValues("image"),
      quantity: getValues("quantity"),
    };

    productToEdit ? editProduct(product) : addProduct(product);
  };

  return (
    <Paper
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h6" padding={2}>
        {id} produkt
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

          {/* <Box mt={2} mb={2}>
            <Button type="submit" variant="contained" color="primary">
              {props.title}
            </Button>
          </Box> */}
          {/* denna ska användas här nedanför sen */}
          <Box mt={2} mb={2}>
            {/* <AddAndEditAdminButton onClick={handleOnSubmit} /> */}
            <Button onClick={handleOnSubmit}>
              {productToEdit ? "Redigera" : "Lägg till"}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
