import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Row, Col, Label, Spinner, Input, FormGroup, FormFeedback } from 'reactstrap';

import axios from 'axios';
import { BASE_URL } from 'services/Helper';
import VoucherModel from 'components/models/voucherModel';
import { useAlert } from 'contexts/AlertContext';

const initialValues = {
    feeType: "",
    stdRegNumber: "",
    dueDate: "",
    startDate: "",
    endDate: "",
}

function ModalFullscreenExample(props) {
    const [voucherData, setVoucherData] = useState({})
    const [stdData, setstdData] = useState({})
    const [dueDate, setDueDate] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [feeType, setFeeType] = useState("")
    const [messAttendace, setMessAttendance] = useState(0)


    const toggleModal = () => setIsOpen(!isOpen);

    // const showAlert = useAlert()



    // const toggle = () => setModal(!modal);


    const validationSchema = Yup.object({
        feeType: Yup.string().required('Feetype is Required'),
        // stdRegNumber: Yup.string().required('Student Registration Number is Required'),
        stdRegNumber: Yup.string()
            .matches(/^\d{13,14}$/, 'CNIC must be exactly 13 or 14 digits')
            .required('CNIC is required'),
        dueDate: Yup.date().required('Due Date is Required'),
        // startDate: Yup.date().when('feeType', (feeType, schema) => {
        //     return feeType === 'mess' ? schema.required('Start Date is required') : schema.nullable();
        //   }),
    });


    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        // console.log("Value for fee genration ", values);
        const formateDate = new Date(values.dueDate).toLocaleDateString()
        // console.log("date formate ",formateDate);
        setDueDate(formateDate)
        const { feeType, stdRegNumber, startDate, endDate } = values;
        console.log("Start date =>", startDate)
        console.log("End date =>", endDate)
        axios.get(`${BASE_URL}/api/v1/fee/${feeType}/${stdRegNumber}`)
            .then((res) => {
                console.log("Res ", res);
                setVoucherData(res?.data?.feeData)
                setstdData(res?.data?.studentData)
                toggleModal()
                resetForm();
                // setFeeType("")
            })
            .catch((error) => {
                console.log("Error at getting feeData ", error);
                // console.log("Error at getting feeData ", error.response.data.message);
                window.notify(error?.response?.data?.message, "error")
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const isEmptyObject = (obj) => {
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    };

    useEffect(() => {
        if (stdData && !isEmptyObject(stdData)) {
            getMessAttendance();
        }
    }, [stdData]);

    const getMessAttendance = async () => {
        const id = await stdData?._id
        const hostelName = await stdData?.hostelName
        axios.get(`${BASE_URL}/api/v1/attendance/${id}/${hostelName}`)
            .then((res) => {
                console.log("res form messattendace ", res?.data?.attendanceCount);
                setMessAttendance(res?.data?.attendanceCount)
            })
            .catch((err) => {
                console.log("error at getting mess attendance ", err);
            })
    }


    // const handlePrint = () => {
    //     // window.print()
    //     // toggle()
    //     const capture = document.querySelector('.actual-receipt');
    //     // setLoader(true);
    //     window.scrollTo(0, 0);

    //     html2canvas(capture, { scrollY: -window.scrollY }).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const doc = new jsPDF('l', 'mm', 'a4');
    //         const imgWidth = doc.internal.pageSize.getWidth();
    //         const imgHeight = (canvas.height * imgWidth) / canvas.width;

    //         doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    //         doc.save('receipt.pdf');
    //     });
    // }

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} className="mt-2">

            <Container  >
                <Row>
                    <Col>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >

                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,

                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="feeType">Voucher type</Label>
                                                <Input
                                                    type="select"
                                                    name="feeType"
                                                    id="feeType"
                                                    value={feeType}
                                                    // onChange={handleChange}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        // Set feeType value and trigger validation
                                                        setFeeType(e.target.value);
                                                    }}
                                                    onBlur={handleBlur}

                                                    invalid={touched.feeType && !!errors.feeType}
                                                >
                                                    <option value="">Select voucher Type</option>
                                                    <option value="hostel">Hostel</option>
                                                    <option value="mess">Mess</option>
                                                    <option value="hostelSecurity">Hostel Security</option>
                                                    <option value="messSecurity">Mess security</option>
                                                    <option value="other">Other</option>
                                                </Input>
                                                <FormFeedback>{errors.feeType}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="stdRegNumber">Student Reg#</Label>
                                                <Input
                                                    type="text"
                                                    name="stdRegNumber"
                                                    id="stdRegNumber"
                                                    placeholder='Enter CNIC of student'
                                                    value={values.stdRegNumber}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    invalid={touched.stdRegNumber && !!errors.stdRegNumber}
                                                >
                                                </Input>
                                                <FormFeedback>{errors.stdRegNumber}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="dueDate">Due Date</Label>
                                                <Input
                                                    type="date"
                                                    name="dueDate"
                                                    id="dueDate"
                                                    value={values.dueDate}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    invalid={touched.dueDate && !!errors.dueDate}
                                                >
                                                </Input>
                                                <FormFeedback>{errors.dueDate}</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {!isSubmitting
                                            ? "Genrate Voucher"
                                            : <><Spinner size="sm">Loading...</Spinner><span>{' '}Loading</span></>
                                        }
                                    </Button>

                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>

            </Container>
            <VoucherModel isOpen={isOpen} toggle={toggleModal} data={{ voucherData, stdData, dueDate, messAttendace ,feeType}} />
        </Box >
    );
}

export default ModalFullscreenExample;