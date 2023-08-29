import { useState } from "react";

// - `data-cy="customer-form"` formulär för att fylla i kunduppgifter på checkout-sidan.
// - `data-cy="customer-name"` kundens namn (som fylls i på checkout-sidan).
// - `data-cy="customer-address"` kundens gatuadress (som fylls i på checkout-sidan).
// - `data-cy="customer-zipcode"` kundens postnummer (som fylls i på checkout-sidan).
// - `data-cy="customer-city"` kundens stad (som fylls i på checkout-sidan).
// - `data-cy="customer-email"` kundens emailadress (som fylls i på checkout-sidan).
// - `data-cy="customer-phone"` kundens telefonnummer (som fylls i på checkout-sidan).
// - `data-cy="customer-name-error"` felmeddelande vid felaktigt angivet namn.
// - `data-cy="customer-address-error"` felmeddelande vid felaktigt angiven adress.
// - `data-cy="customer-zipcode-error"` felmeddelande vid felaktigt angivet postnummer.
// - `data-cy="customer-city-error"` felmeddelande vid felaktigt angiven stad.
// - `data-cy="customer-email-error"` felmeddelande vid felaktigt angiven emailadress.
// - `data-cy="customer-phone-error"`

export default function OrderPage() {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    zipcode: "",
    city: "",
    email: "",
    phone: ""
  })

  function handleSubmit(){
    alert("du har köpt något");
  }


  return (
    <div>
      <form onSubmit={handleSubmit} data-cy="customer-form" className="flex flex-col">

        <label htmlFor="name">Förnamn och efternamn</label>

        <input
          data-cy="customer-name"
          type="text"
          value={customer?.name}
          onChange={(e) => setCustomer({...customer, name: e.target.value})} 
        />

        <label>Gatuadress</label>
        <input
          data-cy="customer-address"
          type="text"
          value={customer?.address}
          onChange={(e) => setCustomer({...customer, address: e.target.value})} 
        />
        <label>Postkod</label>
        <input
          data-cy="customer-zipcode"
          type="number"
          value={customer?.zipcode}
          onChange={(e) => setCustomer({...customer, zipcode: e.target.value})} 
        />
        <label>Stad</label>
        <input
          data-cy="customer-city"
          type="text"
          value={customer?.city}
          onChange={(e) => setCustomer({...customer, city: e.target.value})} 
        />
        <label>Email</label>
        <input
          data-cy="customer-email"
          type="email"
          value={customer?.email}
          onChange={(e) => setCustomer({...customer, email: e.target.value})} 
        />
        <label>Telefon</label>
        <input
          data-cy="customer-phone"
          type="number"
          value={customer?.phone}
          onChange={(e) => setCustomer({...customer, phone: e.target.value})} 
        />
        <input type="submit" value="Bekräfta"/>
      </form>
    </div>
  );
}
