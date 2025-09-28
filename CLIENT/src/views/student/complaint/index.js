import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "services/Helper";
const intialData = {
  email: "",
  complaintType: "",
  description: "",
};

function Index() {
  const [cState, setCState] = useState(intialData);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCState((cState) => ({ ...cState, [name]: value }));
  };

  const handleSubmit = (e) => {
    // Handle submission logic here
    e.preventDefault();
    setIsLoading(true)
    console.log("complaintState =>", cState);
    axios
      .post(`${BASE_URL}/api/v1/users/student/complaint`, cState)
      .then((res) => {
        console.log("Res ", res);
        window.notify(res?.data?.message, "success")
      })
      .catch((err) => {
        console.log("Error ", err);
        window.notify("Not register || Due to Some issue", "error")

      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box
      p={{ base: "130px", md: "80px", xl: "30px" }}
      className="p-4 rounded bg-white "
      style={{ marginTop: "80px" }}
    >
      <Container>
        <Row>
          <Col className="text-center my-5" style={{ fontSize: "20px" }}>
            <h1 className="fs-3 fw-bold">Student Complaint Form</h1>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div
              className="p-2 rounded"
              style={{ marginBottom: "20px", backgroundColor: "#caf0f8" }}
            >
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">
                    Email <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    // value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="issue">
                    Select Issue <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="select"
                    name="complaintType"
                    id="issue"
                    // value={issue}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an issue</option>
                    <option value="management">Management issue</option>
                    <option value="cleaning">Cleaning issue</option>
                    <option value="meal">Meal issue</option>
                    <option value="other">Other</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="issue">
                    Description <span className="text-danger">*</span>
                  </Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Briefly explain your issue"
                    // value={description}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Hide my identity
                  </Label>
                </FormGroup>
                <div className="text-center">
                  <Button color="primary" type="submit">
                    {!isLoading ? (
                      "Submit"
                    ) : (
                      <>
                        <Spinner size="sm">Loading...</Spinner>
                        <span> Loading</span>
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
          <Col md="6">
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              <h3 className="fs-4 fw-bold">Emergency Information</h3>
              <p>
                Emergency Call Number:{" "}
                <span className="text-primary">0343-3748928</span>
              </p>
              <p>Call facility is only available between 8AM to 4PM</p>
            </div>
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <h3 className="fs-4 fw-bold">Announcement section</h3>
              <p>Emergency Email: emergency@example.com</p>
              <p>Emergency Text Number: 987-654-3210</p>
            </div>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default Index;
