import React, { useState, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { payment_checkout_session, subscribe_company } from './Fetch';
import {
    Button,
} from '@material-ui/core';

const stripePromise = loadStripe("pk_test_51IQvydFtFjSnQZFTWLU3u4zOy56gTGIPGfR3aqt2XFarsqEhiSnWHuttGTuttKtS9uLzYvNzSPsGi1r5FDFweE9100W4Nnilnr");

export default function CompanyEntrancePayment(props) {
    const [result, setResult] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        console.log(query);

        if (query.get("success")) {
            subscribe_company(props.company.id);
            setResult(true);
        }
        if (query.get("canceled")) {
            setResult(false);
        }
      }, []);

    const handleClick = async () => {
        const stripe = await stripePromise;

        const session = await payment_checkout_session(props.company.id);

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,        
        });

        if (result.error) {
            return  <div>
                        <h3>Oops! An error ocurred with the payment</h3>
                    </div>
        }
    }

    return  <div>
                {result ?
                    <p> Congratulations! </p> :
                    <Button color="primary" variant="outlined" onClick={handleClick}>Pay your damn bills</Button>
                }
            </div>
            
}