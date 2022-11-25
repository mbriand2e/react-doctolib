import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'
import { Flex, Heading, Box, Stack, FormControl, InputGroup, InputRightElement, Input, Button, Text } from '@chakra-ui/react'

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const [error, setError] = useState(null);

    const logInWithEmailAndPassword = async () => {
        setError(null);

        try {
            const response = await createUserWithEmailAndPassword(auth, mail, password);
            console.log(response);
        } catch (err) {
            setError(err.message);
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
            <Heading color="blue.500">Doctolib - Inscription</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
                <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                >
                    {error && <Text align="center" color="red.500">{error}</Text>}
                    <FormControl>
                        <Input type="email" placeholder="Adresse mail..." onChange={e => setMail(e.target.value)} />
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                            <Input type="password" placeholder="Mot de passe..." onChange={e => setPassword(e.target.value)} />
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
                        Connexion
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
};

export default Login;