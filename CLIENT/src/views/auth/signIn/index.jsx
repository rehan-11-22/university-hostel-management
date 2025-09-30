import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  // Checkbox,
  Flex,
  // FormControl,
  // FormLabel,
  Heading,
  // Link,
  // InputGroup,
  // InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/banner.simoy.png";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { RiEyeCloseLine } from "react-icons/ri";

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
  Card,
  CardBody,
  Spinner,
} from "reactstrap";
import axios from "axios";
// import { useAlert } from "contexts/AlertContext";
import { useHistory } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { BASE_URL } from "services/Helper";
import ForgotPassword from "components/models/forgotPasswordModel";

const initialValues = {
  email: "",
  password: "",
};

function SignIn() {
  const [loginState, setLoginState] = useState("student");
  const [isOpen, setIsOpen] = useState(false);

  let history = useHistory();
  const { login } = useAuth();

  const toggleModal = () => setIsOpen(!isOpen);

  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  // const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  // const textColorBrand = useColorModeValue("brand.500", "white");
  // const brandStars = useColorModeValue("brand.500", "brand.400");
  // const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  // const googleText = useColorModeValue("navy.700", "white");
  // const googleHover = useColorModeValue(
  //   { bg: "gray.200" },
  //   { bg: "whiteAlpha.300" }
  // );
  // const googleActive = useColorModeValue(
  //   { bg: "secondaryGray.300" },
  //   { bg: "whiteAlpha.200" }
  // );
  // const [show, setShow] = React.useState(false);
  // const handleClick = () => setShow(!show);

  //Formik validationSchema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password Required"),
  });
  // handleSubmit
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    // Handle form submission
    const { email, password } = values;
    const userData = {
      email,
      password,
    };
    // console.log("User data that is ready for submitted ==>", userData);
    console.log("This is current login State", loginState);
    axios
      .post(
        loginState === "staff"
          ? `${BASE_URL}/api/v1/users/staff/login`
          : `${BASE_URL}/api/v1/users/student/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("user info", res.data.data);
        window.notify("Login successfully ", "success");
        // showAlert("User Loged In!", "success");
        const user = res?.data?.data?.logedInUser;
        // console.log("logedin user data ==>", res?.data?.data?.logedInUser);
        login(user);
        // console.log("user role ", user.role);
        switch (user.role.toString()) {
          case "admin":
            history.push("/admin");
            break;
          case "suprident":
            // history.push('/Suprident');
            history.push("/suprident");
            break;
          case "clark":
            history.push("/clark");
            break;
          case "student":
            history.push("/student");
            break;
          default:
            history.push("/login"); // Or a default route
        }
      })
      .catch((error) => {
        // showAlert(error.message, "error");
        const msg =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log(error);
        // console.log(
        //   `Error at loged in ${loginState} `,
        //   error.response.data.message
        // );
        window.notify(`${msg} || check selection of staff or user`, "error");
        // showAlert(`${msg} || check selection of staff or user`, "error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const [selected, setSelected] = useState("student");

  const handleRadioChange = (value) => {
    setSelected(value);
    setLoginState(value);
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="110%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "20px", md: "40px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "5px", md: "5vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="8px">
            Sign In
          </Heading>
          <Text
            mb="5px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Select you role and enter your credentials to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          {/* <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
          </Button> */}
          <Flex align="center" mb="25px">
            {/* <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator /> */}
          </Flex>
          <Container>
            <Row>
              <Col>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    onClick={() => handleRadioChange("student")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginBottom: "10px",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor:
                        selected === "student" ? "#e9ecef" : "white",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name="loginState"
                        id="student"
                        value="student"
                        onChange={() => handleRadioChange("student")}
                        checked={selected === "student"}
                        className="me-2"
                        style={{ cursor: "pointer" }}
                      />
                      <label
                        htmlFor="student"
                        className="fw-bold mb-0 text-dark"
                      >
                        Student
                      </label>
                    </div>
                    <small className="text-muted">
                      Access your hostel information
                    </small>
                  </div>
                  <div
                    onClick={() => handleRadioChange("staff")}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginBottom: "10px",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor:
                        selected === "staff" ? "#e9ecef" : "white",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name="loginState"
                        id="staff"
                        value="staff"
                        onChange={() => handleRadioChange("staff")}
                        checked={selected === "staff"}
                        className="me-2"
                        style={{ cursor: "pointer" }}
                      />
                      <label htmlFor="staff" className="fw-bold mb-0 text-dark">
                        Hostel Management
                      </label>
                    </div>
                    <small className="text-muted">
                      Manage student accommodations and services
                    </small>
                  </div>
                </div>
              </Col>
            </Row>
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
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="email" className="fw-bold">
                              Email
                            </Label>
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
                            <Label for="password" className="fw-bold">
                              Password
                            </Label>
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
                      </Row>
                      {/* <Row>
                        <Col className="text-end">
                          <span
                            className="py-0 my-0  text-decoration-underline"
                            style={{ cursor: "pointer", color: "#0000EE" }}
                            onClick={() => toggleModal()}
                          >
                            Forgot password?
                          </span>
                        </Col>
                      </Row> */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary"
                      >
                        {!isSubmitting ? (
                          "Sign In"
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
                <Card className="mt-3">
                  <CardBody>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      mb="10px"
                      color={textColor}
                    >
                      Demo Credentials:
                    </Text>
                    <Text fontSize="xs" color={textColorSecondary} mb="8px">
                      <strong>Admin:</strong> admin@gmail.com / admin@gmail.com
                    </Text>
                    <Text fontSize="xs" color={textColorSecondary} mb="8px">
                      <strong>Suprident:</strong> suprident@gmail.com / 12345678
                    </Text>
                    <Text fontSize="xs" color={textColorSecondary} mb="8px">
                      <strong>Clerk:</strong> clerk@gmail.com / clerk@gmail.com
                    </Text>
                    <Text fontSize="xs" color={textColorSecondary}>
                      <strong>Student:</strong> rehan@gmail.com / 1234567899999
                    </Text>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            ></Flex>
          </Container>
        </Flex>
      </Flex>
      <ForgotPassword isOpen={isOpen} toggle={toggleModal} />
    </DefaultAuth>
  );
}

export default SignIn;
