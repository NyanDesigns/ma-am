import { 
  Box,
  Center, 
  HStack, 
  Image, 
  Link,
  Text, 
  Flex, 
  Spacer, 
  useBreakpointValue,
} from "@chakra-ui/react";

const Footer = () => {
  
  //DISPLAY OPTIONS
  const vhBP = useBreakpointValue(
    {
      base: '30vh',
      sm: '30vh',
      md: '20vh',
      lg: '10vh'
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
      lg: '70px'
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
      lg: 'column'
    },
    {
      fallback: 'row',
    },
  )
  const phoneFlex = useBreakpointValue(
    {
      base: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    {
      fallback: 'column',
    },
  )
  const numberFlex = useBreakpointValue(
    {
      base: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    {
      fallback: 'column',
    },
  )
  const hourFlex = useBreakpointValue(
    {
      base: 'column',
      sm: 'column',
      md: 'row',
      lg: 'column'
    },
    {
      fallback: 'column',
    },
  )
  //MAX BREAKPOINTS
  const maxNoWBP = useBreakpointValue(
    {
      base: '100%',
      sm: '100%',
      md: '100%',
      lg: 'fit-content'
    },
    {
      fallback: '100%',
    },
  )
  const maxHourWBP = useBreakpointValue(
    {
      base: '100%',
      sm: '100%',
      md: '100%',
      lg: 'fit-content'
    },
    {
      fallback: '100%',
    },
  )
  const maxlinkWBP = useBreakpointValue(
    {
      base: '100%',
      sm: '100%',
      md: '100%',
      lg: '300px'
    },
    {
      fallback: '100%',
    },
  )
  //TEXT OPTIONS
  const letterSpacingBP = useBreakpointValue(
    {
      base: '0.15em',
      sm: '0.4em',
      md: '0.4em',
      lg: '0.05em'
    },
    {
      fallback: '0em',
    },
  )
  const smGapSpacingBP = useBreakpointValue(
    {
      base: '2',
      sm: '1',
      md: '1',
      lg: '8'
    },
    {
      fallback: '0em',
    },
  )
  const lgGapSpacingBP = useBreakpointValue(
    {
      base: '6',
      sm: '6',
      md: '4',
      lg: '8'
    },
    {
      fallback: '0em',
    },
  )
  //IMAGE OPTIONS
  const iconBP = useBreakpointValue(
    {
      base: '25px',
      sm: '35px',
      md: '35px',
      lg: '35px'
    },
    {
      fallback: '35px',
    },
  )

  return (
    //MAIN WARPER
    <Center
      bg="primary"
      w="100vw"
      h={vhBP}
      minH={minvhBP}
    >
      
      {/* MAIN FLEX STACK */}
      <Flex 
        h="fit-content"
        w="100%"
        alignItems="center"
        flexDirection={flexBP}
        paddingInline={8}
        paddingBlock={2}
        gap={lgGapSpacingBP}
      >
        
        {/* PHONE FLEX STACK */}
        <Flex
          w="100%"
          gap={lgGapSpacingBP}
          alignItems="center"
          flexDirection={phoneFlex}
        >

          {/* PHONE NOs FLEX STACK */}
          <Flex 
            w={maxNoWBP}
            alignItems="center"
            flexDirection={numberFlex}
            gap={smGapSpacingBP}
          >
            {/* PHONE NO.1 STACK*/} 
            <Flex
              w="100%"
              alignItems="center"
              flexDirection="row"
              gap={2}
            >
              {/* PHONE ICON */}
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/phone.png'
                alt='phone-icon'
              />
              <Spacer/>
              {/* PHONE NO */} 
              <Text as="s2" letterSpacing= {letterSpacingBP}>
                909-616-9090
              </Text>
            </Flex>
            {/* PHONE NO.2 STACK*/} 
            <Flex
              w="100%"
              alignItems="center"
              flexDirection="row"
              gap={2}
            >
              {/* PHONE ICON */}
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/phone.png'
                alt='phone-icon'
              />
              <Spacer/>
              {/* PHONE NO */} 
              <Text as="s2" letterSpacing= {letterSpacingBP}>
                909-616-9090
              </Text>
            </Flex>
            
          </Flex>


          {/* PHONE HOURS FLEX STACK */} 
          <Flex
            h="fit-content"
            w={maxHourWBP}
            alignItems="center"
            flexDirection="row"
            gap={2}
          >
            {/* DIVIDER */} 
            <Box 
              bg="light"
              w="2px"
              h={10}
              borderRadius="full"
              opacity=".5"
            />
            <Spacer/>
            {/* TEXT & RINGER FLEX STACK */} 
            <Flex
              h="100%"
              w="100%"
              flexDirection={hourFlex}
              gap={1}
            >
              {/* RINGER HOURS STACK*/} 
              <HStack 
                w="100%"
                alignItems="center"
                gap={0}
              >
                {/* PHONE ICON */}
                <Image
                  boxSize='15px'
                  objectFit='cover'
                  src='/icons/ringer.png'
                  alt='phone-icon'
                />
                {/* PHONE NO.1 */} 
                <Text as="s1"
                >
                  Call Hrs | Mon - Fri  |  10:00AM - 6:00PM
                </Text>
              </HStack>
              <Spacer/>
              {/* TEXT HOURS STACK*/} 
              <HStack 
                w="100%"
                alignItems="center"
                gap={0}
              >
                {/* PHONE ICON */}
                <Image
                  boxSize='15px'
                  objectFit='cover'
                  src='/icons/text.png'
                  alt='phone-icon'
                />
                {/* PHONE NO.2 */} 
                <Text as="s1"
                >
                  Text Hrs | Mon - Fri  |    2:00PM - 6:00PM
                </Text>
              </HStack>
            </Flex>
          </Flex>


          <Spacer/>
          {/* LINK STACK */} 
          <Flex
            w="100%"
            maxW={maxlinkWBP}
          >
            {/* LINK1 -MAIL*/} 
            <Link>
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/mail.png'
                alt='mail-icon'
              />
            </Link>
              <Spacer />
            {/* LINK2 -FB*/} 
            <Link>
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/fb.png'
                alt='fb-icon'
              />
            </Link>
              <Spacer />
            {/* LINK3 -INSTA*/} 
            <Link>
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/insta.png'
                alt='insta-icon'
              />
            </Link>
              <Spacer />
            {/* LINK4 -TWITTER*/} 
            <Link>
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/twitter.png'
                alt='twitter-icon'
              />
            </Link>
              <Spacer />
            {/* LINK5 -YT*/} 
            <Link>
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/yt.png'
                alt='youtube-icon'
              />
            </Link>
          </Flex>

        </Flex>

      </Flex>

    </Center>
  );
};
export default Footer;
