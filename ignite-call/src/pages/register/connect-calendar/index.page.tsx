import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
import { useForm } from "react-hook-form";
import { Header, Container } from "../styles";
import { ConnectBox, ConnectItem, AuthError } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
export default function Register() {
  //   async function handleRegister(data: RegisterFormData) {}
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === "authenticated";

  async function handleConnectCalendar() {
    await signIn("google");
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte seu calendário, para verificar automaticamente as horas
          ocupadas enovos eventos a medida que forem agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            {" "}
            Falha ao se conectar com o Google, verifique se você habilitou as
            permissões de acesso ao google Calendar.
          </AuthError>
        )}
        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
