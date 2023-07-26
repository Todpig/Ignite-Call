import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from "@ignite-ui/react";
import { ProfileBox, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Header } from "../styles";
import { useSession } from "next-auth/react";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

const UpdateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  const session = useSession();
  const router = useRouter();
  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put("/users/profile", {
      bio: data.bio,
    });
    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Último passo!</Heading>
        <Text>
          Precisamos de algumas infirmações para criar seu perfil! Ah, você pode
          editar essas infirmações depois.
        </Text>
        <MultiStep size={4} currentStep={4} />
      </Header>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>
        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register("bio")} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você, isso será exibidona pagina pessoal.
          </FormAnnotation>
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}
