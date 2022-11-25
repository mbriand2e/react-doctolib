import { useState, useContext } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Flex, Heading, Box, Stack, FormControl, InputGroup, InputRightElement, Input, Button, Text, Link } from '@chakra-ui/react'

import UserContext from 'contexts/UserContext'

const Login = () => {
    const navigate = useNavigate();

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const [error, setError] = useState(null);
    const { setUser } = useContext(UserContext);

    const logInWithEmailAndPassword = async () => {
        setError(null);

        try {
            const response = await signInWithEmailAndPassword(auth, mail, password);
            setUser(response.user);
            navigate('/dashboard');
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
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Heading color="blue.500">Doctolib - Connexion</Heading>
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
            </Stack>

            <Box>
                Pas de compte ?{" "}
                <Link as={RouterLink} color="teal.500" to="/register">
                    Créez-en un
                </Link>
            </Box>
        </Flex>
    );
};

export default Login;