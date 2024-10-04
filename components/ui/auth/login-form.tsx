import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginFormSchema } from "@/schemas";
import {
  Form,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/form";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="welcome back "
      backButtonLabel="dont have an account? sign up"
      backButtonHref="/auth/register"
      showSocial
    >
      Login Form
    </CardWrapper>
  );
};

export default LoginForm;
