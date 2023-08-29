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

export default function OrderPage(){

    const [customer, setCustomer] = 
    useState<{name: string, address: string, zipcode: number, city: string, email: string, phone: string}>();

    function handleChange(){

    }


    return(
        <div>
            <form data-cy="customer-form" className="flex flex-col">
                <label>Förnamn och efternamn</label>
                <input data-cy="customer-name"
          type="text" 
          value={customer?.name}
          onChange={(e) => handleChange(e)}
        />
            <label>Gatuadress</label>
                <input data-cy="customer-address"
          type="text" 
          value={customer?.address}
          onChange={(e) => handleChange(e)}
        />
             <label>Postkod</label>
                <input data-cy="customer-zipcode"
          type="number" 
          value={customer?.zipcode}
          onChange={(e) => handleChange(e)}
        />
             <label>Stad</label>
                <input data-cy="customer-city"
          type="text" 
          value={customer?.city}
          onChange={(e) => handleChange(e)}
        />
             <label>Email</label>
                <input data-cy="customer-email"
          type="email" 
          value={customer?.email}
          onChange={(e) => handleChange(e)}
        />
             <label>Telefon</label>
                <input data-cy="customer-phone"
          type="number" 
          value={customer?.phone}
          onChange={(e) => handleChange(e)}
        />


        <input type="submit" />
            </form>
        </div>
    );
}