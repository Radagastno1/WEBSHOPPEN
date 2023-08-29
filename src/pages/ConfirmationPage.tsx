import { useCustomerContext } from "../CustomerContext";


export default function ConfirmationPage(){
     const { customer } = useCustomerContext();
    return(
        <div>
            Namn: {customer.name}
            Adress: {customer.address}
        </div>
    );
}