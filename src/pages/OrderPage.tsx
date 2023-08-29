import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerContext } from "../CustomerContext";

// - `data-cy="customer-name-error"` felmeddelande vid felaktigt angivet namn.
// - `data-cy="customer-address-error"` felmeddelande vid felaktigt angiven adress.
// - `data-cy="customer-zipcode-error"` felmeddelande vid felaktigt angivet postnummer.
// - `data-cy="customer-city-error"` felmeddelande vid felaktigt angiven stad.
// - `data-cy="customer-email-error"` felmeddelande vid felaktigt angiven emailadress.
// - `data-cy="customer-phone-error"`

export default function OrderPage() {
    const { customer, setCustomer } = useCustomerContext();
    const navigate = useNavigate();
    
    const [nameError, setNameError] = useState('');


  function handleSubmit(e: any) {
    e.preventDefault();
    if (!customer.name) {
        setNameError('Förnamn och efternamn är obligatoriskt.');
        return; 
    }
    navigate('../confirmation');
  }

  return (
    <div className='flex flex-col'>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        data-cy="customer-form"
        className="flex flex-col"
      >
        <label>Förnamn och efternamn</label>

        <input
          data-cy="customer-name"
          type="text"
          autoComplete="name"
          value={customer?.name}
          onChange={(e) => {
            setCustomer({ ...customer, name: e.target.value });
            setNameError('');
        }}
        />
        <p className="error-message text-red-800" data-cy="customer-name-error">{nameError}</p>

        <label>Gatuadress</label>
        <input
          data-cy="customer-address"
          type="text"
          autoComplete="street-address"
          value={customer?.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
        
        />
        <label>Postkod</label>
        <input
          data-cy="customer-zipcode"
          type="number"
          autoComplete="postal-code"
          value={customer?.zipcode}
          onChange={(e) =>
            setCustomer({ ...customer, zipcode: e.target.value })
          }
         
        />
        <label>Stad</label>
        <input
          data-cy="customer-city"
          type="text"
          autoComplete="address-level2"
          value={customer?.city}
          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
       
        />
        <label>Email</label>
        <input
          data-cy="customer-email"
          type="email"
          autoComplete="email"
          value={customer?.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
       
        />
        <label>Telefon</label>
        <input
          data-cy="customer-phone"
          type="number"
          autoComplete="tel"
          value={customer?.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
       
        />
        <input type="submit" value="Bekräfta" />
      </form>
    </div>
  );
}
