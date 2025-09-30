import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Container,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { BASE_URL } from "services/Helper";

const initialValues = {
  feeType: "",
  addmissionFee: 0,
  messSecurity: 0,
  hostelSecurity: 0,
  utensilCharges: 0,
  hostelIdentityCardFee: 0,
  roomRent: 0,
  messCharges: 0,
  electricityCharges: 0,
  gassCharges: 0,
  maintenancesCharges: 0,
  commonRoomFee: 0,
  newsPaperPlussTelephoneCharges: 0,
  waterCharges: 0,
  fine: 0,
  bankName: "",
  accountNumber: "",
};

const FeeGenerationForm = () => {
  const validationSchema = Yup.object({
    feeType: Yup.string().required("Feetype is Required"),
    bankName: Yup.string().required("Bank Name is Required"),
    // accountNumber: Yup.string().required('Account Number is Required'),
    accountNumber: Yup.string()
      .matches(/^\d{14}$/, "Account Number must be exactly 14 digits")
      .required("Account Number is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Value for fee genration ", values);
    setSubmitting(false);

    axios
      .post(`${BASE_URL}/api/v1/fee/create`, values)
      .then((res) => {
        console.log("Res of fee genration ", res?.data?.message);
        window.notify(`${res?.data?.message}`, "success");
        resetForm();
      })
      .catch((err) => {
        console.log("Error at fee generation", err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className="mt-2">
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
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="feeType">Fee type</Label>
                    <Input
                      type="select"
                      name="feeType"
                      id="feeType"
                      value={values.feeType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.feeType && !!errors.feeType}
                    >
                      <option value="">Select feeType</option>
                      <option value="hostel">Hostel</option>
                      <option value="mess">Mess</option>
                      <option value="hostelSecurity">Hostel Security</option>
                      <option value="messSecurity">Mess security</option>
                      <option value="other">Other</option>
                    </Input>
                    <FormFeedback>{errors.feeType}</FormFeedback>
                  </FormGroup>

                  <h3 className="fw-bold">Attributes:</h3>
                  <Row>
                    {values.feeType === "hostel" && (
                      <>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="addmissionFee">Addmission Fee</Label>
                            <Input
                              type="number"
                              name="addmissionFee"
                              id="addmissionFee"
                              value={values.addmissionFee}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="utensilCharges">Utensil Charges</Label>
                            <Input
                              type="number"
                              name="utensilCharges"
                              id="utensilCharges"
                              value={values.utensilCharges}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="hostelIdentityCardFee">
                              Hostel ID Card Fee
                            </Label>
                            <Input
                              type="number"
                              name="hostelIdentityCardFee"
                              id="hostelIdentityCardFee"
                              value={values.hostelIdentityCardFee}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="electricityCharges">
                              Electricity Charges
                            </Label>
                            <Input
                              type="number"
                              name="electricityCharges"
                              id="electricityCharges"
                              value={values.electricityCharges}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="gassCharges">Gass Charges</Label>
                            <Input
                              type="number"
                              name="gassCharges"
                              id="gassCharges"
                              value={values.gassCharges}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="maintenancesCharges">
                              Maintainces Charges
                            </Label>
                            <Input
                              type="number"
                              name="maintenancesCharges"
                              id="maintenancesCharges"
                              value={values.maintenancesCharges}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="commonRoomFee">Common Room Fee</Label>
                            <Input
                              type="number"
                              name="commonRoomFee"
                              id="commonRoomFee"
                              value={values.commonRoomFee}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>

                        <Col md={4}>
                          <FormGroup>
                            <Label for="waterCharges">Water Charges</Label>
                            <Input
                              type="number"
                              name="waterCharges"
                              id="waterCharges"
                              value={values.waterCharges}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="newsPaperPlussTelephoneCharges">
                              News Paper and Telephone charges
                            </Label>
                            <Input
                              type="number"
                              name="newsPaperPlussTelephoneCharges"
                              id="newsPaperPlussTelephoneCharges"
                              value={values.newsPaperPlussTelephoneCharges}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </>
                    )}
                    {values.feeType === "messSecurity" && (
                      <Col md={4}>
                        <FormGroup>
                          <Label for="messSecurity">Mess Security</Label>
                          <Input
                            type="number"
                            name="messSecurity"
                            id="messSecurity"
                            value={values.messSecurity}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    )}
                    {values.feeType === "hostelSecurity" && (
                      <Col md={4}>
                        <FormGroup>
                          <Label for="hostelSecurity">Hostel Security</Label>
                          <Input
                            type="number"
                            name="hostelSecurity"
                            id="hostelSecurity"
                            value={values.hostelSecurity}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    )}

                    {values.feeType === "hostelSecurity" && (
                      <Col md={4}>
                        <FormGroup>
                          <Label for="roomRent">Room Rent</Label>
                          <Input
                            type="number"
                            name="roomRent"
                            id="roomRent"
                            value={values.roomRent}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    )}
                    {values.feeType === "mess" && (
                      <Col md={4}>
                        <FormGroup>
                          <Label for="messCharges">Mess Charges</Label>
                          <Input
                            type="number"
                            name="messCharges"
                            id="messCharges"
                            value={values.messCharges}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    )}

                    <Col md={4}>
                      <FormGroup>
                        <Label for="fine">Fine</Label>
                        <Input
                          type="number"
                          name="fine"
                          id="fine"
                          value={values.fine}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="bankName">Bank Name</Label>
                        <Input
                          type="text"
                          name="bankName"
                          id="bankName"
                          value={values.bankName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.bankName && !!errors.bankName}
                        />
                        <FormFeedback>{errors.bankName}</FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label for="accountNumber">Account Number</Label>
                        <Input
                          type="text"
                          name="accountNumber"
                          id="accountNumber"
                          value={values.accountNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            touched.accountNumber && !!errors.accountNumber
                          }
                        />
                        <FormFeedback>{errors.accountNumber}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button type="submit" disabled={isSubmitting}>
                    {!isSubmitting ? (
                      "Genrate Fee"
                    ) : (
                      <>
                        <Spinner size="sm">Loading...</Spinner>
                        <span> Loading</span>
                      </>
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default FeeGenerationForm;
