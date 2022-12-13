import { useContext, useEffect, useState } from 'react'
import UserContext from 'contexts/UserContext'

import { db } from 'config/firebase'
import { addDoc, collection, getDocs, where, query } from 'firebase/firestore'

import {Flex, Heading, Stack, Box, Card, CardBody, CardHeader, Button, Input} from '@chakra-ui/react'

const Dashboard = () => {
    const [dates, setDates] = useState([]);
    const [pro, setPro] = useState([]);
    const [rdv, setRdv] = useState([]);
    const { user } = useContext(UserContext);

    const currentDate = new Date();
    const parsedDate = currentDate.toISOString().split('T')[0];

    useEffect(() => {
        const fetchPro = async () => {
            const proRef = collection(db, 'pro')
            const docList = await getDocs(proRef);

            let proList = [];
            docList.forEach(doc => {
                proList.push({ id: doc.id, name: doc.data().name });
            });

            setPro(proList);
        };

        const fetchRdv = async () => {
            const rdvRef = collection(db, 'rdv');
            const q = query(rdvRef, where('user_id', '==', user.uid));


        }

        fetchPro();
        fetchRdv();
    }, []);

    const validateRdv = async (proId, date) => {
        await addDoc(collection(db, 'rdv'), {
            pro_id: proId,
            user_id: user.uid,
            date
        });
    }

    const handleDateSelection = (e, id) => {
        const { value } = e.target;
        setDates(prevDates => ({ ...prevDates, [id]: value }));
    }

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
                <Heading color="blue.500">Prise de rendez-vous</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    {pro.map((_pro, index) =>
                        <Card colorScheme="tail" key={index}>
                            <CardHeader>
                                <Heading size="md">{_pro.name}</Heading>
                            </CardHeader>

                            <CardBody>
                                <Flex justifyContent="space-evenly">
                                    <Input type="date" min={parsedDate} onChange={e => handleDateSelection(e, _pro.id)} />
                                    <Button colorScheme="blue" size="md" disabled={dates[_pro.id] === ''} onClick={() => validateRdv(_pro.id, dates[_pro.id])}>Valider</Button>
                                </Flex>
                            </CardBody>
                        </Card>
                    )}
                </Box>
            </Stack>

            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Heading color="blue.500">Mes rendez-vous</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>

                </Box>
            </Stack>
        </Flex>
    );
};

export default Dashboard;