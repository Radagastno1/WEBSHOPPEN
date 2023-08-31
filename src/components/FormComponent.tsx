import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerContext } from "../CustomerContext";
import "../media.css";


export default function FormComponent()
{
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
      } else if (!customer.zipcode || isNaN(Number(customer.zipcode)) || customer.zipcode.length != 5) {
        setZipcodeError("Postkod är obligatoriskt.");
        return;
      } else if (!customer.city) {
        setCityError("Stad är obligatoriskt.");
        return;
      } else if (!customer.email || !customer.email.includes("@")) {
        setEmailError("Email är obligatoriskt.");
        return;
      } else if (!customer.phone || isNaN(Number(customer.phone)) || customer.phone.length != 10) {
        setPhoneError("Nummer är obligatoriskt.");
        return;
      }
      localStorage.removeItem("order");
      navigate("../confirmation");
    }
    
    return(
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
  />
  {nameError && (
    <Typography
      className="error-message text-red-800"
      data-cy="customer-name-error"
    >
      {nameError}
    </Typography>
  )}
</Box>

<TextField
  label="Gatuadress"
  autoComplete="street-address"
  value={customer?.address}
  variant="standard"
  onChange={(e) => {
    setCustomer({ ...customer, address: e.target.value });
    setAddressError("");
  }}
  inputProps={{
    "data-cy": "customer-address",
  }}
/>
{addressError && (
  <Typography
    className="error-message text-red-800"
    data-cy="customer-address-error"
  >
    {addressError}
  </Typography>
)}

<TextField
  label="Postkod"
  autoComplete="postal-code"
  value={customer?.zipcode}
  variant="standard"
  onChange={(e) => {
    setCustomer({ ...customer, zipcode: e.target.value });
    setZipcodeError("");
  }}
  inputProps={{
    "data-cy": "customer-zipcode",
  }}
/>
{zipcodeError && (
  <Typography
    className="error-message text-red-800"
    data-cy="customer-zipcode-error"
  >
    {zipcodeError}
  </Typography>
)}

<TextField
  label="Stad"
  autoComplete="address-level2"
  value={customer?.city}
  variant="standard"
  onChange={(e) => {
    setCustomer({ ...customer, city: e.target.value });
    setCityError("");
  }}
  inputProps={{
    "data-cy": "customer-city",
  }}
/>
{cityError && (
  <Typography
    className="error-message text-red-800"
    data-cy="customer-city-error"
  >
    {cityError}
  </Typography>
)}

<TextField
  label="Email"
  autoComplete="email"
  value={customer?.email}
  variant="standard"
  onChange={(e) => {
    setCustomer({ ...customer, email: e.target.value });
    setEmailError("");
  }}
  inputProps={{
    "data-cy": "customer-email",
  }}
/>
{emailError && (
  <Typography
    className="error-message text-red-800"
    data-cy="customer-email-error"
  >
    {emailError}
  </Typography>
)}

<TextField
  label="Telefonnummer"
  autoComplete="tel"
  value={customer?.phone}
  variant="standard"
  onChange={(e) => {
    setCustomer({ ...customer, phone: e.target.value });
    setPhoneError("");
  }}
  inputProps={{
    "data-cy": "customer-phone",
  }}
/>
{phoneError && (
  <Typography
    className="error-message text-red-800"
    data-cy="customer-phone-error"
  >
    {phoneError}
  </Typography>
)}

<Box mt={2}>
  <Button type="submit" variant="contained" color="primary">
    Bekräfta
  </Button>
</Box>
</form>
    );
}