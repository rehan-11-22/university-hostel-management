import React from "react";
import { Box } from "@chakra-ui/react";

import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import axios from "axios";
import { useState } from "react";

import { departments } from "api/restApi/departmentApi";

const formData = {
  username: "",
  email: "",
  fullname: "",
  religion: "",
  address: "",
  phone: "",
  maritalStatus: "",
  nationality: "",
  state: "",
  city: "",
  cnic: "",
  dob: "",
  avatar: "",
  gender: "",
  deptt: "",
  discipline: "",
  MorEve: "",
};
function Index() {
  const [formData, setFormData] = useState()
 const [imageUrl , setImageUrl] =  useState(null)
 const [gender , setGenger] = useState("female")

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name =>", name);
    console.log("value =>", value);
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.Image = imageUrl
    formData.gender  = gender
    console.log(formData);

  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className="mt-2">
      <Container fluid>
        {/* Render Breadcrumbs */}
        <Row>
          <Col xs="12">
            {/* Render Email SideBar */}
            <Card>
              <CardBody>
                <h3 className="card-title text-center mb-4 fs-3 fw-bold">
                  Student Hostal Pre-Enrollment Form
                </h3>

                <Form onSubmit={handleSubmit}>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="username">
                          Username <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          //   value={username}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="fullname">
                          Full Name <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="fullname"
                          id="fullname"
                          //   value={fullname}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email">
                          Email <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          //   value={email}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="phone">
                          Phone Number <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="tel"
                          name="phone"
                          id="phone"
                          //   value={phone}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="cnic">
                          CNIC <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="cnic"
                          id="cnic"
                          //   value={cnic}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label for="religion">
                          Religion <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="religion"
                          id="religion"
                          //   value={religion}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="maritalStatus">
                          Marital Status <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="select"
                          name="maritalStatus"
                          id="maritalStatus"
                          //   value={maritalStatus}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="nationality">
                          Nationality <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="nationality"
                          id="nationality"
                          //   value={nationality}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="state">
                          State <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="state"
                          id="state"
                          //   value={state}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="city">
                          City <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="city"
                          id="city"
                          //   value={city}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="address">
                          Home Address <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="address"
                          id="address"
                          //   value={address}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="dob">
                          Date of Birth <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="date"
                          name="dob"
                          id="dob"
                          //   value={dob}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label htmlFor="avatar">
                          Avatar <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          name="avatar"
                          type="file"
                          id="avatar"
                          onChange={(e)=>{setImageUrl(e.target.files[0])}}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6} className="mt-4">
                      <FormGroup tag="fieldset">
                        <h4
                          className="fw-bold mt-md-3"
                          style={{
                            display: "inline-block",
                            marginRight: "10px",
                            marginLeft: "5px",
                          }}
                        >
                          Gender :
                        </h4>
                        <FormGroup check inline>
                          <Label check>
                            <Input
                              type="radio"
                              name="gender"
                              value="male"
                               
                              onChange={(e)=>{setGenger(e.target.value)}}
                              
                            />{" "}
                            Male
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Label check>
                            <Input
                              type="radio"
                              name="gender"
                              value="female"
                              checked
                              onChange={(e)=>{setGenger(e.target.value)}}
                              
                            />{" "}
                            Female
                          </Label>
                        </FormGroup>
                        <FormGroup check inline>
                          <Label check>
                            <Input
                              type="radio"
                              name="gender"
                              value="other"
                              
                              onChange={(e)=>{setGenger(e.target.value)}}
                            />{" "}
                            Other
                          </Label>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* departmantal informantion */}
                  <Row>
                    <h2 className="card-title text-center fs-4 fw-bold my-3">
                      Unversity Details
                    </h2>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="deptt">
                          Department <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="deptt"
                          id="deptt"
                          //   value={state}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="city">
                          Discipline <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="discipline"
                          id="discipline"
                          //   value={city}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="Mor/Eve">
                          Session <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="session"
                          id="session"
                          //   value={city}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="Mor/Eve">
                          Mor/Eve <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="select"
                          name="morEve"
                          id="morEve"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Session</option>
                          <option value="Morning">Morning</option>
                          <option value="Evening">Evening</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className="text-center mt-md-3">
                    <Button color="danger" type="submit">
                      Enroll Now
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default Index;
