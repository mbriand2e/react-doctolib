import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'
import { Flex, Heading, Box, Stack, FormControl, InputGroup, InputRightElement, Input, Button } from '@chakra-ui/react'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const logInWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <Heading color="blue.500">Doctolib</Heading>
            <Box minW={{ base: "90%", md: "468px" }} borderWidth='1px' borderRadius="lg">
                <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                >
                    <FormControl>
                        <Input type="email" placeholder="Mail..." variant="outline" />
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                            <Input type="password" placeholder="Password..." />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                        onClick={logInWithEmailAndPassword}
                    >
                        Login
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
};

export default Login;