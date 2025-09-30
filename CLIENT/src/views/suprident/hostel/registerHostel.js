import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
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
import { Box } from "@chakra-ui/react";
import axios from "axios";
// import { useAlert } from 'contexts/AlertContext';
import { BASE_URL } from "services/Helper";

const RegisterHostel = () => {
  const initialValues = {
    name: "",
    location: "",
    floors: [{ number: "", rooms: [{ roomNumber: "", capacity: "" }] }],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    floors: Yup.array()
      .of(
        Yup.object({
          number: Yup.number().required("Required").positive().integer(),
          rooms: Yup.array().of(
            Yup.object({
              roomNumber: Yup.string().required("Required"),
              capacity: Yup.number().required("Required").positive().integer(),
            })
          ),
        })
      )
      .required("Must have at least one floor"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
    axios
      .post(`${BASE_URL}/api/v1/hostel/register`, values)
      .then((res) => {
        const msg = res?.data?.message;
        console.log("response of register hsotel ==>", res);
        window.notify(msg, "success");
      })
      .catch((err) => {
        const errorMSG = err?.response?.data?.message;
        console.log("Error at register hostel ==>", err);

        window.notify(errorMSG, "error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className="mt-2">
      <Container>
        <h1 className="text-center fw-bold fs-2">Register New Hostel</h1>
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
            isSubmitting,
          }) => (
            <Form>
              <FormGroup>
                <Label for="name">Hostel Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Hostel Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.name && !!errors.name}
                />
                {touched.name && errors.name ? (
                  <FormFeedback>{errors.name}</FormFeedback>
                ) : null}
              </FormGroup>

              <FormGroup>
                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.location && !!errors.location}
                />
                {touched.location && errors.location ? (
                  <FormFeedback>{errors.location}</FormFeedback>
                ) : null}
              </FormGroup>

              <FieldArray name="floors">
                {({ insert, remove, push }) => (
                  <div>
                    {values.floors.length > 0 &&
                      values.floors.map((floor, index) => (
                        <div key={index}>
                          <FormGroup>
                            <Label for={`floors.${index}.number`}>
                              Floor Number
                            </Label>
                            <Input
                              type="number"
                              name={`floors.${index}.number`}
                              placeholder="Floor Number"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              invalid={
                                touched.floors?.[index]?.number &&
                                !!errors.floors?.[index]?.number
                              }
                            />
                          </FormGroup>

                          <FieldArray name={`floors.${index}.rooms`}>
                            {({ insert, remove, push }) => (
                              <div>
                                {floor.rooms.map((room, roomIndex) => (
                                  <Row key={roomIndex}>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label
                                          for={`floors.${index}.rooms.${roomIndex}.roomNumber`}
                                        >
                                          Room Number
                                        </Label>
                                        <Input
                                          type="number"
                                          name={`floors.${index}.rooms.${roomIndex}.roomNumber`}
                                          placeholder="Room Number"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          invalid={
                                            touched.floors?.[index]?.rooms?.[
                                              roomIndex
                                            ]?.roomNumber &&
                                            !!errors.floors?.[index]?.rooms?.[
                                              roomIndex
                                            ]?.roomNumber
                                          }
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                      <FormGroup>
                                        <Label
                                          for={`floors.${index}.rooms.${roomIndex}.capacity`}
                                        >
                                          Capacity
                                        </Label>
                                        <Input
                                          type="number"
                                          name={`floors.${index}.rooms.${roomIndex}.capacity`}
                                          placeholder="Capacity"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          invalid={
                                            touched.floors?.[index]?.rooms?.[
                                              roomIndex
                                            ]?.capacity &&
                                            !!errors.floors?.[index]?.rooms?.[
                                              roomIndex
                                            ]?.capacity
                                          }
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md={4} className="offset-md-4">
                                      <Button
                                        className="w-100"
                                        color="danger"
                                        onClick={() => remove(roomIndex)}
                                      >
                                        Remove Room
                                      </Button>
                                    </Col>
                                  </Row>
                                ))}
                                <Row className="my-1">
                                  <Col md={4} className="offset-md-4">
                                    <Button
                                      className="w-100"
                                      color="primary"
                                      onClick={() =>
                                        push({ roomNumber: "", capacity: "" })
                                      }
                                    >
                                      Add Room
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </FieldArray>
                          <Row className="my-1">
                            <Col md={4} className="offset-md-4">
                              <Button
                                className="w-100"
                                color="danger"
                                onClick={() => remove(index)}
                              >
                                Remove Floor
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    <Row className="my-1">
                      <Col md={4} className="offset-md-4">
                        <Button
                          className="w-100"
                          color="primary"
                          onClick={() =>
                            push({
                              number: "",
                              rooms: [{ roomNumber: "", capacity: "" }],
                            })
                          }
                        >
                          Add Floor
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </FieldArray>

              <Button
                className="px-4"
                type="submit"
                disabled={isSubmitting}
                color="success"
              >
                {!isSubmitting ? (
                  "Register"
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
      </Container>
    </Box>
  );
};

export default RegisterHostel;
