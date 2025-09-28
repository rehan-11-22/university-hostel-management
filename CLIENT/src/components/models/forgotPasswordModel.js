import React, { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    Container,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    Input,
    FormGroup,
    Form,
    FormFeedback,
    Spinner,
} from "reactstrap";
import axios from "axios";
import { BASE_URL } from "services/Helper";


const initialValues = {
    email: "",
    cnic: ""

}

function ForgotPassword(props) {
    const { isOpen, toggle, data } = props;
    //   const [isLoading, setIsLoading] = useState(false);

    // console.log("data =>", data);

    const [isLoading , setIsLoading ] = useState(false)

    const externalCloseBtn = (
        <button
            type="button"
            className="close"
            style={{ position: "absolute", top: "15px", right: "15px" }}
            onClick={toggle}
        >
            &times;
        </button>
    );

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        cnic: Yup.string()
            .matches(/^[0-9]{13}$/, 'CNIC must be 13 digits and cannot contain hyphens')
            .required('CNIC is Required'),
    });


    const handleSubmit = (values) => {
        setIsLoading(true)
        console.log("values ", values);
        axios.post(`${BASE_URL}/api/v1/users/staff/forgotpassword`, values)
            .then((res) => {
                console.log(res.data);
                window.notify('we sent your password to your email', 'success')
            })
            .catch((error) => {
                console.log("Error at rest password ", error.response.data.message);
                window.notify(`somthing went wrong`, 'error')
            })
            .finally(() => {
                setIsLoading(false)
                toggle()
            })
    }



    return (
        <div>
            <Modal
                isOpen={isOpen}
                toggle={toggle}
                external={externalCloseBtn}
                centered="true"
            >
                <ModalHeader className="fs-5">
                    <span className="fw-bold">Type : </span>
                    {data?.complaintType}
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                    }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label for="email">Enter Your Email</Label>
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            invalid={touched.email && !!errors.email}
                                                        />
                                                        <FormFeedback>{errors.email}</FormFeedback>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label for="cnic">Enter Your CNIC <small className="text-danger">(not use hyphens)</small></Label>
                                                        <Input
                                                            type="text"
                                                            name="cnic"
                                                            id="cnic"
                                                            value={values.cnic}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            invalid={touched.cnic && !!errors.cnic}
                                                        />
                                                        <FormFeedback>{errors.cnic}</FormFeedback>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Container>
                    <ModalFooter>
                        <Button color="warning" onClick={handleSubmit}>
                            {!isLoading
                                ? "Reset Password"
                                : <><Spinner size="sm">Loading...</Spinner><span>{' '}Loading</span></>
                            }
                        </Button>{' '}
                        <Button color="primary" onClick={toggle}>
                            Cancle
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ForgotPassword;
