import '../../styles/PaymentMethod.css';
import { Form,FormGroup } from 'reactstrap';
const PaymentMethod = () => {
    const submitHandler = (event) => {
        event.preventDefault();
    };
    return (
    <>
        <Form onSubmit={submitHandler}>
            <div className="payment">
                <label htmlFor="" for="dbt" className="d-flex align-items-center gap-2">
                    <input type="radio" id='dbt' name='payment'/> Direct Bank Transfer
                </label>
            </div>
            <div className="payment">
                <label htmlFor="" for="cp" className="d-flex align-items-center gap-2">
                    <input type="radio" id="cp" name='payment'/> Cheque Payment
                </label>
            </div>
            <div className="payment">
                <label htmlFor="" for="mc" className="d-flex align-items-center gap-2">
                    <input type="radio" id='mc' name='payment'/> Master Card
                </label>
                <img src="/src/assets/MasterCard_logo.jpg" alt="masterCard.img" style={{
                    maxWidth: "150px"
                }}/>
            </div>
            <div className="payment">
                <label htmlFor="" for="paypal" className="d-flex align-items-center gap-2">
                    <input type="radio" id="paypal" name='payment'/>Paypal
                </label>
                <img src="/src/assets/paypal_logo.jpg" alt="masterCard.img" style={{
                    maxWidth: "150px"
                }}/>
            </div>
        </Form>
    </>
    )
}

export default PaymentMethod;