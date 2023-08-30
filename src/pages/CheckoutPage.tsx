import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerContext } from "../CustomerContext";

export default function OrderPage() {
  const { customer, setCustomer } = useCustomerContext();
  const navigate = useNavigate();

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
    } else if (!customer.zipcode) {
      setZipcodeError("Postkod är obligatoriskt.");
      return;
    } else if (!customer.city) {
      setCityError("Stad är obligatoriskt.");
      return;
    } else if (!customer.email) {
      setEmailError("Email är obligatoriskt.");
      return;
    } else if (!customer.phone) {
      setPhoneError("Nummer är obligatoriskt.");
      return;
    }
    navigate("../confirmation");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        data-cy="customer-form"
        className="flex flex-1 flex-col items-center w-80 bg-slate-300 rounded"
      >
          <Box mt={2}>
          <TextField
          label="Förnamn och efternamn"
          value={customer?.name}
          autoComplete="name"
          data-cy="customer-name"
          onChange={(e) => {
            setCustomer({ ...customer, name: e.target.value });
            setNameError("");
          }}
          variant="standard"
        />
        <p className="error-message text-red-800" data-cy="customer-name-error">
          {nameError}
        </p>
          </Box>
     

        <TextField
          label="Gatuadress"
          data-cy="customer-address"
          autoComplete="street-address"
          value={customer?.address}
          variant="standard"
          onChange={(e) => {
            setCustomer({ ...customer, address: e.target.value });
            setAddressError("");
          }}
        />
        <p
          className="error-message text-red-800"
          data-cy="customer-street-address-error"
        >
          {addressError}
        </p>

        <TextField
          label="Postkod"
          data-cy="customer-zipcode"
          autoComplete="postal-code"
          value={customer?.zipcode}
          variant="standard"
          onChange={(e) => {
            setCustomer({ ...customer, zipcode: e.target.value });
            setZipcodeError("");
          }}
        />
        <p
          className="error-message text-red-800"
          data-cy="customer-zipcode-error"
        >
          {zipcodeError}
        </p>

        <TextField
          label="Stad"
          data-cy="customer-city"
          autoComplete="address-level2"
          value={customer?.city}
          variant="standard"
          onChange={(e) => {
            setCustomer({ ...customer, city: e.target.value });
            setCityError("");
          }}
        />
        <p className="error-message text-red-800" data-cy="customer-city-error">
          {cityError}
        </p>

        <TextField
          label="Email"
          data-cy="customer-email"
          type="email"
          autoComplete="email"
          value={customer?.email}
          variant="standard"
          onChange={(e) => {
            setCustomer({ ...customer, email: e.target.value });
            setEmailError("");
          }}
        />
        <p className="error-message text-red-800" data-cy="customer-city-error">
          {emailError}
        </p>

        <TextField
          label="Telefonnummer"
          data-cy="customer-phone"
          autoComplete="tel"
          value={customer?.phone}
          variant="standard"
          onChange={(e) => {
            setCustomer({ ...customer, phone: e.target.value });
            setPhoneError("");
          }}
        />
        <p className="error-message text-red-800" data-cy="customer-city-error">
          {phoneError}
        </p>

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Bekräfta
          </Button>
        </Box>
      </form>
    </div>
  );
}
