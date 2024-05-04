import { Container, Heading, } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HeadAdmin } from "@/components/HeadAdmin";
import { TableCall } from "@/components/table/TableCall";


export default function User() {
  const router = useRouter();
  return (
    <>
      <HeadAdmin/>
      <main>
        
        <Container maxW="80%">          
          <Heading  marginBottom="8" marginTop="8">Calls</Heading>
          <TableCall/>
        </Container>
      </main>
    </>
  );
}