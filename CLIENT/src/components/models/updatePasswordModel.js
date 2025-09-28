import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, Label, Input, FormFeedback, Container, Row, Col, Spinner, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import { BASE_URL } from 'services/Helper';
import { useAuth } from 'contexts/AuthContext';
import { useAlert } from 'contexts/AlertContext';

function UpdatePasswordModel(props) {
    const { isOpen, toggle } = props;
    const [isLoading, setIsLoading] = useState(false);

    const  showAlert  = useAlert()
    const { logout } = useAuth()

    const empDataUpdateSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        oldPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password Required"),
        newPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password Required"),
    });

    const handleSubmit = async (values) => {
        setIsLoading(true);
        console.log("updated values of employee profile ", values);

        axios.put(`${BASE_URL}/api/v1/users/staff/update/password`, values)
            .then((res) => {
                console.log("Response", res?.data?.message);
                // alert('Employee profile updated successfully.');
                showAlert(res?.data?.message, "success")
                logout()
            })
            .catch((error) => {
                console.log("Error at submitted modal data:", error);
                // alert('Failed to update employee profile.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const externalCloseBtn = (
        <button
            type="button"
            className="close"
            style={{ position: 'absolute', top: '15px', right: '15px' }}
            onClick={toggle}
        >
            &times;
        </button>
    );

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} external={externalCloseBtn} centered='true'>
                <ModalHeader>Update Your password</ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col>
                                <Formik initialValues={{ email: "", oldPassword: "", newPassword: "" }} validationSchema={empDataUpdateSchema} onSubmit={handleSubmit}>
                                    {({ values, errors, touched, handleChange, handleBlur }) => (
                                        <Form>


                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="text" name="email" id="email" value={values.email}
                                                    onChange={handleChange} onBlur={handleBlur} invalid={touched.email && !!errors.email} />
                                                {touched.email && errors.email ? <FormFeedback>{errors.email}</FormFeedback> : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="oldPassword">Old password</Label>
                                                <Input type="password" name="oldPassword" id="oldPassword" value={values.oldPassword}
                                                    onChange={handleChange} onBlur={handleBlur} invalid={touched.oldPassword && !!errors.oldPassword} />
                                                {touched.oldPassword && errors.oldPassword ? <FormFeedback>{errors.oldPassword}</FormFeedback> : null}
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="newPassword">New password</Label>
                                                <Input type="password" name="newPassword" id="newPassword" value={values.newPassword}
                                                    onChange={handleChange} onBlur={handleBlur} invalid={touched.newPassword && !!errors.newPassword} />
                                                {touched.newPassword && errors.newPassword ? <FormFeedback>{errors.newPassword}</FormFeedback> : null}
                                            </FormGroup>
                                            <Button className='px-4' type="submit" color="primary" disabled={isLoading}>
                                                {!isLoading ? "update Password" : <span><Spinner size="sm" color="light" />{' '}Loading...</span>}
                                            </Button>{' '}
                                            <Button color="secondary" onClick={toggle}>
                                                Cancel
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>
        </div >
    );
}

export default UpdatePasswordModel;
