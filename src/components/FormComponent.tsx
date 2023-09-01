import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCustomerContext } from "../CustomerContext";
import "../media.css";

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

export default function FormComponent(props: Props) {
  const { register, handleSubmit, formState } = useForm<Customer>({
    defaultValues: props.customer || {},
    resolver: zodResolver(FormSchema),
  });

  const { customer, setCustomer } = useCustomerContext();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit(() => {
        navigate("../confirmation");
      })}
      data-cy="customer-form"
      className="flex flex-1 flex-col items-center"
    >
      <Box mt={2}>
        <TextField
          label="Förnamn och efternamn"
          value={customer?.name}
          autoComplete="name"
          {...register("name")}
          onChange={(e) => {
            setCustomer({ ...customer, name: e.target.value });
          }}
          inputProps={{
            "data-cy": "customer-name",
          }}
          variant="standard"
          helperText={
            formState.errors.name ? (
              <span data-cy="customer-name-error" className="text-red-500">
                {formState.errors.name?.message}
              </span>
            ) : null
          }
          error={Boolean(formState.errors.name)}
        />

        <TextField
          label="Gatuadress"
          autoComplete="street-address"
          {...register("address")}
          value={customer?.address}
          variant="standard"
          helperText={
            formState.errors.address ? (
              <span data-cy="customer-address-error" className="text-red-500">
                {formState.errors.address?.message}
              </span>
            ) : null
          }
          error={Boolean(formState.errors.address)}
          onChange={(e) => {
            setCustomer({ ...customer, address: e.target.value });
          }}
          inputProps={{
            "data-cy": "customer-address",
          }}
        />

        <TextField
          label="Postkod"
          autoComplete="postal-code"
          {...register("zipcode")}
          value={customer?.zipcode}
          variant="standard"
          helperText={
            formState.errors.zipcode ? (
              <span data-cy="customer-zipcode-error" className="text-red-500">
                {formState.errors.zipcode?.message}
              </span>
            ) : null
          }
          error={Boolean(formState.errors.zipcode)}
          onChange={(e) => {
            setCustomer({ ...customer, zipcode: e.target.value });
          }}
          inputProps={{
            "data-cy": "customer-zipcode",
          }}
        />

        <TextField
          label="Stad"
          autoComplete="address-level2"
          {...register("city")}
          value={customer?.city}
          variant="standard"
          helperText={
            formState.errors.city ? (
              <span data-cy="customer-city-error" className="text-red-500">
                {formState.errors.city?.message}
              </span>
            ) : null
          }
          error={Boolean(formState.errors.city)}
          onChange={(e) => {
            setCustomer({ ...customer, city: e.target.value });
          }}
          inputProps={{
            "data-cy": "customer-city",
          }}
        />

        <TextField
          label="Email"
          autoComplete="email"
          {...register("email")}
          value={customer?.email}
          variant="standard"
          helperText={
            formState.errors.email ? (
              <span data-cy="customer-email-error" className="text-red-500">
                {formState.errors.email?.message}
              </span>
            ) : null
          }
          error={Boolean(formState.errors.email)}
          onChange={(e) => {
            setCustomer({ ...customer, email: e.target.value });
          }}
          inputProps={{
            "data-cy": "customer-email",
          }}
        />

        <TextField
          label="Telefonnummer"
          autoComplete="tel"
          {...register("phone")}
          value={customer?.phone}
          variant="standard"
          helperText={
            formState.errors.phone ? (
              <span data-cy="customer-phone-error" className="text-red-500">
                {formState.errors.phone?.message}
              </span>
            ) : null
          }
          error={Boolean(formState.errors.phone)}
          onChange={(e) => {
            setCustomer({ ...customer, phone: e.target.value });
          }}
          inputProps={{
            "data-cy": "customer-phone",
          }}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Bekräfta
          </Button>
        </Box>
      </Box>
    </form>
  );
}
