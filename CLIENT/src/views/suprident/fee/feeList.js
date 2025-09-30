import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { MDBDataTable } from "mdbreact";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { BASE_URL } from "services/Helper";
import EditFeeModel from "components/models/editFeeModel";
// import { useAlert } from 'contexts/AlertContext'

const FeeList = () => {
  const [feeData, setFeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const toggleModal = () => setIsOpen(!isOpen);

  // Flatten the data to include nested values directly accessible
  const rows = feeData.map((item) => ({
    ...item, // Spread existing properties
    action: (
      <div className="flex-center">
        <Button
          className="me-1"
          type="submit"
          color="danger"
          size="sm"
          onClick={() => handleDelete(item._id)}
        >
          Delete
        </Button>{" "}
        <Button
          type="submit"
          color="info"
          size="sm"
          onClick={() => handleEdit(item._id)}
        >
          Edit
        </Button>
      </div>
    ),
    total: (
      <span className="fw-bold">
        {item.commonRoomFee +
          item.electricityCharges +
          item.fine +
          item.gassCharges +
          item.hostelIdentityCardFee +
          item.hostelSecurity +
          item.maintenancesCharges +
          item.messCharges +
          item.messSecurity +
          item.newsPaperPlussTelephoneCharges +
          item.roomRent +
          item.utensilCharges +
          item.waterCharges +
          item.addmissionFee}
      </span>
    ),
  }));

  const data = {
    columns: [
      {
        label: "Fee Type",
        field: "feeType",
        sort: "asc",
        width: 150,
      },
      // {
      //     label: "Admission Fee",
      //     field: "addmissionFee",
      //     sort: "asc",
      //     width: 150,
      // },
      // {
      //     label: "Hostel Security",
      //     field: "hostelSecurity",
      //     sort: "asc",
      //     width: 150,
      // },
      // {
      //     label: "Mess Security",
      //     field: "messSecurity",
      //     sort: "asc",
      //     width: 150,
      // },
      {
        label: "Bank Name",
        field: "bankName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Account Number",
        field: "accountNumber",
        sort: "asc",
        width: 100,
      },

      {
        label: "Total",
        field: "total",
        sort: "asc",
        width: 100,
      },

      { label: "Action", field: "action", sort: "disabled", width: 100 },
    ],
    rows: rows,
  };

  const handleDelete = (feeId) => {
    console.log("Deleting fee with ID:", feeId);
    axios
      .delete(`${BASE_URL}/api/v1/fee/delete/${feeId}`)
      .then((res) => {
        console.log("fee deleted successfully:", res.data);
        window.notify(res?.data?.message, "success");
      })
      .catch((err) => {
        console.log("Error deleting Fee:", err);
      });
  };

  const handleEdit = async (feeId) => {
    console.log("Editing Fee with ID:", feeId);
    const FilteredFee = await feeData.filter((fee) => fee._id === feeId)[0];
    setUpdateData(FilteredFee);
    console.log("after set update Fee data ", FilteredFee);
    toggleModal();
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/fee`)
      .then((res) => {
        // console.log("Response of fee data ", res?.data?.feeData);
        const resData = res?.data?.feeData;
        setFeeData(resData);
      })
      .catch((err) => {
        console.log("Error at getting fee data ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className="mt-2">
        <React.Fragment>
          <div className="page-content">
            <div className="container-fluid">
              <Row>
                <Col className="col-12">
                  <Card>
                    <CardBody>
                      <CardTitle className="h4">List of Fees</CardTitle>
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
      <EditFeeModel isOpen={isOpen} toggle={toggleModal} data={updateData} />
    </>
  );
};

export default FeeList;
