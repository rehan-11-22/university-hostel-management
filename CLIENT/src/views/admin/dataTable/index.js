import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Spinner,
} from "reactstrap";

//Import Breadcrumb
// import Breadcrumbs from "../../../components/common/Breadcrumb";
import "../../../assets/css/Datatables.scss";
import { Box } from "@chakra-ui/react";
import axios from "axios";

const DatatableTables = () => {
  const [stdData, setStdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = {
    columns: [
      {
        label: "FullName",
        field: "fullname",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 270,
      },
      {
        label: "Dept",
        field: "dept",
        sort: "asc",
        width: 200,
      },
      {
        label: "Session",
        field: "session",
        sort: "asc",
        width: 100,
      },
      {
        label: "Roll Number",
        field: "rollName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Phone Number",
        field: "phoneNumber",
        sort: "asc",
        width: 100,
      },
    ],
    rows: stdData,
    //   name: "Donna Snider",
    //   position: "Customer Support",
    //   office: "New York",
    //   age: "27",
    //   date: "2011/01/25",
    //   salary: "$112",
    // },
  };
  useEffect(() => {
    axios
      .get(`${process.env.SERVER_ORIGION}/api/v1/users/student`)
      .then((res) => {
        const studentData = res.data.allStdData;
        // console.log("All students ", res.data.allStdData);
        setStdData(studentData);
      })
      .catch((error) => {
        console.log("Error at getting data of students  ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  document.title = "SIMOY | Data Tables | Students";
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle className="h4">List of Students</CardTitle>
                    {!loading ? (
                      <MDBDataTable responsive bordered data={data} />
                    ) : (
                      <dir className="d-flex justify-content-center align-items-center">
                        <Spinner type="border" color="danger" className="p-4">
                          Loading...
                        </Spinner>
                      </dir>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    </Box>
  );
};

export default DatatableTables;
