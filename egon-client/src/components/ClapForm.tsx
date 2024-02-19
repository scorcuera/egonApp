import { Flex, Text, InputGroup, Input, Select, Stack, Button } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useLoaderData, useLocation } from "react-router-dom";
import clapService from "../services/claps.service";

const ClapForm = () => {
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const users = useLoaderData();
  const senderId = location.state.userId;

  const handleClapForm = async (data: any) => {
    const clapDataForm = {
      from_user_id: senderId,
      to_user_id: Number(data.to_user_id),
      num_claps: Number(data.num_claps),
      message: data.message
    }
    await clapService.sendClaps(clapDataForm);
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
