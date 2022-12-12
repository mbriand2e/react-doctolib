import { useContext, useEffect, useState } from 'react'
import UserContext from 'contexts/UserContext'

import { db } from 'config/firebase'
import { collection, getDocs } from 'firebase/firestore'

import {Flex, Heading, Stack, Box, Card, CardBody, CardHeader} from '@chakra-ui/react'

const Dashboard = () => {
    const [pro, setPro] = useState([]);
    const { user } = useContext(UserContext);
    console.log(user);

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

        fetchPro();
    }, []);

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
                    {pro.map(_pro =>
                        <Card colorScheme="tail">
                            <CardHeader>
                                <Heading size="md">{_pro.name}</Heading>
                            </CardHeader>

                            <CardBody>
                                <label htmlFor={_pro.id + '-date'}>Date - </label>
                                <input type="date" id={_pro.id + '-date'} min={parsedDate} />
                            </CardBody>
                        </Card>
                    )}
                </Box>
            </Stack>
        </Flex>
    );
};

export default Dashboard;