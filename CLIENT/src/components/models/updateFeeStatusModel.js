import React, { useState } from 'react';

import { Container, Row, Col, Spinner, Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { BASE_URL } from 'services/Helper';
import { useAuth } from 'contexts/AuthContext';

function UpdateFeeStatus(props) {
    const { isOpen, toggle, data } = props;
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth()

    // console.log("this is fee for updates ", data);

    console.log("user data ", user);

    const handleUpdateFee = async () => {
        setIsLoading(true);
        // console.log("updated values of employee profile ", values);
        const feeId = data._id

        axios.put(`${BASE_URL}/api/v1/studentfee/updaterecord/${feeId}`, user)
            .then((res) => {
                // console.log("res of update fee record", res);
                window.notify(res?.data?.message, "success")

            })
            .catch((error) => {
                window.notify(error?.responce?.message, "error")
                console.log("Error at Update student Fee:", error);
            })
            .finally(() => {
                setIsLoading(false);
                toggle()
            })
    };

    const externalCloseBtn = (
        <button
            type="button"
            className="close"
            style={{ position: 'absolute', top: '15px', right: '15px' }}
            onClick={toggle}
        >
            &times;
        </button>
    );




    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} external={externalCloseBtn} centered='true'>
                <ModalHeader>Update Fee Status</ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col>
                                <p className='text-danger'>Do you want to update Fee status!</p>
                                <p className='d-flex justify-content-between fw-bold'><span>Name:</span> {" "} <span>{data?.studentName}</span></p>
                                <p className='d-flex justify-content-between fw-bold'><span>CNIC:</span> {" "} <span>{data?.studentcnic}</span></p>
                                <p className='d-flex justify-content-between fw-bold'><span>Hostel Name:</span> {" "} <span>{data?.hostelName}</span></p>
                                <p className='d-flex justify-content-between fw-bold'><span>Total Amount:</span> {" "} <span>{data?.totalAmount}</span></p>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdateFee}>
                        {!isLoading
                            ? "Change to paid"
                            : <><Spinner size="sm">Loading...</Spinner><span>{' '}Loading</span></>
                        }

                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateFeeStatus;
