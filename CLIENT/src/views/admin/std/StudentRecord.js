import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Spinner,
  Button,
  Form,
} from "reactstrap";

//Import Breadcrumb
// import Breadcrumbs from "../../../components/common/Breadcrumb";
import "../../../assets/css/Datatables.scss";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "services/Helper";
// import { useAlert } from "contexts/AlertContext";
import EditModal from "components/models/editProfileModal";
// import ApiRequest from "api/dashboardApi/api";

const Index = () => {
  const [stdData, setStdData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [hostelName, setHostelName] = useState("");
  const [hostelData, setHostelData] = useState([]);

  const toggleModal = () => setIsOpen(!isOpen);

  // const showAlert = useAlert()
  // console.log("This is std data ", stdData);
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
        label: "Roll#",
        field: "rollNumber",
        sort: "asc",
        width: 150,
      },
      {
        label: "Phone#",
        field: "phoneNumber",
        sort: "asc",
        width: 100,
      },
      { label: "Action", field: "action", sort: "disabled", width: 100 },
    ],
    // rows: stdData,
    rows: stdData.map((std) => ({
      ...std,
      action: (
        <div className="flex-center">
          <Button
            className="me-1"
            type="submit"
            color="danger"
            size="sm"
            onClick={() => handleDelete(std._id)}
          >
            Delete
          </Button>
          <Button
            type="submit"
            color="info"
            size="sm"
            onClick={() => handleEdit(std._id)}
          >
            Edit
          </Button>
        </div>
      ),
    })),
  };

  const handleDelete = (stdId) => {
    setIsProcessing(true);
    console.log("Deleting employee with ID:", stdId);
    axios
      .delete(`${BASE_URL}/api/v1/users/student/delete/${stdId}`)
      .then((res) => {
        // console.log("Students Data deleted successfully:", res.data);
        // showAlert(res?.data?.message, "success")
        window.notify(res?.data?.message, "success");
      })
      .catch((err) => {
        // console.log("Error deleting Student:", err);
        window.notify("Error at deleting Student", "error");
        // showAlert("Error at deleting Student", "error")
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleEdit = async (stdId) => {
    console.log("Editing employee with ID:", stdId);
    const student = await stdData.filter((std) => std._id === stdId)[0];
    setUpdateData(student);
    console.log("after set update emp data ", student);
    toggleModal();
  };

  // useEffect(() => {
  //     axios.get(`${BASE_URL}/api/v1/users/student`)
  //         .then((res) => {
  //             const studentData = res.data.allStdData;
  //             // console.log("All students ", res.data.allStdData);
  //             setStdData(studentData)
  //         })
  //         .catch((error) => {
  //             console.log("Error at getting data of students  ", error);
  //         })
  //         .finally(() => {
  //             setLoading(false)
  //         })

  // }, [isProcessing])

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/hostel`)
      .then((response) => {
        console.log("Hostel data response =>", response?.data?.hostelData);
        setHostelData(response.data.hostelData);
      })
      .catch((error) => {
        console.error("Error fetching hostel data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/users/student/hostelName/${hostelName}`)
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
  }, [hostelName]);

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
                    <CardTitle className="h4">
                      <span>List of Students </span>
                    </CardTitle>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <div className="form-group my-1">
                            <select
                              id="hostel-select"
                              className="form-control"
                              onChange={(e) => setHostelName(e.target.value)}
                            >
                              <option value="">Select Hostel</option>
                              {hostelData.map((hostel) => (
                                <option key={hostel._id} value={hostel.name}>
                                  {hostel.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                    {!loading ? (
                      <MDBDataTable
                        striped
                        small
                        responsive
                        hover
                        bordered
                        data={data}
                        noRecordsFoundLabel="No records found message || Select hostel"
                      />
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
      <EditModal
        isOpen={isOpen}
        toggle={toggleModal}
        data={updateData}
        request="student"
      />
    </Box>
  );
};

export default Index;
