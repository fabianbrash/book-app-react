import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    Box,
    Flex,
    Spinner,
    theme
  } from '@chakra-ui/react';
import { useColorMode,useColorModeValue } from '@chakra-ui/react';
import axios from 'axios'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Card }  from './Card';

function Books() {
    const base_URL = 'http://localhost:8000';
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const bg = useColorModeValue("white", "gray.800")

    useEffect(() => {
        axios.get(`${base_URL}/books`)
        .then(res => {
            setData(res.data.data)
            console.log(res.data.data)
        })
        .catch(err => console.error(err))
        .finally(() => {
            setIsLoading(false);
        })
    },[])

    if(isLoading) return (
        <>
            <Flex justifyContent="center" alignItems="center" 
            mt={30}
            height="80vh"
            >
                <Spinner color="green.300" size="lg"/>
            </Flex>
        </>
);

    return (
        <>
            <Flex justifyContent="flex-end">
                <Box textAlign="center" p={2}>
                 <ColorModeSwitcher />
                </Box>
            </Flex>
        <Flex justifyContent="center" w='100%' wrap="wrap" alignItems="center" direction={['column', 'column', 'row', 'row']}>
            {data && data.map(book => (
                    <Card key={book._id} title={book.title} author={book.author} nop={book.nop} />
                
            ))}
        </Flex>
        </>
    )
}
export default Books
