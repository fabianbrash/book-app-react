import React, { useState } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Text,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const [bookData, setBookData] = useState({
    author: '',
    title: '',
    nop: '',
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    
    const newFormData = {
      ...bookData,
      [e.target.name]: e.target.value,
    }

    setBookData(newFormData);
  }

  const handleSubmit = async () => {
    axios.post('http://localhost:8000/Insert', {
      'author': bookData.author,
      'title': bookData.title,
      'nop': bookData.nop,
    })
    .then(response => {
      console.log(response);
      console.log(response.status);
      setSuccess(true);
    })
    .catch(err => {
      console.log(err);
      setError(err.message);
    })

    setBookData({
      author: '',
      title: '',
      nop: '',
    });
  }
  return (
    <>
      <Flex justifyContent="flex-end">
        <Box textAlign="center" p={2}>
          <ColorModeSwitcher />
        </Box>
      </Flex>
      
      <Flex justifyContent="center" alignItems="center" pb={400}>
        
          <Box textAlign="center" fontSize="xl" w="40%" p={6} mt={40} shadow="md" borderWidth="1px" borderRadius="lg">
           <form>
             <Stack spacing={3}>
               <FormControl id="author-name" isRequired>
                 <FormLabel>Author name</FormLabel>
                  <Input placeholder="enter author" variant="filled" value={bookData.author} name="author" onChange={handleChange} />
                </FormControl>
                <FormControl id="title" isRequired>
                 <FormLabel>Title</FormLabel>
                  <Input placeholder="enter title" variant="filled" value={bookData.title} name="title" onChange={handleChange} />
                </FormControl>
                <FormControl id="nop" isRequired>
                 <FormLabel>Number of pages</FormLabel>
                  <Input placeholder="enter number of pages" variant="filled" value={bookData.nop} name="nop" onChange={handleChange} />
                </FormControl>
              <Button colorScheme="blue" onClick={handleSubmit}>Add Book</Button>
              {error && <Text color="tomato">{error}</Text>}
              {success && <Text color="green.800" fontWeight="black">Successfully created record!</Text>}
            </Stack>
             
           </form>
           </Box>
      </Flex>
      </>
  );
}

export default App;
