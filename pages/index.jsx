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
import * as React from "react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";
import { motion } from 'framer-motion';


//Values
const initValues = { name: "", email: "", subject: "", message: "" };
const serviceOptions = [
  {
    name: "3D-Printing",
    note: "Print-Size: 11in x 11in x 13 in",
    materials: ["PLA", "ABS", "PTEG", "TPU", "Bring your Own"],
    colors: ["White", "Gray", "Black"]
  },
  {
    name: "Laser-Cutting",
    note: "Print-Size: 11in x 15 in",
    materials: ["Chipboard", "Bring your Own"],
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

  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileLimit = 5;
  const fileSizeLimit = 10 * 1024 * 1024; // 10 MB in bytes
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
  const fileChange = ({ target }) => {

    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

    const file = target.files[0];
    if (!file) return;
  
    // Check if the selected file is within the file size limit
    if (file.size > fileSizeLimit) {
      // Show an error message or toast
      toast({
        title: "File size exceeds the limit.",
        status: "error",
        duration: 2000,
        position: "top",
      });
      return;
    }
  
    // Check if the selectedFiles array reaches the file limit
    if (selectedFiles.length >= fileLimit) {
      // Show an error message or toast
      toast({
        title: `You can select up to ${fileLimit} files.`,
        status: "error",
        duration: 2000,
        position: "top",
      });
      return;
    }
  
    // Add the selected file to the selectedFiles array
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
  };
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
  const maxCirFanWBP = useBreakpointValue(
    {
      base: '125px',
      sm: '125px',
      md: '135px',
      lg: '125px'
    },
    {
      fallback: '250px',
    },
  )
  const maxCirBTWBP = useBreakpointValue(
    {
      base: '45px',
      sm: '45px',
      md: '50px',
      lg: '45px'
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
      textDecoration="underline"
      textShadow="1px 3px 0px black"
    >
      Start your <br/> Order Now!
    </Text>

    {/* HEADER BUTTON IMAGE */}
    <Button 
      variant='link'
      onClick={onOpen}
      h="fit-content"
      w="fit-content"
    >
      {/* HEADER IMAGE */}
      <Image
        w={maxHeaderWBP}
        objectFit='cover'
        src='/hero/header/header.png'
        alt='header'
      />      
      {/* CIR FAN IMAGE */}
      <Center
        position="absolute"
        top="15px"
        zIndex={1}
      >
        {/* CIR FAN IMAGE */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          {/* CIR FAN IMAGE */}
          <Image
            w={maxCirFanWBP}
            objectFit="cover"
            src="/hero/header/cir2.png"
            alt="header"
          />
        </motion.div>  
        {/* CIR FAN IMAGE */}
      </Center>
      {/* CIR BT IMAGE */}
      <Image
        w={maxCirBTWBP}
        objectFit='cover'
        src='/hero/header/icon.png'
        alt='header'
        position="absolute"
        top="55px"
        zIndex={2}
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
                {values.subject && (
                  <Text as="s1" paddingLeft={2}>
                    {serviceOptions.find((option) => option.name === values.subject)?.note}
                  </Text>
                )}
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
              <FormControl>
                <Select 
                  name="color"
                  placeholder="Select a Material Color"
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
              </FormControl>
              {/* File */}
              <FormControl 
                isRequired 
                mb={4}
                justifyItems="center"
                rounded={10}
                border="2px"
                borderColor="secondary"
                borderStyle="dashed" 
              >
                <Button
                  w="100%"
                  h="65px"
                >
                  <Input
                    type="file"
                    name="file"
                    multiple
                    w="100%"
                    h="100%"
                    errorBorderColor="red.300"
                    value={values.file}
                    onChange={fileChange}
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
                    <Text>
                      {selectedFiles.length > 0 ? `${selectedFiles.length}/${fileLimit} Files Selected` : "Select Files *"}
                    </Text>
                    <Text as="s1">
                      {`file size limit: 10MB`}
                    </Text>
                  </Center>
                </Button>
                <Button 
                  onClick={() => setSelectedFiles([])}
                  w="100%"
                  variant='outline'
                >
                  Clear Files
                </Button>
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              
            {/* Submit Button */}
            <Button
              w="100%"
              colorScheme="yellow"
              border="2px"
              borderColor="accent"
              isLoading={isLoading}
              disabled={
                !values.name || !values.email || !values.subject || !values.message || !values.file
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