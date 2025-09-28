import { Box } from '@chakra-ui/react'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Logo from 'assets/img/smallLogo.png'

function FeeVouchar() {

    document.title = "SIMOY | Students | Feevoucher ";

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className="mt-2">
            <Container >
                <Row>
                    <Col sm={3} className='border p-1 bg-white' >
                        <div className="fee-voucher">
                            <header className="header mb-2">
                                <div className="title-container flex-center">
                                    <img className='me-2' src={Logo} alt="" width={40} />
                                    <p style={{ fontSize: "12px", textDecorationLine: "underline" }}> SIMOY Hostel <br /> </p>

                                </div>

                            </header>

                            <main className="main">
                                <div className="voucher-info">
                                    <p className='text-center'><b>Bank of Punjab</b>  <br /> For credit to <br /> <b>Federal Hostel <br /> HOSTEL SLIP </b> <br /> <span>Account No...2647-6</span></p>
                                </div>
                                <hr style={{ height: '2px', backgroundColor: 'dark', color: 'dark' }} />
                                <div className="student-info">
                                    <table className='table table-bordered border-2 border-dark'>
                                        <tbody>

                                            <tr>
                                                <td>Issue Date:12-12-2024</td>
                                                <td>Due Date:12-12-2024</td>
                                            </tr>
                                            <tr>
                                                <td>Roll No:4150</td>
                                                <td>Room No:2</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">Name:M. Asad</td>
                                            </tr>
                                            <tr >
                                                <td colspan="2" className='text-center'>Federal Hostel</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">Department: Infomation technology</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="2" className='fw-bold'>Period:Spring semester 2024</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="fee-breakdown">
                                    <table className="table table-bordered border-2 border-dark">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tuition Fee</td>
                                                <td>35800</td>
                                            </tr>
                                            <tr>
                                                <td>Examination Fee</td>
                                                <td>2500</td>
                                            </tr>
                                            <tr>
                                                <td>Alumni Fee</td>
                                                <td>200</td>
                                            </tr>
                                            <tr>
                                                <td>Other Fee</td>
                                                <td>13000</td>
                                            </tr>
                                            <tr>
                                                <td>Course Registration Form Fee</td>
                                                <td>30</td>
                                            </tr>
                                            <tr>
                                                <th>Total:</th>
                                                <td>51530</td>
                                            </tr>
                                            <tr>
                                                <td>Fine/Concession</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <th>Net Amount:</th>
                                                <td>51530</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </main>
                            <footer className="footer">
                                <p className='text-center fw-bold'>Student Copy</p>
                            </footer>
                        </div>
                    </Col>
                    <Col sm={3} className='border p-1 bg-white' >
                        <div className="fee-voucher">
                            <header className="header mb-2">
                                <div className="title-container flex-center">
                                    <img className='me-2' src={Logo} alt="logo SIMOY" width={40} />
                                    <p style={{ fontSize: "12px", textDecorationLine: "underline" }}>Fee Voucher For Spring. 2024 <br /> SIMOY Hostel</p>
                                </div>

                            </header>
                            <main className="main">
                                <div className="voucher-info">
                                    <p><span className='fw-bold'>Voucher No:</span><span className='underlineText'>2345634</span> </p>
                                    <p><span className='fw-bold'>Campus Name:</span><span className='underlineText'>Main Campus</span> </p>
                                    <p><span className='fw-bold'>Issue Date:</span><span className='underlineText'>17-JAN-24</span> </p>
                                    <p><span className='fw-bold'>Due Date:</span><span className='underlineText'>31-JAN-24</span> </p>
                                </div>
                                <div className="student-info">
                                    <p><span className='fw-bold'>Student Name:</span><span className='underlineText'>MUHAMMAD ASAD</span> </p>
                                    <p><span className='fw-bold'>Father Name:</span><span className='underlineText'>SYED UZAIR-UL-HASSAN</span> </p>
                                    <p><span className='fw-bold'>Roll No:</span><span className='underlineText'>4150</span> </p>
                                    <p><span className='fw-bold'>CNIC:</span><span className='underlineText'>3840526139739</span> </p>
                                    <p><span className='fw-bold'>Department:</span><span className='underlineText'>Information Technology</span> </p>
                                    <p><span className='fw-bold'>Program:</span><span className='underlineText'>BS Information Technology (Evening)</span> </p>
                                    <p><span className='fw-bold'>Semester:</span><span className='underlineText'>Eighth Semester (R)</span> </p>
                                    <p><span className='fw-bold'>Session:</span><span className='underlineText'>2021-2025</span> </p>
                                    <h2> </h2>
                                    <p> </p>
                                    <p> 4150</p>
                                    <p> 38405-2613973-9</p>
                                    <p> </p>
                                    <p> </p>
                                    <p> </p>
                                    <p> </p>
                                </div>
                                <div className="fee-breakdown">
                                    <table className="table table-bordered border-2 border-dark">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tuition Fee</td>
                                                <td>35800</td>
                                            </tr>
                                            <tr>
                                                <td>Examination Fee</td>
                                                <td>2500</td>
                                            </tr>
                                            <tr>
                                                <td>Alumni Fee</td>
                                                <td>200</td>
                                            </tr>
                                            <tr>
                                                <td>Other Fee</td>
                                                <td>13000</td>
                                            </tr>
                                            <tr>
                                                <td>Course Registration Form Fee</td>
                                                <td>30</td>
                                            </tr>
                                            <tr>
                                                <th>Total:</th>
                                                <td>51530</td>
                                            </tr>
                                            <tr>
                                                <td>Fine/Concession</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <th>Net Amount:</th>
                                                <td>51530</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </main>
                            <footer className="footer">
                                <p className='text-center fw-bold'>Student Copy</p>
                            </footer>
                        </div>
                    </Col>
                    <Col sm={3} className='border p-1 bg-white' >
                        <div className="fee-voucher">
                            <header className="header mb-2">
                                <div className="title-container flex-center">
                                    <img className='me-2' src={Logo} alt="logo SIMOY" width={40} />
                                    <p style={{ fontSize: "12px", textDecorationLine: "underline" }}>Fee Voucher For Spring. 2024 <br /> SIMOY Hostel</p>
                                </div>

                            </header>
                            <main className="main">
                                <div className="voucher-info">
                                    <p><span className='fw-bold'>Voucher No:</span><span className='underlineText'>2345634</span> </p>
                                    <p><span className='fw-bold'>Campus Name:</span><span className='underlineText'>Main Campus</span> </p>
                                    <p><span className='fw-bold'>Issue Date:</span><span className='underlineText'>17-JAN-24</span> </p>
                                    <p><span className='fw-bold'>Due Date:</span><span className='underlineText'>31-JAN-24</span> </p>
                                </div>
                                <div className="student-info">
                                    <p><span className='fw-bold'>Student Name:</span><span className='underlineText'>MUHAMMAD ASAD</span> </p>
                                    <p><span className='fw-bold'>Father Name:</span><span className='underlineText'>SYED UZAIR-UL-HASSAN</span> </p>
                                    <p><span className='fw-bold'>Roll No:</span><span className='underlineText'>4150</span> </p>
                                    <p><span className='fw-bold'>CNIC:</span><span className='underlineText'>3840526139739</span> </p>
                                    <p><span className='fw-bold'>Department:</span><span className='underlineText'>Information Technology</span> </p>
                                    <p><span className='fw-bold'>Program:</span><span className='underlineText'>BS Information Technology (Evening)</span> </p>
                                    <p><span className='fw-bold'>Semester:</span><span className='underlineText'>Eighth Semester (R)</span> </p>
                                    <p><span className='fw-bold'>Session:</span><span className='underlineText'>2021-2025</span> </p>
                                    <h2> </h2>
                                    <p> </p>
                                    <p> 4150</p>
                                    <p> 38405-2613973-9</p>
                                    <p> </p>
                                    <p> </p>
                                    <p> </p>
                                    <p> </p>
                                </div>
                                <div className="fee-breakdown">
                                    <table className="table table-bordered border-2 border-dark">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tuition Fee</td>
                                                <td>35800</td>
                                            </tr>
                                            <tr>
                                                <td>Examination Fee</td>
                                                <td>2500</td>
                                            </tr>
                                            <tr>
                                                <td>Alumni Fee</td>
                                                <td>200</td>
                                            </tr>
                                            <tr>
                                                <td>Other Fee</td>
                                                <td>13000</td>
                                            </tr>
                                            <tr>
                                                <td>Course Registration Form Fee</td>
                                                <td>30</td>
                                            </tr>
                                            <tr>
                                                <th>Total:</th>
                                                <td>51530</td>
                                            </tr>
                                            <tr>
                                                <td>Fine/Concession</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <th>Net Amount:</th>
                                                <td>51530</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </main>
                            <footer className="footer">
                                <p className='text-center fw-bold'>Student Copy</p>
                            </footer>
                        </div>
                    </Col>
                    <Col sm={3} className='border p-1 bg-white' >
                        <div className="fee-voucher">
                            <header className="header mb-2">
                                <div className="title-container flex-center">
                                    <img className='me-2' src={Logo} alt="logo SIMOY" width={40} />
                                    <p style={{ fontSize: "12px", textDecorationLine: "underline" }}>Fee Voucher For Spring. 2024 <br /> SIMOY Hostel</p>
                                </div>

                            </header>
                            <main className="main">
                                <div className="voucher-info">
                                    <p><span className='fw-bold'>Voucher No:</span><span className='underlineText'>2345634</span> </p>
                                    <p><span className='fw-bold'>Campus Name:</span><span className='underlineText'>Main Campus</span> </p>
                                    <p><span className='fw-bold'>Issue Date:</span><span className='underlineText'>17-JAN-24</span> </p>
                                    <p><span className='fw-bold'>Due Date:</span><span className='underlineText'>31-JAN-24</span> </p>
                                </div>
                                <div className="student-info">
                                    <p><span className='fw-bold'>Student Name:</span><span className='underlineText'>MUHAMMAD ASAD</span> </p>
                                    <p><span className='fw-bold'>Father Name:</span><span className='underlineText'>SYED UZAIR-UL-HASSAN</span> </p>
                                    <p><span className='fw-bold'>Roll No:</span><span className='underlineText'>4150</span> </p>
                                    <p><span className='fw-bold'>CNIC:</span><span className='underlineText'>3840526139739</span> </p>
                                    <p><span className='fw-bold'>Department:</span><span className='underlineText'>Information Technology</span> </p>
                                    <p><span className='fw-bold'>Program:</span><span className='underlineText'>BS Information Technology (Evening)</span> </p>
                                    <p><span className='fw-bold'>Semester:</span><span className='underlineText'>Eighth Semester (R)</span> </p>
                                    <p><span className='fw-bold'>Session:</span><span className='underlineText'>2021-2025</span> </p>
                                    <h2> </h2>
                                    <p> </p>
                                    <p> 4150</p>
                                    <p> 38405-2613973-9</p>
                                    <p> </p>
                                    <p> </p>
                                    <p> </p>
                                    <p> </p>
                                </div>
                                <div className="fee-breakdown">
                                    <table className="table table-bordered border-2 border-dark">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tuition Fee</td>
                                                <td>35800</td>
                                            </tr>
                                            <tr>
                                                <td>Examination Fee</td>
                                                <td>2500</td>
                                            </tr>
                                            <tr>
                                                <td>Alumni Fee</td>
                                                <td>200</td>
                                            </tr>
                                            <tr>
                                                <td>Other Fee</td>
                                                <td>13000</td>
                                            </tr>
                                            <tr>
                                                <td>Course Registration Form Fee</td>
                                                <td>30</td>
                                            </tr>
                                            <tr>
                                                <th>Total:</th>
                                                <td>51530</td>
                                            </tr>
                                            <tr>
                                                <td>Fine/Concession</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <th>Net Amount:</th>
                                                <td>51530</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </main>
                            <footer className="footer">
                                <p className='text-center fw-bold'>Student Copy</p>
                            </footer>
                        </div>
                    </Col>

                </Row>
            </Container>

        </Box>
    )
}

export default FeeVouchar