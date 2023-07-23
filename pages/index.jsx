//Imports
import {
  FormControl,
  useToast,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  FormErrorMessage,
  Select,
  Text,
  Input,
  Button,
  useDisclosure,
  useBreakpointValue,
  Box,
  Center
} from "@chakra-ui/react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";
import * as React from "react";

//Values
const initValues = { name: "", email: "", subject: "", message: "" };
const serviceOptions = [
  {
    name: "3D-Printing",
    materials: ["PLA", "ABS", "PTEG", "TPU"],
    colors: ["White", "Gray", "Black"]
  },
  {
    name: "Laser-Cutting",
    materials: ["Chipboard"],
    colors: ["White", "Gray"]
  },
];
//States
const initState = { isLoading: false, error: "", values: initValues };


//App-Function
export default function Home() {
//Values
  const toast = useToast();
  const radius = "20px"
//States
  const [state, setState] = useState(initState);
  const {values, isLoading, error} = state;
  const [touched, setTouched] = useState({});
  const [activeMaterial, setActiveMaterial] = useState({});
//Functions
  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));
  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };
  const { isOpen, onClose, onOpen } = useDisclosure();
//BREAKPOINTS
  const maxHeaderWBP = useBreakpointValue(
    {
      base: '275px',
      sm: '275px',
      md: '300px',
      lg: '275px'
    },
    {
      fallback: '250px',
    },
  )
  const maxCabelWBP = useBreakpointValue(
    {
      base: '150px',
      sm: '150px',
      md: '100px',
      lg: '100px'
    },
    {
      fallback: '250px',
    },
  )

//App
return (
  <>
  <Flex 
    h="100%"
    w="fit-content"
    gap={2}
    alignItems="center"
    flexDirection="column"
    justifyContent="end"
  >

    {/* CABEL IMAGE */}
    <Image
      h="fit-content"
      w={maxCabelWBP}
      objectFit='cover'
      src='/hero/cabel.png'
      alt='header'
    />

    {/* TITLE */} 
    <Text 
      as="t2"
      fontSize={36}
      textAlign="center"
      textShadow="1px 3px 0px black"
    >
      Start your <br/> Order Now!
    </Text>

    {/* HEADER BUTTON IMAGE */}
    <Button 
      variant='link'
      onClick={onOpen}
      h="fit-content"
      w={maxHeaderWBP}
    >
      {/* HEADER IMAGE */}
      <Image
        objectFit='cover'
        src='/hero/header.png'
        alt='header'
      />
    </Button>

    {/* FORM OVERLAY */}   
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        background="primary"
        w="90%"
        border="1px"
        borderBottom="1px"
        borderLeft="2px"
        borderTop="2px"
        borderRight="1px"
        borderColor="secondary"
        rounded={radius}
      >

        {/* HEADER - TITLE AND CLOSE BUTTON */}   
        <ModalHeader>
          {/* Form Heading */}
          <Text as="t2" mb={4} opacity= "1">Order Details</Text>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>  
          {/* FORM FLEX STACK */}       
          <Flex 
            flexDirection={"column"}
            alignItems='center' 
            gap={2}
            mb={4}
          >
            {/* Display error message */}
            {error && (
              <Text color="red.300" my={4} fontSize="xl">
                {error}
              </Text>
            )}
              {/* Name */}
              <FormControl isRequired isInvalid={touched.name && !values.name} >
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter Name *"
                  errorBorderColor="red.300"
                  variant='filled'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={onBlur}
                />
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              {/* Email */}
              <FormControl isRequired isInvalid={touched.email && !values.email} >
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email *"
                  errorBorderColor="red.300"
                  variant='filled'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={onBlur}
                />
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              {/* Phone */}
              <FormControl>
                <Input
                  type="phone"
                  name="phone"
                  placeholder="Enter Phone"
                  errorBorderColor="red.300"
                  variant='filled'
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={onBlur}
                />
              </FormControl>        
              {/* Select Service */}
              <FormControl isRequired isInvalid={touched.subject && !values.subject} >
                <Select 
                  name="subject"
                  placeholder="Select our Service *"
                  errorBorderColor="red.300"
                  variant='filled'
                  value={values.subject}
                  onChange={(e) => {
                    handleChange(e);
                    setActiveMaterial(e.target.value);
                  }}
                  onBlur={onBlur}
                >
                  {serviceOptions.map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              {/* Select Material */}
              <FormControl isRequired isInvalid={touched.message && !values.message} >
                <Select 
                  name="message"
                  placeholder="Select a Material *"
                  errorBorderColor="red.300"
                  variant='filled'
                  value={values.message}
                  onChange={handleChange}
                  onBlur={onBlur}
                >
                  {values.subject && (
                    <>
                    {serviceOptions
                      .find((option) => option.name === values.subject)
                      .materials.map((material) => (
                        <option key={material} value={material}>
                          {material}
                        </option>
                      ))}
                    </>
                  )}
                </Select>
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              {/* Select Material Color */}
              <FormControl isRequired isInvalid={touched.color && !values.color} >
                <Select 
                  name="color"
                  placeholder="Select a Material Color*"
                  errorBorderColor="red.300"
                  variant='filled'
                  value={values.color}
                  onChange={handleChange}
                  onBlur={onBlur}
                >
                  {values.subject && (
                    <>
                    {serviceOptions
                      .find((option) => option.name === values.subject)
                      .colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </>
                  )}
                </Select>
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              {/* File */}
              <FormControl 
                isRequired 
                mb={5}
                justifyItems="center"
              >
                <Button
                  w="100%"
                  h="75px"
                  border="2px"
                  borderColor="secondary"
                  borderStyle="dashed" 
                >
                  <Input
                    type="file"
                    name="file"
                    w="100%"
                    h="100%"
                    errorBorderColor="red.300"
                    value={values.file}
                    onChange={handleChange}
                    onBlur={onBlur}
                    position="absolute"
                    zIndex={2}
                    opacity="0"
                  />
                  <Center
                    w="100%"
                    h="100%"
                    flexDirection="column"
                    gap={1}
                  >
                    <Text>Select Files *</Text>
                    <Text as="s1">Max 5 files less than 10 mb</Text>
                  </Center>
                </Button>
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              
            {/* Button */}
            <Button
              variant="outline"
              colorScheme="blue"
              w="100%"
              isLoading={isLoading}
              disabled={
                !values.name || !values.email || !values.subject || !values.message || !values.color
              }
              onClick={onSubmit}
            >
              Send Order
            </Button>
          </Flex>
        </ModalBody>

      </ModalContent>
    </Modal>

  </Flex>
  </>
);
}