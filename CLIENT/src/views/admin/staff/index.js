import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form,
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

// initialValues
const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  fullname: "",
  cnic: "",
  gender: "",
  role: "",
  avatar: null,
};

const RegisterStaff = () => {
  // const showAlert = useAlert();
  // /Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    username: Yup.string().required("Required"),
    fullname: Yup.string().required("Required"),
    cnic: Yup.string()
      .matches(/^[0-9+]{13}$/, "CNIC must be 13 digits")
      .required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Invalid Gender")
      .required("Required"),
    role: Yup.string().required("Required"),
    avatar: Yup.mixed()
      .required("Avatar is required")
      .test(
        "fileSize",
        "File size is too large",
        (value) => value && value.size <= 5000000
      ) // 5MB limit
      .test(
        "fileType",
        "Unsupported file type",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    // Handle form submission
    const { email, password, fullname, username, cnic, gender, role, avatar } =
      values;
    const userData = {
      email,
      password,
      fullname,
      username,
      cnic,
      gender,
      role,
      avatar,
      coverImage: null,
    };
    console.log("User data that is ready for submitted ==>", userData);
    axios
      .post(`${BASE_URL}/api/v1/users/staff/register`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        window.notify("User Registered!", "success");
      })
      .catch((error) => {
        console.log("Error at register Staff ", error.response.data.message);
        window.notify(`${error.response.data.message}`, "error");
      })
      .finally(() => {
        setSubmitting(false);
      });
    // setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     setSubmitting(false);
    // }, 400);
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
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email">Email</Label>
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
                    <Col md={6}>
                      <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.username && !!errors.username}
                        />
                        <FormFeedback>{errors.username}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.password && !!errors.password}
                        />
                        <FormFeedback>{errors.password}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={
                            touched.confirmPassword && !!errors.confirmPassword
                          }
                        />
                        <FormFeedback>{errors.confirmPassword}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="cnic">CNIC</Label>
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
                    <Col md={6}>
                      <FormGroup>
                        <Label for="fullname">Full Name</Label>
                        <Input
                          type="text"
                          name="fullname"
                          id="fullname"
                          value={values.fullname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.fullname && !!errors.fullname}
                        />
                        <FormFeedback>{errors.fullname}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="gender">Gender</Label>
                        <Input
                          type="select"
                          name="gender"
                          id="gender"
                          value={values.gender}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.gender && !!errors.gender}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Input>
                        <FormFeedback>{errors.gender}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="role">Role</Label>
                        <Input
                          type="select"
                          name="role"
                          id="role"
                          value={values.role}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.role && !!errors.role}
                        >
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="suprident">Suprident</option>
                          <option value="clark">Clark</option>
                        </Input>
                        <FormFeedback>{errors.role}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="avatar">Avatar</Label>
                        <Input
                          name="avatar"
                          type="file"
                          id="avatar"
                          onChange={(event) => {
                            setFieldValue(
                              "avatar",
                              event.currentTarget.files[0]
                            );
                          }}
                          invalid={!!errors.avatar}
                        />
                        <FormFeedback>{errors.avatar}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button type="submit" disabled={isSubmitting}>
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
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default RegisterStaff;
