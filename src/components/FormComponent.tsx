import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerContext } from "../CustomerContext";
import "../media.css";

export default function FormComponent() {
  const { customer, setCustomer } = useCustomerContext();
  const navigate = useNavigate();
  //Använd ZOD
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!customer.name) {
      setNameError("Namn är obligatoriskt.");
      return;
    } else if (!customer.address) {
      setAddressError("Adress är obligatoriskt.");
      return;
    } else if (
      !customer.zipcode ||
      isNaN(Number(customer.zipcode)) ||
      customer.zipcode.length != 5
    ) {
      setZipcodeError("Postkod är obligatoriskt.");
      return;
    } else if (!customer.city) {
      setCityError("Stad är obligatoriskt.");
      return;
    } else if (!customer.email || !customer.email.includes("@")) {
      setEmailError("Email är obligatoriskt.");
      return;
    } else if (
      !customer.phone ||
      isNaN(Number(customer.phone)) ||
      customer.phone.length != 10
    ) {
      setPhoneError("Nummer är obligatoriskt.");
      return;
    }
    navigate("../confirmation");
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      data-cy="customer-form"
      className="flex flex-1 flex-col items-center"
    >
      <Box mt={2}>
        <TextField
          label="Förnamn och efternamn"
          value={customer?.name}
          autoComplete="name"
          onChange={(e) => {
            setCustomer({ ...customer, name: e.target.value });
            setNameError("");
          }}
          inputProps={{
            "data-cy": "customer-name",
          }}
          variant="standard"
          helperText={
            nameError ? (
              <span data-cy="customer-name-error">{nameError}</span>
            ) : null
          }
          error={Boolean(nameError)}
        />

        <TextField
          label="Gatuadress"
          autoComplete="street-address"
          value={customer?.address}
          variant="standard"
          helperText={
            addressError ? (
              <span data-cy="customer-address-error">{addressError}</span>
            ) : null
          }
          error={Boolean(addressError)}
          onChange={(e) => {
            setCustomer({ ...customer, address: e.target.value });
            setAddressError("");
          }}
          inputProps={{
            "data-cy": "customer-address",
          }}
        />

        <TextField
          label="Postkod"
          autoComplete="postal-code"
          value={customer?.zipcode}
          variant="standard"
          helperText={
            zipcodeError ? (
              <span data-cy="customer-zipcode-error">{zipcodeError}</span>
            ) : null
          }
          error={Boolean(zipcodeError)}
          onChange={(e) => {
            setCustomer({ ...customer, zipcode: e.target.value });
            setZipcodeError("");
          }}
          inputProps={{
            "data-cy": "customer-zipcode",
          }}
        />

        <TextField
          label="Stad"
          autoComplete="address-level2"
          value={customer?.city}
          variant="standard"
          helperText={
            cityError ? (
              <span data-cy="customer-city-error">{cityError}</span>
            ) : null
          }
          error={Boolean(cityError)}
          onChange={(e) => {
            setCustomer({ ...customer, city: e.target.value });
            setCityError("");
          }}
          inputProps={{
            "data-cy": "customer-city",
          }}
        />

        <TextField
          label="Email"
          autoComplete="email"
          value={customer?.email}
          variant="standard"
          helperText={
            emailError ? (
              <span data-cy="customer-email-error">{emailError}</span>
            ) : null
          }
          error={Boolean(emailError)}
          onChange={(e) => {
            setCustomer({ ...customer, email: e.target.value });
            setEmailError("");
          }}
          inputProps={{
            "data-cy": "customer-email",
          }}
        />

        <TextField
          label="Telefonnummer"
          autoComplete="tel"
          value={customer?.phone}
          variant="standard"
          helperText={
            phoneError ? (
              <span data-cy="customer-phone-error">{phoneError}</span>
            ) : null
          }
          error={Boolean(phoneError)}
          onChange={(e) => {
            setCustomer({ ...customer, phone: e.target.value });
            setPhoneError("");
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
