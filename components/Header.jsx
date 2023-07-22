import { 
  Center, 
  Text, 
  Flex, 
  useBreakpointValue,
} from "@chakra-ui/react";

const Footer = () => {

  const radius = "20px"

  //DISPLAY OPTIONS
  const vhBP = useBreakpointValue(
    {
      base: '30vh',
      sm: '30vh',
      md: '25vh',
      lg: '20vh'
    },
    {
      fallback: '35px',
    },
  )
  const minvhBP = useBreakpointValue(
    {
      base: '300px',
      sm: '300px',
      md: '165px',
      lg: '110px'
    },
    {
      fallback: '35px',
    },
  )
  //FLEX OPTIONS
  const flexBP = useBreakpointValue(
    {
      base: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    {
      fallback: 'row',
    },
  )
  //MAX BREAKPOINTS
  const maxlogoWBP = useBreakpointValue(
    {
      base: '250px',
      sm: '250px',
      md: '250px',
      lg: '550px'
    },
    {
      fallback: '100%',
    },
  )
  const maxlogoHBP = useBreakpointValue(
    {
      base: '125px',
      sm: '125px',
      md: '125px',
      lg: '75px'
    },
    {
      fallback: '100%',
    },
  )
  //TEXT OPTIONS
  const logoLSpacingBP = useBreakpointValue(
    {
      base: '0',
      sm: '0',
      md: '0',
      lg: '4'
    },
    {
      fallback: '0em',
    },
  )
  const logoTSpacingBP = useBreakpointValue(
    {
      base: '1',
      sm: '1',
      md: '2',
      lg: '0'
    },
    {
      fallback: '0em',
    },
  )


  return (
    //MAIN WARPER
    <Center
      w="100vw"
      h={vhBP}
      minH={minvhBP}
      position="absolute"
    >
      
      {/* MAIN CARD FLEX STACK */}
      <Flex 
        h={maxlogoHBP}
        w={maxlogoWBP}
        alignItems="center"
        justify="center"
        flexDirection="column"
        bg="secondary"
        rounded={radius}
      >
        
          {/* LOGO FLEX STACK */} 
          <Flex
            flexDirection={flexBP}
            alignItems="center"
            justify="center"
          >
            {/* LOGO */} 
            <Text 
              as="t1"
              textShadow="1px 2px 0px black"
            >
              MA.AM
            </Text>
            {/* SUBTITLE */} 
            <Text 
              as="s1"
              textAlign="center"
              color="primary"
              opacity={1}
              paddingLeft={logoLSpacingBP}
              paddingTop={logoTSpacingBP}
            >
              Operated by Current & Graduate students of C.P.P.
            </Text>
          </Flex>

      </Flex>

    </Center>
  );
};
export default Footer;
