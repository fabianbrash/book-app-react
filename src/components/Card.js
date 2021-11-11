import React from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  theme,
} from '@chakra-ui/react';
import { useColorMode,useColorModeValue } from '@chakra-ui/react';


export const Card = ({author, title, nop}) => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.200", "gray.800")
  const color = useColorModeValue("gray.900", "white")
  return (
    <>
      <Box 
      w='500px' 
      rounded='8px'
      overflow='hidden'
      boxShadow='md'
      h="210px"
      bg={bg}
      color={color}
      m={4}
      transition="all 0.5s"
      _hover={{boxShadow: 'xl'}}
      >
        <Text p={4}>Author: {author}</Text>
        <Text p={4}>Title: {title}</Text>
        <Text p={4}>Num pages: {nop}</Text>
      </Box>

    </>
  );
};

