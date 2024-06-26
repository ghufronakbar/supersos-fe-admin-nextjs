import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { formatDecimal } from "@/lib/formatDecimal";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Loading } from "../Loading";
import { useState } from "react";
import { formatDate } from "@/lib/formatDate";

export function TableCallType() {
  const router = useRouter();
  const toast = useToast();
  const { id: type } = router.query;
  const [isLoading, setIsloading] = useState(true)


  let i = 1;
  const { data: dataCall, refetch: refetchDataCall } = useQuery({
    queryKey: ["call/type", type],
    queryFn: async () => {
      const dataResponse = await axiosInstance.get(`/call/type/${type}`);
      setIsloading(false)
      return dataResponse;
    },
  });

  const handleDetail = (id_call) => {
    router.push(`/admin/call/${id_call}`);
  };
  if(isLoading)return(<><Loading/></>)

  return (
    <>
      <Heading marginBottom="8" marginTop="8">
        Panggilan{" "}
        {type == 1 ? "Rumah Sakit" : type == 2 ? "Polisi" : "Pemadam Kebakaran"}
      </Heading>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th></Th>
              <Th>Nama</Th>
              <Th>Lokasi</Th>
              <Th>Jenis</Th>
              <Th>Diajukan Pada</Th>
              <Th>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataCall?.data.values.map((item) => (
              <Tr key={item.id_call}>
                <Td>{i++}</Td>
                <Td>
                  {item.user.map((user, index) => (
                    <Image
                      key={index}
                      borderRadius="18"
                      boxSize="60px"
                      objectFit="cover"
                      src={user.picture}
                      alt={user.picture}
                    />
                  ))}
                </Td>
                <Td>
                  <Text as="b">
                    {item.user.map((user) => (
                      <>{user.fullname}</>
                    ))}
                  </Text>
                </Td>
                <Td>
                  <HStack>
                    <Text>{formatDecimal(item.latitude)}, </Text>
                    <Text>{formatDecimal(item.longitude)}</Text>{" "}
                    <a href={item.url_google_map} target="_blank">
                      <ExternalLinkIcon />
                    </a>
                  </HStack>
                </Td>{" "}
                <Td>
                  <Text as="b">
                    {item.type == 1
                      ? "Rumah Sakit"
                      : item.type == 2
                      ? "Polisi"
                      : "Pemadam Kebakaran"}
                  </Text>
                </Td>
                <Td>
                  <Text>{formatDate(item.applied_at)}</Text>
                </Td>

                <Td>
                  <Center>
                    <Box
                      as="button"
                      borderRadius="md"
                      bg={
                        item.status === 0
                          ? "#CBD5E0"
                          : item.status === 1
                          ? "#E53E3E"
                          : "#0063d1"
                      }
                      color="white"
                      p={2}
                      m={2}
                      px={4}
                    >
                      <VStack>
                        <Text as="b">
                          {item.status === 0
                            ? "Menunggu"
                            : item.status === 1
                            ? "Dibatalkan"
                            : "Diterima"}
                        </Text>
                        {item.status === 0 ? (
                          ""
                        ) : item.status == 1 ? (
                          <Text>Dibatalkan Oleh Pengguna</Text>
                        ) : (
                          <Text>{formatDate(item.answered_at)}</Text>
                        )}
                      </VStack>
                    </Box>
                  </Center>
                </Td>
                <Td>
                  <Center>
                    <Button
                      variant="outline"
                      colorScheme="grey"
                      onClick={() => handleDetail(item.id_call)}
                    >
                      <Text as="b">Detail</Text>
                    </Button>
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {dataCall?.data.values.length == 0 ? (
              <Alert status="info">
                <AlertIcon />
                Tidak ada data
              </Alert>
            ) : null }
      </TableContainer>
    </>
  );
}
