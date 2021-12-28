import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useState } from "react";
import { ErrorMessages } from "../../utils/auth.erros";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInWithAnonymously = async () => {
    const { user } = await auth().signInAnonymously();
    console.log(user);
  };

  const handleCreateUserAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Usuário criado com sucesso!"))
      .catch((error) => {
        Alert.alert(ErrorMessages(error.code));
      });
  };

  const handleSighInWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch((error) => console.log(error.code));
  };

  const handleForgotPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert("E-mail enviado"));
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSighInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateUserAccount}
        />
      </Account>
    </Container>
  );
}
