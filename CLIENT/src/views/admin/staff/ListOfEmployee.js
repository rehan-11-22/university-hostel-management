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
} from "reactstrap";

//Import Breadcrumb
import "../../../assets/css/Datatables.scss";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import EditModal from "components/models/editProfileModal";
import { BASE_URL } from "services/Helper";

const EmployeeList = () => {
  const [empData, setEmpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState([]);

  const toggleModal = () => setIsOpen(!isOpen);

  const data = {
    columns: [
      {
        label: "FullName",
        field: "fullname",
        sort: "asc",
        width: 150,
      },
      {
        label: "User Name",
        field: "username",
        sort: "asc",
        width: 270,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 270,
      },
      {
        label: "Role",
        field: "role",
        sort: "asc",
        width: 100,
      },
      { label: "Action", field: "action", sort: "disabled", width: 100 },
    ],
    rows: empData.map((emp) => ({
      ...emp,
      action: (
        <div>
          <Button
            className="m-0 mb-sm-1"
            type="submit"
            color="danger"
            size="sm"
            onClick={() => handleDelete(emp._id)}
          >
            Delete
          </Button>{" "}
          <Button
            type="submit"
            color="info"
            size="sm"
            onClick={() => handleEdit(emp._id)}
          >
            Edit
          </Button>
        </div>
      ),
    })),
    //   name: "Donna Snider",
    //   position: "Customer Support",
    //   office: "New York",
    //   age: "27",
    //   date: "2011/01/25",
    //   salary: "$112",
    // },
  };
  const handleDelete = (empId) => {
    setIsProcessing(true);
    console.log("Deleting employee with ID:", empId);
    axios
      .delete(`${BASE_URL}/api/v1/users/staff/delete/${empId}`)
      .then((res) => {
        console.log("Employee deleted successfully:", res.data);
      })
      .catch((err) => {
        console.log("Error deleting Employee:", err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const handleEdit = async (empId) => {
    // console.log("Editing employee with ID:", empId);
    const employee = await empData.filter((emp) => emp._id === empId)[0];
    setUpdateData(employee);
    console.log("after set update emp data ", employee);
    toggleModal();
  };

  // This is temp function for formatted Data of employee
  // const temp = () => {
  //     const formattedData = empData.map(emp => ({
  //         ...emp,
  //         action: (
  //             <div>
  //                 <Button className="m-0 mb-sm-1" type="submit" color="danger" size="sm" onClick={() => handleDelete(emp._id)}>
  //                     Delete
  //                 </Button>{' '}
  //                 <Button type="submit" color="info" size="sm" onClick={() => handleEdit(emp._id)}>
  //                     Edit
  //                 </Button>
  //             </div>
  //         )
  //     }));
  //     // console.log("All Employee ", res.data.allEmpData);
  //     setEmpData(formattedData)
  // }

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_ORIGION}/api/v1/users/staff`)
      .then((res) => {
        // console.log(res);
        // const empData = res?.data?.allEmpData;
        setEmpData(res?.data?.allEmpData);

        // console.log(empData);
      })
      .catch((error) => {
        console.log("Error at getting data of Employee  ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  document.title = "SIMOY | Data Tables | Employee";
  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <React.Fragment>
          <div className="page-content">
            <div className="container-fluid">
              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <CardTitle className="h4">List of Employees</CardTitle>
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
      <EditModal isOpen={isOpen} toggle={toggleModal} data={updateData} />
    </>
  );
};

export default EmployeeList;
