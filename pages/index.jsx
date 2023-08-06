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
  Center,
  Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";
import { motion } from 'framer-motion';
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';
// Initialize Supabase client with your Supabase URL and API Key
const supabase = createClient("https://cgrcxuglhszbrasvyzoa.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncmN4dWdsaHN6YnJhc3Z5em9hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDE4MDY1MywiZXhwIjoyMDA1NzU2NjUzfQ.YZKYBNARsWc6uieKdDBO9PoUhrIeTGHlnzu9Wbi4UVU");


//Values
const initValues = { name: "", email: "",  phone: "", service: "", material: "", color: "", file: ""};
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
  const [tabIndex, setTabIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
//Functions
  const getPublicURL = async (folderName, fileName) => {
    const { data, error } = await supabase.storage
      .from("Orders")
      .getPublicUrl(`${folderName}/${fileName}`, {
        download: true,
      });

    if (error) {
      throw new Error("Failed to get public URL.");
    }

    return data.publicURL;
  };
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
      // Upload each selected file to Supabase
      const fileURLs = [];
      for (const file of selectedFiles) {
        const uniqueId = uuidv4();
        const folderName = values.name.replace(/\s/g, '-');
        const fileName = file.name + '_' + uniqueId + '_' + file.name;
        const { data, error } = await supabase.storage
          .from("Orders")
          .upload(`${folderName}/${fileName}`, file);
  
        if (error) {
          throw new Error("Failed to upload file.");
        }
  
        const downloadURL = await getPublicURL(folderName, fileName);
        console.log(downloadURL);
  
        fileURLs.push(downloadURL);
      }
  
      // Update the values.file with the URLs of the uploaded files
      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          file: fileURLs.join(','), // Join the URLs with commas to create a string
        },
      }));
  
      console.log(fileURLs);
  
      // Send the rest of the form data to the backend
      await sendContactForm(state.values);
      setTouched({});
      setSelectedFiles([]);
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

    <Flex 
      h="fit-content"
      alignItems="center" 
      flexDirection="column"
    >

      {/* TITLE */} 
      <Text 
        as="t2-selected"
        textAlign="center"
      >
        {tabIndex === 0 ? "Get your Free" : "Start your"}
      </Text>
      {/* TABS CONTAINER */} 
        <Tabs 
        align='center' 
        size="" 
        variant="unstyled" 
        index={tabIndex} 
        onChange={(index) => setTabIndex(index)}
      >
        {/* TABS  - order/quote */} 
        <TabList>
          {/* Animated TAB - Quote */}
          <Tab>   
            <motion.div
              animate={{
                y: [ 0, -5, 0],
              }}
              transition={{
                duration: .6,
                delay: 2
              }}
            >
              <Text 
                as={tabIndex === 0 ? "t2-selected" : "t2"}
                textAlign="center"
                px={5}
              >
                {tabIndex === 0 ? "Quote" : "Quote or"}
              </Text>
            </motion.div>
          </Tab>
          {/* Animated TAB - Order */}
          <Tab>  
            <motion.div
              animate={{
                y: [ 0, -5, 0],
              }}
              transition={{
                duration: .8,
                delay: 3
              }}
            >
              <Text 
                as={tabIndex === 1 ? "t2-selected" : "t2"}
                textAlign="center"
                px={5}
              >
                {tabIndex === 1 ? "Order" : "or Order"}
              </Text>
            </motion.div>
          </Tab>
        </TabList>
        {/* TAB INDICATOR */}
        <TabIndicator
          height="4px"
          bg="accent"
          borderRadius="full"
          shadow= "1px 3px 0px black"
        />   
        {/* TABS PANELS CONTAINER */} 
        <TabPanels
        mb="-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
          {/* TAB PANEL 1 - QUOTE */}
          <TabPanel>
                  
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
                w="100%"
                h="100%"
                paddingBottom={8}
                position="absolute"
                zIndex={1}
              >
                {/* Rotating IMAGE */}
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                >
                  {/* IMAGE */}
                  <Image
                    w={maxCirFanWBP}
                    objectFit="cover"
                    src="/hero/header/cir2.png"
                    alt="header"
                  />
                </motion.div>  
              </Center>
              {/* CIR BT LABEL */}
              <Center
                w="100%"
                h="100%"
                paddingBottom={7}
                position="absolute"
                zIndex={2}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* LABEL - UPLOAD FILES */}
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{
                    opacity: isHovered ? 0 : 1,
                    y: isHovered ? -10 : 0,
                  }}
                  transition={{ duration: 0.5, delay: isHovered ? .25 : .5 }}
                >
                  {/* LABEL - UPLOAD */}
                  <motion.div
                    animate={{
                      x: [ 0, 2, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 4,
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  >
                    <Text 
                      as="s3"
                    >
                      Upload
                    </Text>
                  </motion.div>
                  {/* LABEL - FILES */}
                  <motion.div
                    animate={{
                      x: [ 0, 2, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 5,
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  >
                    <Text 
                      as="s3"
                    >
                      Files
                    </Text>
                  </motion.div>
                </motion.div>
              </Center>

              <Center
                w="100%"
                h="100%"
                paddingBottom={7}
                position="absolute"
                zIndex={2}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                
                {/* LABEL - SUBMIT QUOTE */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 10,
                  }}
                  transition={{ duration: 0.5, delay: isHovered ? .5 : .25 }}
                >
                  {/* LABEL - SUBMIT */}
                  <motion.div
                    animate={{
                      x: [ 0, 2, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 4,
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  >
                    <Text 
                      as="s3"
                    >
                      Submit
                    </Text>
                  </motion.div>
                  {/* LABEL - QUOTE */}
                  <motion.div
                    animate={{
                      x: [ 0, 2, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 5,
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  >
                    <Text 
                      as="s3"
                    >
                      Quote
                    </Text>
                  </motion.div>
                </motion.div>
              </Center>
              
            </Button> 
                  
          </TabPanel>
          {/* TAB PANEL 2 - ORDER */}
          <TabPanel>
                  
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
                w="100%"
                h="100%"
                paddingBottom={8}
                position="absolute"
                zIndex={1}
              >
                {/* Rotating IMAGE */}
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                >
                  {/* IMAGE */}
                  <Image
                    w={maxCirFanWBP}
                    objectFit="cover"
                    src="/hero/header/cir2.png"
                    alt="header"
                  />
                </motion.div>  
              </Center>
              {/* CIR BT LABEL */}
              <Center
                w="100%"
                h="100%"
                paddingBottom={7}
                position="absolute"
                zIndex={2}
              >
                {/* LABEL - UPLOAD FILES */}
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{
                    opacity: isHovered ? 0 : 1,
                    y: isHovered ? -10 : 0,
                  }}
                  transition={{ duration: 0.5, delay: isHovered ? .15 : .35 }}
                >
                  {/* LABEL - UPLOAD */}
                  <motion.div
                    animate={{
                      x: [ 0, 2, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 4,
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  >
                    <Text 
                      as="s3"
                    >
                      Upload
                    </Text>
                  </motion.div>
                  {/* LABEL - FILES */}
                  <motion.div
                    animate={{
                      x: [ 0, 2, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 5,
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  >
                    <Text 
                      as="s3"
                    >
                      Files
                    </Text>
                  </motion.div>
                </motion.div>
              </Center>

              <Center
                w="100%"
                h="100%"
                paddingBottom={7}
                position="absolute"
                zIndex={2}
              >
                
                {/* LABEL - SUBMIT QUOTE */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 10,
                  }}
                  transition={{ duration: 0.5, delay: isHovered ? .35 : .15 }}
                >
                  {/* LABEL - SUBMIT */}
                  <motion.div
                    animate={{
                      x: [ 0, 2, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 4,
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  >
                    <Text 
                      as="s3"
                    >
                      Submit
                    </Text>
                  </motion.div>
                  {/* LABEL - QUOTE */}
                  <motion.div
                    animate={{
                      x: [ 0, 2, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 5,
                      repeat: Infinity, 
                      repeatDelay: 3
                    }}
                  >
                    <Text 
                      as="s3"
                    >
                      Order
                    </Text>
                  </motion.div>
                </motion.div>
              </Center>
              
            </Button> 

          </TabPanel>
        </TabPanels>
      </Tabs> 

    </Flex>
    

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
          <Text as="t2" mb={4} opacity= "1">{tabIndex === 0 ? "Quote Details" : "Order Details"}</Text>
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
              <FormControl isRequired isInvalid={touched.service && !values.service} >
                <Select 
                  name="service"
                  placeholder="Select our Service *"
                  errorBorderColor="red.300"
                  variant='filled'
                  value={values.service}
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
                {values.service && (
                  <Text as="s1" paddingLeft={2}>
                    {serviceOptions.find((option) => option.name === values.service)?.note}
                  </Text>
                )}
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              {/* Select Material */}
              <FormControl isRequired isInvalid={touched.material && !values.material} >
                <Select 
                  name="material"
                  placeholder="Select a Material *"
                  errorBorderColor="red.300"
                  variant='filled'
                  value={values.material}
                  onChange={handleChange}
                  onBlur={onBlur}
                >
                  {values.service && (
                    <>
                    {serviceOptions
                      .find((option) => option.name === values.service)
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
                  {values.service && (
                    <>
                    {serviceOptions
                      .find((option) => option.name === values.service)
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
                !values.name || !values.email || !values.service || !values.material || !values.file
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