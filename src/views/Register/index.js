import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

import { auth, db } from 'config/firebase'
import UserContext from 'contexts/UserContext'
import {
    Flex,
    Heading,
    Box,
    Stack,
    FormControl,
    InputGroup,
    InputRightElement,
    Input,
    Button,
    Text, Radio, RadioGroup
} from '@chakra-ui/react'

const Login = () => {
    const navigate = useNavigate();

    const [gender, setGender] = useState('M');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const [error, setError] = useState(null);
    const { setUser } = useContext(UserContext);

    const logInWithEmailAndPassword = async () => {
        setError(null);

        try {
            const response = await createUserWithEmailAndPassword(auth, mail, password);

            await addDoc(collection(db, 'users'), {
                uid: response.user.uid,
                gender,
                mail,
                address
            });

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
                <Heading color="blue.500">Doctolib - Inscription</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <Stack
                        spacing={4}
                        p="1rem"
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md"
                    >
                        {error && <Text align="center" color="red.500">{error}</Text>}
                        <FormControl style={{ textAlign: 'center' }}>
                            <RadioGroup defaultValue={gender} onChange={value => setGender(value)}>
                                <Radio value="M">Monsieur</Radio>
                                <Radio value="Mme">Madame</Radio>
                            </RadioGroup>
                        </FormControl>

                        <FormControl>
                            <Input type="email" placeholder="Adresse mail" onChange={e => setMail(e.target.value)} />
                        </FormControl>

                        <FormControl>
                            <InputGroup>
                                <Input type={showPassword ? "text" : "password"} placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                        {showPassword ? "Show" : "Hide"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <Input type="text" placeholder="Adresse postale" onChange={e => setAddress(e.target.value)} />
                        </FormControl>

                        <Button
                            type="submit"
                            variant="solid"
                            colorScheme="blue"
                            width="full"
                            onClick={logInWithEmailAndPassword}
                        >
                            Valider
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;