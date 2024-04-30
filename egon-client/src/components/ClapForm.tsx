import { Flex, Text, InputGroup, Input, Select, Stack, Button } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useLoaderData, useLocation } from "react-router-dom";
import clapService from "../services/claps.service";
import { User } from '../interfaces/user.interface';
import { ClapFormInput } from "../interfaces/clap.interface";

const ClapForm = () => {
  const { register, handleSubmit } = useForm<ClapFormInput>();
  const location = useLocation();
  const users : User[] = useLoaderData() as User[];
  const senderId = location.state.userId;

  const handleClapForm = async (data: ClapFormInput) => {
    const authToken = localStorage.getItem("authToken");
    const claps : ClapFormInput = {
      from_user_id: senderId,
      to_user_id: Number(data.to_user_id),
      num_claps: Number(data.num_claps),
      message: data.message
    }
    await clapService.sendClaps({claps, authToken});
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleClapForm)}>
        <Stack spacing={6}>
          <Flex w='md' flexDirection='column'>
            <Text mb='8px'>Who do you want to greet ?</Text>
            <InputGroup w='md' flexDirection="column">
              <Select {...register("to_user_id")}>
                <option value="" disabled selected hidden>Choose a colleague</option>
                {users.map((user) => {
                  return <option value={user.id}>
                    {user.name}
                  </option>
                })}
              </Select>
            </InputGroup>
          </Flex>
          <Flex flexDirection='column' mb='8px'>
            <Text mb='8px'>Claps</Text>
            <InputGroup w='md' flexDirection="column">
              <Input
                type='tel'
                placeholder='Number of claps'
                {...register("num_claps")}
                autoComplete="off"
              />
            </InputGroup>
          </Flex>
          <Flex flexDirection='column' mb='8px'>
            <Text mb='8px'>Your message</Text>
            <InputGroup w='md' flexDirection="column">
              <Input
                type='tel'
                placeholder='What do you want to remark ?'
                {...register("message")}
                autoComplete="off"
              />
            </InputGroup>
            <Button colorScheme='green' mt='32px' type="submit">Send claps</Button>
          </Flex>
        </Stack>
      </form>
    </div>
  )
}

export default ClapForm
