import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function ComplaintModel(props) {
  const { isOpen, toggle, data } = props;
  //   const [isLoading, setIsLoading] = useState(false);

  // console.log("data =>", data);

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      style={{ position: "absolute", top: "15px", right: "15px" }}
      onClick={toggle}
    >
      &times;
    </button>
  );

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        external={externalCloseBtn}
        centered="true"
      >
        <ModalHeader className="fs-5">
          <span className="fw-bold">Type : </span>
          {data?.complaintType}
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <p>
                  <span className="mb-1 fw-bold">Email:</span> {data?.email}
                </p>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <p className="mb-1 fw-bold">Description:</p>
                <p>{data?.description}</p>
              </Col>
            </Row>
          </Container>
          <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Proceed
          </Button>{' '}
          <Button color="danger" onClick={toggle}>
            Deny
          </Button>
        </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ComplaintModel;
