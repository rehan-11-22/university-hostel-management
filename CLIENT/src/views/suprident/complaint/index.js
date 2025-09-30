import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardFooter,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import { BASE_URL } from "services/Helper";
// import { useAlert } from 'contexts/AlertContext';

const Index = () => {
  const [processingComplaint, setProcessingComplaint] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/users/student/complaint`)
      .then((response) => {
        const filterComplaint = response.data.allComplaintData.filter(
          (complaint) =>
            complaint.status[complaint.status.length - 1] === "processing"
        );
        console.log("filtercomplaint ", filterComplaint);
        setProcessingComplaint(filterComplaint);
        // console.log("complaint Res : " ,response)
      })
      .catch((error) => {
        console.error("error in complaint data:", error);
      });
  }, [isProcessing]);

  const handleProceed = (complaintId) => {
    setIsProcessing(true);
    console.log("complaint id for delete ", complaintId);
    axios
      .put(`${BASE_URL}/api/v1/users/student/complaint/${complaintId}`)
      .then((res) => {
        console.log("res ", res?.data?.message);
        window.notify(res?.data?.message, "success");
      })
      .catch((err) => {
        console.log("Error at deleting complaint ", err);
        window.notify("Not Deleted", "Error");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <Box
      p={{ base: "30px", md: "80px", xl: "30px" }} // Adjusted padding for better spacing
      className="rounded bg-white"
      style={{ marginTop: "80px", overflow: "hidden" }} // Added overflow: hidden to prevent card overflow
    >
      <div className="container">
        <h1 className="text-center mt-1 fs-4 fw-bold">Complaints Details</h1>
        {processingComplaint.length === 0 ? (
          <Row>
            <Col>
              <p className="text-center my-2">There is no complaint Yet</p>
            </Col>
          </Row>
        ) : (
          <Row className="mt-4">
            {processingComplaint.map((complaint) => (
              <Col
                key={complaint?._id}
                xs={12}
                sm={6}
                md={4}
                lg={4}
                className="mb-4"
              >
                <Card className="h-100">
                  <CardHeader className="fw-bold p-0">
                    <p className="mb-1 p-1">{complaint?.complaintType}</p>
                    <span className="bg-primary fs-6 px-2 py-1 text-white rounded-start-pill float-end">
                      {complaint?.status[complaint?.status.length - 1]}
                    </span>
                  </CardHeader>
                  <CardBody>
                    <CardTitle tag="h5">{complaint?.email}</CardTitle>
                    <CardText>{complaint?.description}</CardText>
                  </CardBody>
                  <CardFooter>
                    <div className="">
                      <Button
                        color="success"
                        onClick={() => {
                          handleProceed(complaint._id);
                        }}
                      >
                        Complete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Box>
  );
};
export default Index;
