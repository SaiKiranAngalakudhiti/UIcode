//import { Component } from "react";
import './footer.css';
import { useLocation } from "react-router-dom";
import { CloseIcon } from '@chakra-ui/icons';
import Modal from "react-modal";
import { Button, FormControl, FormErrorMessage, Input, Textarea, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import emailjs from '@emailjs/browser';

Modal.setAppElement("#root");


const Footer = ({ path }) => {

    let showAdmin=false;
    
    const { pathname } = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    const [isOpen1, setIsOpen1] = useState(false);

    const sendEmail = (values) => {

        // e.preventDefault();
        // console.log(formik.values);
        emailjs.send('service_bwp6upe', 'template_0xdl3on', values, 'ktDqrXdReJuZDOOLZ')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };

    const formik = useFormik({
        initialValues:{
            user_name: "",
            user_email: "",
            user_feedback: ""
        },
        validationSchema: Yup.object({
            user_name: Yup.string()
                .required("User name required")
                .min(5, "User name is too short"),
            user_email: Yup.string()
                .required("User email required")
                .min(5, "User email is too short"),
            user_feedback: Yup.string()
                .required("User feedback required")
                .min(5, "User feedback is too short")
        }),
        onSubmit: (values, actions) =>{

            let data = {
                user_name: values.user_name,
                user_email: values.user_email,
                user_feedback: values.user_feedback
            }
            sendEmail(data);
            actions.resetForm();
            toggleThankingModal();
        }
    });

    function toggleModal() {

      setIsOpen(!isOpen);
    }

    function toggleThankingModal() {

        setIsOpen(false);
        setIsOpen1(!isOpen1);
    }

    //console.log(pathname);
    if (pathname === "/home" || pathname === "/") 
        showAdmin = true;
    else
        showAdmin = false; 
    return(
    <div className="footer">
        <Modal isOpen={isOpen} onRequestClose={toggleModal} contentLabel="My dialog" className="mymodal" id="feedback">
            <Button position={"absolute"} right={"5px"} top={"5px"} alignContent={"center"} onClick={toggleModal}>
                <CloseIcon />
            </Button>
            <VStack as="form" marginTop={"0px"} marginLeft={"0px"} justifyContent="center" onSubmit={formik.handleSubmit}>
                <FormControl isInvalid={formik.errors.user_name}>
                    <Input value={formik.user_name} onChange={formik.handleChange} border={"2px solid black"} borderRadius={"10px"} placeholder='  Enter Name' name="user_name"/>
                    <FormErrorMessage color="red">{formik.errors.user_name}</FormErrorMessage>
                </FormControl>
                    <br/>
                    <br/>
                <FormControl isInvalid={formik.errors.user_email}>
                    <Input value={formik.user_email} onChange={formik.handleChange} border={"2px solid black"} borderRadius={"10px"} placeholder='  Enter Email Id' name="user_email"/>
                    <FormErrorMessage color="red">{formik.errors.user_email}</FormErrorMessage>
                </FormControl>
                    <br/>
                    <br/>
                <FormControl isInvalid={formik.errors.user_feedback}>
                    <Textarea value={formik.user_feedback} resize={"both"} onChange={formik.handleChange} border={"2px solid black"} borderRadius={"10px"} placeholder='  Give Feedback' name="user_feedback"/>
                    <FormErrorMessage color="red">{formik.errors.user_feedback}</FormErrorMessage>
                </FormControl>
                    <br/>
                    <br/>
                <FormControl>                    
                    <Button type="submit" background={"gray"} borderRadius={"20px"} padding={"5px"} border={"1px solid black"}> Send Feedback</Button>
                </FormControl>
            </VStack>
        </Modal>

        <Modal isOpen={isOpen1} onRequestClose={toggleThankingModal} contentLabel="My dialog" className="mymodal" id="thanks-feedback">
            <Button position={"absolute"} right={"5px"} top={"5px"} alignContent={"center"} onClick={toggleThankingModal}>
                <CloseIcon />
            </Button>
            <div padding={"10px"}>
                <p>
                    <br/>
                    Thank you for the feedback
                </p>
            </div>
        </Modal>


       { showAdmin === true &&
        <ul className='footer-list'>
            <li className='list-footer'>
                <a href="/AdminLogin" className="adminCss" >Admin</a>
            </li>
            <li className='list-footer'>
                <a href="#feedback" className="adminCss" onClick={toggleModal}>Feedback</a>
            </li>
        </ul>}
        { showAdmin === false &&
        <a href="/home" className="adminCss" >Home</a>}
    </div>
    );
  };
export default Footer;