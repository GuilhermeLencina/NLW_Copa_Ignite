import { Heading, VStack, Text } from 'native-base';
import { Header } from '../components/Header';
import Logo from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function New(){
    return (
        <VStack flex="1" backgroundColor="gray.900">
            <Header title='Criar novo bolão' />
            <VStack marginTop="8" marginX="5" alignItems="center">
                <Logo />
                <Heading fontFamily="heading" color="white" fontSize="xl" marginY="8" textAlign="center">
                    Crie seu própio bolão da copa {'\n'} e compartilhe entre amigos!
                </Heading>

                <Input marginBottom="2" placeholder='Qual nome do seu bolão?'/>
                <Button title="Criar meu Bolão" />
                <Text color="gray.200" fontSize="sm" textAlign="center" paddingX="10" marginTop="4">
                    Após criar seu bolão, você receberá um código único
                    que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}