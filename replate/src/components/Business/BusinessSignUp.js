import React, { useState, useEffect } from 'react';
import { Field, withFormik, Form } from 'formik';
import { Button, Header, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import handShake from '../../images/hands-helping-solid@2x.png';
import axios from 'axios';
import * as Yup from 'yup';

const Heading = styled.div`
  display: flex;
  margin-bottom: 8px;
`
const StyledH1 = styled.h1`
  position: relative;
  top: -18px;
  margin-left: 10px;
`
const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1F5C70;
`
const LeftContent = styled.div`
  width: 35%;
  text-align: center;
  margin-right: 10%;
`
const RightContent = styled.div`
  width: 60%;
`
const BackButton = styled.div`
  display: flex;
  justify-content: center;
  // border: 2px solid black;
  margin: 1rem 0;
  width: 100%; 
`

const BusinessSignUp = ({ errors, touched, values, status }) => {
  const [businesss, setBusinesss] = useState([]);
  console.log(businesss);

  useEffect(() => {
    if (status) {
      setBusinesss([...businesss, status]);
    }
  }, [status]);

  return (
    <MainContent>
      <LeftContent>
        <img src={handShake} className="handshakeicon" alt="Hand Shaking Icon" />
        <Header size='huge'>Business Sign Up</Header>
        <p>Thank you For your interest in Replate and joining the fight to end hunger.</p>
      </LeftContent>
      <RightContent>
        <Form>
          <Heading>
            <Icon name="user circle" />
            <StyledH1>Create Your Business Account</StyledH1>
          </Heading>
          <label>
            Business Name
            <Field
              component="input"
              type="text"
              name="username"
              placeholder="Name"
            />
          </label>
          {touched.username && errors.username && (
            <p className="error">{errors.username}</p>
          )}
          <label>
            Phone Number
            <Field
              component="input"
              type="tel"
              name="phone"
              placeholder="Phone Number"
            />
          </label>
          {touched.phone && errors.phone && (
            <p className="error">{errors.phone}</p>
          )}
          <label>
            Organization Name
            <Field
              component="input"
              type="text"
              name="organization_name"
              placeholder="Organization Name"
            />
          </label>
          {touched.organization_name && errors.organization_name && (
            <p className="error">{errors.organization_name}</p>
          )}
          <label>
            Business Address
            <Field
              component="input"
              type="text"
              name="address"
              placeholder="Address"
            />
          </label>
          {touched.address && errors.address && (
            <p className="error">{errors.username}</p>
          )}
          <label>
            Email
            <Field
              component="input"
              type="email"
              name="email"
              placeholder="Email"
            />
          </label>
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
          <label>
            Password
            <Field
              component="input"
              type="password"
              name="password"
              placeholder="Password"
            />
          </label>
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
          <label>
            Repeat Password
            <Field
              component="input"
              type="password"
              name="businessRepeatPassword"
              placeholder="Repeat Password"
            />
          </label>
          {touched.businessRepeatPassword && errors.businessRepeatPassword && (
            <p className="error">{errors.businessRepeatPassword}</p>
          )}
          <Button type="submit">Submit!</Button>
          <BackButton>
            <Link to="/signup"><Button type="submit">Back</Button></Link>
          </BackButton>
          {businesss.map((business) => (
            <p key={business.id}>{business.username}</p>
          ))
          }
        </Form>
      </RightContent>
    </MainContent>
  );
};

const formikHOC = withFormik({
  mapPropsToValues({ username, phone, organization_name, email, password, businessRepeatPassword, address }) {
    return {
      username: username || "",
      phone: phone || "",
      email: email || "",
      password: password || "",
      businessRepeatPassword: businessRepeatPassword || "",
      organization_name: organization_name || "",
      address: address || "",
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Please enter your name."),
    phone: Yup.number().required("Please enter your phone number."),
    email: Yup.string().required("Please enter a valid email address."),
    password: Yup.string().required("Please enter a password"),
    businessRepeatPassword: Yup.string().required("Passwords must match"),
    address: Yup.string().required("Please enter your address.")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    values.phone = parseInt(values.phone)

    const user = {
      username: values.username,
      password: values.password,
      organization_name: values.organization_name,
      address: values.address,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: values.address
    }
    console.log(values)
    axios
      .post("https://bw-replate.herokuapp.com/api/auth/business/register", user)
      .then(res => {
        console.log("handleSubmit: then: res: ", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.error("handleSubmit: catch: err: ", err));
  }
});
const BusinessSignUpWithFormik = formikHOC(BusinessSignUp);

export default BusinessSignUpWithFormik;