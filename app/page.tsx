'use client'

import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
  Spinner,
  HStack,
  Image,
  AccordionIcon,
  Link
} from "@chakra-ui/react";
import axios from "axios";

const fetchUsers = async () => {
  const { data } = await axios.get("https://reqres.in/api/users");
  return data.data;
};

export default function Home() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["users"], queryFn: fetchUsers});

  if (isLoading) return <Spinner />;
  if (isError) return <Text>Error loading users</Text>;

  return (
    <Accordion allowToggle>
      {data.map((user: any) => (
        <AccordionItem key={user.id}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Link href={`/profile/${user.id}`}>{user.first_name}</Link>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <HStack alignItems="center">
              <Image
                boxSize="200px"
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                mr={4}
              />
              <Box>

                <Box color={'unset'}><strong color={'black'}>First name:</strong> <Link color="blue.400" href={`/profile/${user.id}`}  >{user.first_name}</Link></Box>
                <Text><strong>Last name:</strong> {user.last_name}</Text>
                <Text><strong>Email:</strong> {user.email}</Text>
              </Box>
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
