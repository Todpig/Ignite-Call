import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "phosphor-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ConfirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ter no minimo 3 caracteres." }),
  email: z.string().email({ message: "Digite um e-mail válido!" }),
  observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof ConfirmFormSchema>;

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(ConfirmFormSchema),
  });

  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data);
  }
  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          26 de julho de 2023
        </Text>
        <Text>
          <Clock />
          10:00h
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register("name")} />
        {errors.name && <FormError size="sm">{errors.name?.message}</FormError>}
      </label>
      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="example@example.com"
          {...register("email")}
        />
        {errors.email && (
          <FormError size="sm">{errors.email?.message}</FormError>
        )}
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register("observations")} />
      </label>
      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}
