import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Products } from "../contexts/CartContext";
import { useProductContext } from "../contexts/ProductContext";

interface Props {
  title: string;
  product?: Products;
}

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

export default function AdminProductPage(props: Props) {
  const { addProduct, product, setProduct } = useProductContext();
  const { register, handleSubmit, formState, getValues } = useForm<Products>({
    defaultValues: props.product || {},
    resolver: zodResolver(FormSchema),
  });

  const handleOnSubmit = async () => {
    const product: Products = {
      id: "default",
      title: getValues("title"),
      description: getValues("description"),
      price: getValues("price"),
      image: getValues("image"),
      quantity: getValues("quantity"),
    };

    //produkt får id i metoden istället
    addProduct(product);
  };

  return (
    <Paper
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h6" padding={2}>
        {props.title} produkt
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
            defaultValue={1}
          />

          <Box mt={2} mb={2}>
            <Button type="submit" variant="contained" color="primary">
              {props.title}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
