'use client'


import { useQuery } from "@tanstack/react-query";
import {Box, Text, Spinner, HStack, Image, Button, VStack} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const fetchUser = async (id: string) => {
  const { data } = await axios.get(`https://reqres.in/api/users/${id}`);
  return data.data;
};

export default function UserProfile({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, isLoading, isError } = useQuery({queryKey: ["user"
  ],
  queryFn: () => fetchUser(id)
  });
  const router = useRouter()


  if (isLoading) return <Spinner />;
  if (isError) return <Text>Error loading user</Text>;

  return (
    <VStack alignItems={'center'}>
      <Button alignSelf={'flex-start'}  onClick={() => router.push('/')} m={'2'}>
          Home
      </Button>
      <HStack alignItems="center">
        <Image
          boxSize="200px"
          src={data.avatar}
          alt={`${data.first_name} ${data.last_name}`}
          mr={4}
        />
        <Box>

          <Text>
            <strong>First name:</strong>
            <Link href={`/profile/${data.id}`}>{data.first_name}</Link></Text>
          <Text>
            <strong>Last name:</strong> {data.last_name}</Text>
          <Text><strong>Email:</strong> {data.email}</Text>
        </Box>
      </HStack>
    </VStack>
  );
}
