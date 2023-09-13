import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCart } from "../contexts/CartContext";
import { useCustomerContext } from "../contexts/CustomerContext";
import { useOrderContext } from "../contexts/OrderContext";
import { Order } from "../interfaces";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Namn är obligatoriskt." }),
  address: z.string().min(1, { message: "Adress är obligatoriskt." }),
  zipcode: z.string().refine((value) => /^\d{5}$/.test(value), {
    message: "Postkod måste vara 5 siffror.",
  }),
  city: z.string().min(1, { message: "Stad är obligatoriskt." }),
  email: z.string().email({ message: "Email är obligatoriskt." }),
  phone: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Telefonnummer måste vara 10 siffror.",
  }),
});

type Customer = z.infer<typeof FormSchema>;

interface Props {
  customer?: Customer;
}

function generateRandomNumber() {
  const randomNumbers = Math.floor(Math.random() * 9000) + 1000;

  const timestamp = new Date().getTime();
  const last6Digits = timestamp.toString().slice(-6);

  const orderNumber = `${last6Digits}-${randomNumbers}`;

  return String(orderNumber);
}

export default function FormComponent(props: Props) {
  const { setCustomer } = useCustomerContext();
  const { resetCustomer } = useCustomerContext();
  const { cart, resetCart, totalPrice } = useCart();
  const { setOrder } = useOrderContext();
  //bara för nu, att inte kunna gå vidare om inte faktura är ikryssad, för skojs skull bara
  const [isInvoiceChecked, setIsInvoiceChecked] = useState(true);

  const navigate = useNavigate();
  const { register, handleSubmit, formState, getValues } = useForm<Customer>({
    defaultValues: props.customer || {},
    resolver: zodResolver(FormSchema),
  });

  const handleOnSubmit = async () => {
    const customerData = {
      name: getValues("name"),
      address: getValues("address"),
      zipcode: getValues("zipcode"),
      city: getValues("city"),
      email: getValues("email"),
      phone: getValues("phone"),
    };

    setCustomer(customerData);

    const orderNumber = generateRandomNumber();

    const order: Order = {
      orderNr: orderNumber,
      customer: customerData,
      cart: cart,
      totalPrice: totalPrice,
    };

    setOrder(order);

    resetCustomer();
    resetCart();

    navigate("../confirmation");
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      data-cy="customer-form"
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
          label="Förnamn och efternamn"
          autoComplete="name"
          {...register("name")}
          inputProps={{
            "data-cy": "customer-name",
          }}
          variant="standard"
          helperText={
            formState.errors.name ? (
              <Typography
                variant="caption"
                data-cy="customer-name-error"
                sx={{ color: "red" }}
              >
                {formState.errors.name?.message}
              </Typography>
            ) : null
          }
          error={Boolean(formState.errors.name)}
        />

        <TextField
          label="Gatuadress"
          autoComplete="street-address"
          {...register("address")}
          variant="standard"
          helperText={
            formState.errors.address ? (
              <Typography
                variant="caption"
                data-cy="customer-address-error"
                sx={{ color: "red" }}
              >
                {formState.errors.address?.message}
              </Typography>
            ) : null
          }
          error={Boolean(formState.errors.address)}
          inputProps={{
            "data-cy": "customer-address",
          }}
        />

        <TextField
          label="Postkod"
          autoComplete="postal-code"
          {...register("zipcode")}
          variant="standard"
          helperText={
            formState.errors.zipcode ? (
              <Typography
                variant="caption"
                data-cy="customer-zipcode-error"
                sx={{ color: "red" }}
              >
                {formState.errors.zipcode?.message}
              </Typography>
            ) : null
          }
          error={Boolean(formState.errors.zipcode)}
          inputProps={{
            "data-cy": "customer-zipcode",
          }}
        />

        <TextField
          label="Stad"
          autoComplete="address-level2"
          {...register("city")}
          variant="standard"
          helperText={
            formState.errors.city ? (
              <Typography
                variant="caption"
                data-cy="customer-city-error"
                sx={{ color: "red" }}
              >
                {formState.errors.city?.message}
              </Typography>
            ) : null
          }
          error={Boolean(formState.errors.city)}
          inputProps={{
            "data-cy": "customer-city",
          }}
        />

        <TextField
          label="Email"
          autoComplete="email"
          {...register("email")}
          variant="standard"
          helperText={
            formState.errors.email ? (
              <Typography
                variant="caption"
                data-cy="customer-email-error"
                sx={{ color: "red" }}
              >
                {formState.errors.email?.message}
              </Typography>
            ) : null
          }
          error={Boolean(formState.errors.email)}
          inputProps={{
            "data-cy": "customer-email",
          }}
        />

        <TextField
          label="Telefonnummer"
          autoComplete="tel"
          {...register("phone")}
          variant="standard"
          helperText={
            formState.errors.phone ? (
              <Typography
                variant="caption"
                data-cy="customer-phone-error"
                sx={{ color: "red" }}
              >
                {formState.errors.phone?.message}
              </Typography>
            ) : null
          }
          error={Boolean(formState.errors.phone)}
          inputProps={{
            "data-cy": "customer-phone",
          }}
        />

        <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={(event) => setIsInvoiceChecked(event.target.checked)}
              />
            }
            label="Faktura"
          />

          <FormControlLabel
            disabled
            control={<Checkbox />}
            label="Betala med kort"
          />
        </Paper>

        <Box mb={0.5}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={cart.length <= 0 || !isInvoiceChecked}
          >
            Bekräfta Köp
          </Button>
        </Box>
      </Box>
    </form>
  );
}
