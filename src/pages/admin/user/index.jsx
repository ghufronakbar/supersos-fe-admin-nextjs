import { Container, Heading } from "@chakra-ui/react";
import { HeadAdmin } from "@/components/HeadAdmin";
import { TableUser } from "@/components/table/TableUser";
import { NavbarAdmin } from "@/components/NavbarAdmin";

export default function User() {
  return (
    <>
      <HeadAdmin />
      <NavbarAdmin />
      <main>
        <Container maxW="80%">
          <Heading marginBottom="8" marginTop="8">
            Users
          </Heading>
          <TableUser />
        </Container>
      </main>
    </>
  );
}
