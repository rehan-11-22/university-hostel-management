import React from 'react';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, } from 'reactstrap';
import Logo from "assets/img/images.png"
import axios from 'axios';
import { BASE_URL } from 'services/Helper';
import { useAuth } from 'contexts/AuthContext';
// import  { useReactToPrint } from 'react-to-print';
// import axios from 'axios';
// import { BASE_URL } from 'services/Helper';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

const VoucherModel = (props) => {
    const { isOpen, toggle } = props;
    const { voucherData, stdData, dueDate, messAttendace, feeType } = props.data
    // console.log("voucher Data ", voucherData);
    // console.log("student Data ", stdData);
    // console.log("Fee Type", feeType);
    const { user } = useAuth()
    // console.log("current logged in user ", user);
    const totalAmount = (voucherData.commonRoomFee + voucherData.electricityCharges + voucherData.fine + voucherData.gassCharges + voucherData.hostelIdentityCardFee + voucherData.hostelSecurity + voucherData.maintenancesCharges + (voucherData.messCharges * messAttendace) + voucherData.messSecurity + voucherData.newsPaperPlussTelephoneCharges + voucherData.roomRent + voucherData.utensilCharges + voucherData.waterCharges + voucherData.addmissionFee)
    const date = new Date();
    const footerForVoucher = ["Hostel Copy", "Hall Council Copy", "Bank Copy", "Student Copy"]
    // const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //     // documentTitle: "Print This Document",
    //     content: () => componentRef.current,
    // });
    // const handlePrint = () => {
    //     const printContents = componentRef.current.innerHTML;
    //     const originalContents = document.body.innerHTML;

    //     document.body.innerHTML = printContents;
    //     window.print();
    //     document.body.innerHTML = originalContents;
    //     window.location.reload();
    // };
    const hadnleRecord = () => {
        const studentFeeData = {
            stdId: stdData._id,
            feeType,
            totalAmount,
            createdBy: {
                userId: user?._id,
                userEmail: user?.email
            }

        }


        axios.post(`${BASE_URL}/api/v1/studentfee/createfeerecord`, studentFeeData)
            .then((res) => {
                console.log("res from student fee create ", res)
                window.print(document.getElementsByClassName("actual-receipt"))
            })
            .catch((error) => {
                console.log("error ate student fee recoard ", error);
            })
    }




    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} fullscreen >
                <ModalHeader toggle={toggle}>Fee Voucher</ModalHeader>
                <ModalBody  >
                    <Row className='actual-receipt'  >
                        {footerForVoucher.map((voucherFooter, key) => {
                            return <Col key={key} sm={3} className='border p-3 bg-white' >
                                <div className="fee-voucher border-dark border-2">
                                    <header className="header mb-2 p-1">
                                        <div className="title-container flex-center">
                                            <img className='me-2' src={Logo} alt="logo SIMOY" width={40} />
                                            <p style={{ fontSize: "12px", textDecorationLine: "underline" }}>SIMOY Hostel Lahore</p>
                                        </div>

                                    </header>
                                    <main className="main">
                                        <div className="voucher-info">
                                            <p className='text-center'><b>{(voucherData?.bankName)}</b>  <br /> For credit to <br /> <b>Federal Hostel <br /> {voucherData?.feeType} </b> <br /> <span>Account No.{voucherData?.accountNumber}</span></p>
                                        </div>
                                        <hr style={{ height: '2px', backgroundColor: 'dark', color: 'dark' }} />
                                        <div className="student-info">
                                            <table className='table table-responsive table-sm table-bordered border-2 border-dark  m-0'>
                                                <tbody className='std-voucher-data'  >

                                                    <tr>
                                                        <td ><span>Issue Date:</span><br />{date.toLocaleDateString()}</td>
                                                        <td><span>Due Date:</span><br />{dueDate}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Roll No:{` ${!stdData?.rollNumber ? "0000" : stdData?.rollNumber}`}</td>
                                                        <td>Room No:2</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">Name:{` ${!stdData?.fullname ? "student" : stdData.fullname}`}</td>
                                                    </tr>
                                                    <tr >
                                                        <td colspan="2" className='text-center'>Hostel:{` ${!stdData?.hostelName ? "Fedral Hostel" : stdData.hostelName}`}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2">Department:{` ${!stdData?.dept ? "Dept." : stdData.dept}`}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" className='fw-bold text-center'>Period:Spring semester 2024</td>
                                                    </tr>
                                                </tbody>


                                            </table>
                                        </div>

                                        <table className="table table-bordered table-sm table-responsive border-2 border-dark">
                                            <thead>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th colSpan={2}>Description</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className='std-voucher-data'>
                                                <tr>
                                                    <td >1</td>
                                                    <td colspan="2">Addmission Fee</td>
                                                    <td >{voucherData.addmissionFee}</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td colspan="2">Hostel Security</td>
                                                    <td>{voucherData.hostelSecurity}</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colspan="2">Mess Security</td>
                                                    <td>{voucherData.messSecurity}</td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td colspan="2">Mess Charges</td>
                                                    <td>{voucherData.messCharges * messAttendace}</td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td colspan="2">Utensil Charges</td>
                                                    <td>{voucherData.utensilCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td colspan="2">Hostel Identity Card Fee</td>
                                                    <td>{voucherData.hostelIdentityCardFee}</td>
                                                </tr>
                                                <tr>
                                                    <td>7</td>
                                                    <td colspan="2">Room Rent</td>
                                                    <td>{voucherData.roomRent}</td>
                                                </tr>
                                                <tr>
                                                    <td>8</td>
                                                    <td colspan="2">Electricity Charges</td>
                                                    <td>{voucherData.electricityCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>9</td>
                                                    <td colspan="2">Gass Charges</td>
                                                    <td>{voucherData.gassCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>10</td>
                                                    <td colspan="2">Maintenances Charges</td>
                                                    <td>{voucherData.maintenancesCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>11</td>
                                                    <td colspan="2">Common Room Fee</td>
                                                    <td>{voucherData.commonRoomFee}</td>
                                                </tr>
                                                <tr>
                                                    <td>12</td>
                                                    <td colspan="2">Newspaper + Telephone Charges</td>
                                                    <td>{voucherData.newsPaperPlussTelephoneCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>13</td>
                                                    <td colspan="2">Water Charges</td>
                                                    <td>{voucherData.waterCharges}</td>
                                                </tr>
                                                <tr>
                                                    <td>14</td>
                                                    <td colspan="2">fine</td>
                                                    <td>{voucherData.fine}</td>
                                                </tr>
                                                <tr>
                                                    <td>15</td>
                                                    <th colspan="2">Total</th>
                                                    <th>{totalAmount}</th>

                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* </div> */}
                                    </main>
                                    <footer className="footer">
                                        <p className='text-center fw-bold'>{voucherFooter}</p>
                                    </footer>
                                </div>
                            </Col>
                        })

                        }
                    </Row>
                </ModalBody>
                <ModalFooter>
                    {/* <ReactToPrint
                        trigger={() => <Button color="primary">Print Voucher</Button>}
                        content={() => componentRef.current}
                    /> */}
                    <Button color="primary" onClick={hadnleRecord} >
                        Print Voucher
                    </Button>
                    {' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default VoucherModel;
