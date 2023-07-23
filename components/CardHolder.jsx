import { 
  Box,
  Center, 
  Image, 
  Text, 
  Flex, 
  Spacer, 
  useBreakpointValue,
} from "@chakra-ui/react";
import bgH from '../public/bgh.jpg';

const CardHolder = () => {

  const radius = "20px"
  //DISPLAY OPTIONS
  const breakpoint = useBreakpointValue({ base: "base", sm: "sm", md: "md", lg: "lg" });
  const vhBP = useBreakpointValue(
    {
      base: '100vh',
      sm: '100vh',
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
      md: '230px',
      lg: '125px'
    },
    {
      fallback: '250px',
    },
  )
  //FLEX OPTIONS
  const cardFlex = useBreakpointValue(
    {
      base: 'row',
      sm: 'row',
      md: 'column',
      lg: 'row'
    },
    {
      fallback: 'column',
    },
  )
  const stackFlex = useBreakpointValue(
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
  //MAX BREAKPOINTS
  const maxCardHBP = useBreakpointValue(
    {
      base: '125px',
      sm: '125px',
      md: '220px',
      lg: '115px'
    },
    {
      fallback: '125px',
    },
  )
  const maxCardWBP = useBreakpointValue(
    {
      base: '100%',
      sm: '100%',
      md: '200px',
      lg: '320px'
    },
    {
      fallback: '200px',
    },
  )
  const maxArrowWBP = useBreakpointValue(
    {
      base: '30px',
      sm: '35px',
      md: '35px',
      lg: '40px'
    },
    {
      fallback: '35px',
    },
  )
  const ArrowRotateBP = useBreakpointValue(
    {
      base: 'rotate(90deg)',
      sm: 'rotate(90deg)',
      md: 'rotate(0deg)',
      lg: 'rotate(0deg)'
    },
    {
      fallback: '35px',
    },
  )
  const maxTextWBP = useBreakpointValue(
    {
      base: '190px',
      sm: '190px',
      md: '140px',
      lg: '190px'
    },
    {
      fallback: '200px',
    },
  )
  //TEXT OPTIONS
  const vPadingBP = useBreakpointValue(
    {
      base: '10',
      sm: '1',
      md: '1',
      lg: '1'
    },
    {
      fallback: '0em',
    },
  )
  const smGapSpacingBP = useBreakpointValue(
    {
      base: '1',
      sm: '1',
      md: '1',
      lg: '1'
    },
    {
      fallback: '0em',
    },
  )
  const lgGapSpacingBP = useBreakpointValue(
    {
      base: '6',
      sm: '2',
      md: '2',
      lg: '6'
    },
    {
      fallback: '0em',
    },
  )
  //IMAGE OPTIONS
  const iconBP = useBreakpointValue(
    {
      base: '50px',
      sm: '50px',
      md: '60px',
      lg: '65px'
    },
    {
      fallback: '35px',
    },
  )

  return (
    //BG WARPER
    <Box 
      backgroundImage={`url(${bgH.src})`} 
      backgroundSize="cover" 
      backgroundPosition="center" 
      w="100vw" 
      h="100%"
    >
      {/* MAIN CENTER STACK */}
      <Center
        w="100vw"
        h={vhBP}
        minH={minvhBP}
        border="1"
        borderTopWidth="4px"
        borderColor="accent"
      >
        {/* MAIN CARD STACK */}
        <Flex 
          h="100%"
          w="100%"
          border="1"
          borderTopWidth="2px"
          alignItems="center"
          flexDirection={stackFlex}
          gap={smGapSpacingBP}
          paddingInline={8}
          paddingBlock={vPadingBP}
        >
          
          {breakpoint === "base" || breakpoint === "sm" ? (
            <>
              {/* ARROW ICON */}
              <Image
                h="fit-content"
                w={maxArrowWBP}
                objectFit='cover'
                src='/icons/arrow.png'
                alt='arrow-icon'
                transform={ArrowRotateBP}
                opacity=".75"
              />
              <Spacer/>
            </>
          ) : null}

          {/* CARD - UPLOAD */} 
          <Center
            background="primary"
            w={maxCardWBP}
            h={maxCardHBP}
            rounded={radius}
          >
            {/* CONTENT FLEX STACK */}
            <Flex
              h="fit-content"
              w="fit-content"
              alignItems="center"
              flexDirection={cardFlex}
              gap={lgGapSpacingBP}
            >
              {/* ICON */}
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/upload.png'
                alt='phone-icon'
              />
              {/* TEXT STACK */}
              <Flex 
                h="100%"
                w="fit-content"
                alignItems="center"
                flexDirection="column"
                gap={smGapSpacingBP}
              >
                {/* TITLE */} 
                <Text 
                  as="t2"
                  w={maxTextWBP}
                >
                  You Upload-
                </Text>
                <Spacer/>
                {/* SUBTITLE */} 
                <Text 
                  as="s1"
                  w={maxTextWBP}
                >
                  your 3D design file in the following formats; STL, 3DM.
                </Text>
              </Flex>
            </Flex>
          </Center>

          <Spacer/>
          {/* ARROW ICON */}
          <Image
            h="fit-content"
            w={maxArrowWBP}
            objectFit='cover'
            src='/icons/arrow.png'
            alt='arrow-icon'
            transform={ArrowRotateBP}
          />
          <Spacer/>

          {/* CARD - FAB */} 
          <Center
            background="primary"
            w={maxCardWBP}
            h={maxCardHBP}
            rounded={radius}
          >
            {/* CONTENT FLEX STACK */}
            <Flex
              h="fit-content"
              w="fit-content"
              alignItems="center"
              flexDirection={cardFlex}
              gap={lgGapSpacingBP}
            >
              {/* ICON */}
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/printer.png'
                alt='3d-printer-icon'
              />
              {/* TEXT STACK */}
              <Flex 
                h="100%"
                w="fit-content"
                alignItems="center"
                flexDirection="column"
                gap={smGapSpacingBP}
              >
                {/* TITLE */} 
                <Text 
                  as="t2"
                  w={maxTextWBP}
                >
                  We Fabricate-
                </Text>
                <Spacer/>
                {/* SUBTITLE */} 
                <Text 
                  as="s1"
                  w={maxTextWBP}
                >
                  your 3D design file in the following formats; STL, 3DM.
                </Text>
              </Flex>
            </Flex>
          </Center>

          <Spacer/>
          {/* ARROW ICON */}
          <Image
            h="fit-content"
            w={maxArrowWBP}
            objectFit='cover'
            src='/icons/arrow.png'
            alt='phone-icon'
            transform={ArrowRotateBP}
          />
          <Spacer/>

          {/* CARD - PICK-UP */} 
          <Center
            background="primary"
            w={maxCardWBP}
            h={maxCardHBP}
            rounded={radius}
          >
            {/* CONTENT FLEX STACK */}
            <Flex
              h="fit-content"
              w="fit-content"
              alignItems="center"
              flexDirection={cardFlex}
              gap={lgGapSpacingBP}
            >
              {/* ICON */}
              <Image
                boxSize={iconBP}
                objectFit='cover'
                src='/icons/picker.png'
                alt='pick-up-icon'
              />
              {/* TEXT STACK */}
              <Flex 
                h="100%"
                w="fit-content"
                alignItems="center"
                flexDirection="column"
                gap={smGapSpacingBP}
              >
                {/* TITLE */} 
                <Text 
                  as="t2"
                  w={maxTextWBP}
                >
                  You Pickup-
                </Text>
                <Spacer/>
                {/* SUBTITLE */} 
                <Text 
                  as="s1"
                  w={maxTextWBP}
                >
                  your 3D design file in the following formats; STL, 3DM.
                </Text>
              </Flex>
            </Flex>
          </Center>
          
        </Flex>
      </Center>

    </Box>
  );
};
export default CardHolder;
