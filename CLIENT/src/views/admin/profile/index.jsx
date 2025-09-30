import React, { useEffect, useState } from "react";
// Chakra imports
import { Box, Spinner } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
// import General from "views/admin/profile/components/General";
// import Notifications from "views/admin/profile/components/Notifications";
// import Projects from "views/admin/profile/components/Projects";
// import Storage from "views/admin/profile/components/Storage";
// import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
// import avatar from "assets/img/avatars/avatar4.png";
import { useAuth } from "contexts/AuthContext";

// Component react strap
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "services/Helper";

export default function Overview() {
  const [employee, setEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/users/staff`)
      .then((res) => {
        // console.log(res);
        console.log("res => ", res);
        setEmployee(res?.data?.allEmpData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Container>
        <Row>
          <Col>
            <Banner
              gridArea="1 / 1 / 2 / 2"
              banner={banner}
              avatar={user?.avatar}
              name={user?.username}
              job={user.role}
              // posts="17"
              //  followers={user.email}
              // following="274"
              phone="03084462753"
              email={user.email}
            />
          </Col>
        </Row>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center m-4">
            <Spinner>Loading</Spinner>
          </div>
        ) : (
          <Row className="my-2">
            {employee.map((emp, index) => {
              return (
                <Col md={6} key={index} className="mt-3">
                  <Banner
                    gridArea="1 / 1 / 2 / 2"
                    banner={banner}
                    avatar={emp?.avatar}
                    name={emp?.username}
                    job={emp.role}
                    phone="03084462753"
                    email={emp.email}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
      {/* Ma in Fields */}
      {/* <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={user?.avatar}
          name={user?.username}
          job={user.role}
          posts='17'
          followers='9.7k'
          following='274'
        /> */}
      {/* <Storage
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          used={25.6}
          total={50}
        /> */}
      {/* <Upload
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe='20px'
          pb={{ base: "100px", lg: "20px" }}
        /> */}
      {/* </Grid> */}
      {/* <Grid
        mb='20px'
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}>
        <Projects
          gridArea='1 / 2 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='Adela Parkson'
          job='Product Designer'
          posts='17'
          followers='9.7k'
          following='274'
        />
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
        />
        <Notifications
          used={25.6}
          total={50}
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "2 / 1 / 3 / 3",
            "2xl": "1 / 3 / 2 / 4",
          }}
        />
      </Grid> */}
    </Box>
  );
}
