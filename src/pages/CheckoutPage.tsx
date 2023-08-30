import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerContext } from "../CustomerContext";
import { addCustomerToLS } from "../localstorage";

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
      setNameError("Förnamn och efternamn är obligatoriskt.");
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
      setPhoneError("Telefonnummer är obligatoriskt.");
      return;
    }
    addCustomerToLS(customer);
    navigate("../confirmation");
  }

  return (
    <div className="flex flex-col">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        data-cy="customer-form"
        className="flex flex-col items-center"
      >
        <label>Förnamn och efternamn</label>

        <input
          data-cy="customer-name"
          type="text"
          autoComplete="name"
          value={customer?.name}
          onChange={(e) => {
            setCustomer({ ...customer, name: e.target.value });
            setNameError("");
          }}
          className="bg-gray-100 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <p className="error-message text-red-800" data-cy="customer-name-error">
          {nameError}
        </p>

        <label>Gatuadress</label>
        <input
          data-cy="customer-address"
          type="text"
          autoComplete="street-address"
          value={customer?.address}
          onChange={(e) => {
            setCustomer({ ...customer, address: e.target.value });
            setAddressError("");
          }}
          className="bg-gray-100 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <p
          className="error-message text-red-800"
          data-cy="customer-street-address-error"
        >
          {addressError}
        </p>

        <label>Postkod</label>
        <input
          data-cy="customer-zipcode"
          type="number"
          autoComplete="postal-code"
          value={customer?.zipcode}
          onChange={(e) => {
            setCustomer({ ...customer, zipcode: e.target.value });
            setZipcodeError("");
          }}
          className="bg-gray-100 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <p
          className="error-message text-red-800"
          data-cy="customer-zipcode-error"
        >
          {zipcodeError}
        </p>

        <label>Stad</label>
        <input
          data-cy="customer-city"
          type="text"
          autoComplete="address-level2"
          value={customer?.city}
          onChange={(e) => {
            setCustomer({ ...customer, city: e.target.value });
            setCityError("");
          }}
          className="bg-gray-100 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <p className="error-message text-red-800" data-cy="customer-city-error">
          {cityError}
        </p>

        <label>Email</label>
        <input
          data-cy="customer-email"
          type="email"
          autoComplete="email"
          value={customer?.email}
          onChange={(e) => {
            setCustomer({ ...customer, email: e.target.value });
            setEmailError("");
          }}
          className="bg-gray-100 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <p className="error-message text-red-800" data-cy="customer-city-error">
          {emailError}
        </p>

        <label>Telefon</label>
        <input
          data-cy="customer-phone"
          type="number"
          autoComplete="tel"
          value={customer?.phone}
          onChange={(e) => {
            setCustomer({ ...customer, phone: e.target.value });
            setPhoneError("");
          }}
          className="bg-gray-100 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <p className="error-message text-red-800" data-cy="customer-city-error">
          {phoneError}
        </p>

        <input type="submit" value="Bekräfta" className="p-2 bg-blue-200 rounded mt-1  focus:ring-blue-00" />
      </form>
    </div>
  );
}
