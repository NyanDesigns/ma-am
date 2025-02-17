import { Box, Center, useBreakpointValue } from "@chakra-ui/react";
import bg from '../public/bg.jpg';

const AppContainer = ({ children }) => {

  //DISPLAY OPTIONS
  const vhBP = useBreakpointValue(
    {
      base: '80vh',
      sm: '80vh',
      md: '55vh',
      lg: '70vh'
    },
    {
      fallback: '60vh',
    },
  )

  return (

    <Box 
      backgroundImage={`url(${bg.src})`} 
      backgroundSize="cover" 
      backgroundPosition="center" 
      w="100vw" 
      h={vhBP}
      border="0"
    >
      <Center
        h="100%"
        w="100%"
      >
        {children}
      </Center>
    </Box>

  );
};
export default AppContainer;
