import React, { useState } from 'react'
import styled from 'styled-components';
import numeral from 'numeral';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 3rem 0;
    max-width: 900px;
    margin: auto;
    h1 {
        font-size: 35px;
        font-weight: 500;
        color: #2a6779;
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    h3 {
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        margin-top: 3rem;
        background: #fff;
        padding: 3rem;
        color: #2a6279;
        border-radius: 1rem;
        box-shadow: 0 0 1px 0 rgba(8, 11 14, 0.06),
            0 6px 6px -1px rgba(8, 11, 14, 0.1);
    }
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 1rem;
    }
`;

const InputSection = styled.div`
    width: 45%;
    min-width: 350px;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    label {
        text-transform: uppercase;
        font-weight: 400;
        color: gray;
        margin-bottom: 0.5rem;
    }
    input {
        background: rgba(255, 255, 255, 0.3);
        height: 35px;
        border: none;
        border-radius: 10px;
        padding: 0 1rem;
        color: #2a6279;
        font-weight: 500;
        box-shadow:  0 0 1px 0 rgba(8, 11, 14, 0.06), 
        0 6px 6px -1px rgba( 8, 11, 14, 0.1);
        transition: all 0.3s ease-in-out;
        &:hover, 
        &:focus {
            box-shadow:  0 0 1px 0 rgba(8, 11, 14, 0.06), 
        0 16px 16px -1px rgba( 8, 11, 14, 0.1)
        }
    }
`;

const SubmitButton = styled.button`
    background-color: #d8a051;
    color: #fff;
    border: none;
    width: 150px;
    height: 36px;
    font-family: 'Oswald', sans-serif;
    font-size: 14px;
    letter-spacing: 0.03rem;
    line-height: 36px;
    border-radius: 2px;
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 
        0 6px 6px -1px rgba( 8, 11, 14, 0.1);
    &:hover {
        box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 
        0 16px 16px -1px rgba( 8, 11, 14, 0.1);
    }

`;

const Error = styled.h4`
    color: red;
    font-size: 13px;
    margin-bottom: 1rem;
`;

const FormContainer = () => {
    const [purchasePrice, setPurchasePrice] = useState("");
    const [downPayment, setDownPayment] = useState("");
    const [loanTerm, setLoanTerm] = useState("");
    const [loanApr, setLoanApr] = useState("");
    const [monthlyPayments, setMonthlyPayments] = useState(0.0);
    
     const submitCalculation = async (e) => {
        e.preventDefault();

        //Validate fields
        const validatedPrice = await validateField(purchasePrice, setPurchasePrice);
        const validatedPayment = await validateField(downPayment, setDownPayment);
        const validatedLoanTerm = await validateField(loanTerm, setLoanTerm);
        const validatedApr = await validateField(loanApr, setLoanApr);

        //Calculate Values
        if(
            validatedPrice &&
            validatedPayment &&
            validatedLoanTerm &&
            validatedApr
        )
        console.log("Form is fully validated");
        calculateValues();
     }

     const calculateValues = () => {
        // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]. 
        // M = Total monthly payment
        // P = The total amount of your loan
        // I = Your interest rate, as a monthly percentage
        // N = The total amount of months in your timeline for paying off your mortgage
        let principal = purchasePrice - downPayment;
        let monthlyIntrest = loanApr / 100 / 12;
        let numberOfpayments = loanTerm * 12;
        let monthlyPrice = 
            (principal *
                [monthlyIntrest * (1 + monthlyIntrest) ** numberOfpayments]) /
            [(1 + monthlyIntrest) ** numberOfpayments - 1];
            setMonthlyPayments(monthlyPrice);
            console.log({ principal});
     }

     const validateField = (field, setvalue) => {
        let int = parseFloat(field);
        if(field === "" || field === 0) {
            setvalue({...field.values, error: "Please enter a value"});
            return false;
        } else if(isNaN(int)) {
            setvalue({...field.values, error: "Please enter a number"});
            return false;
        } else {
            setvalue(int);
            return true;
        }
     };

    return (
    <Container>
        <h1>Mortgage Calculator</h1>
        <form>
            <InputSection>
                <label>Purchase Price</label>
                <Error>{purchasePrice.error}</Error>
                <input 
                onChange = {(e) => setPurchasePrice(e.target.value)}
                type = 'text'/>
            </InputSection>
            <InputSection>
                <label>Down Payment</label>
                <Error>{downPayment.error}</Error>
                <input 
                onChange = {(e) => setDownPayment(e.target.value)}
                type = 'text'/>
            </InputSection>
            <InputSection>
                <label>Loan Term</label>
                <Error>{loanTerm.error}</Error>
                <input 
                onChange = {(e) => setLoanTerm(e.target.value)}
                type = 'text'/>
            </InputSection>
            <InputSection>
                <label>APR (%)</label>
                <Error>{loanApr.error}</Error>
                <input 
                onChange = {(e) => setLoanApr(e.target.value)}
                type = 'text'/>
            </InputSection>
        </form>
        <SubmitButton
        onClick={(e) => submitCalculation(e)}
        >Calculate</SubmitButton>
        <h3>Estimated Monthly Payments: {numeral(monthlyPayments).format("$0,0.00")}</h3>
    </Container>
  )
}

export default FormContainer