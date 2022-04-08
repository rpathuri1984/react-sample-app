import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../context/AuthContext";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useLoginQuery } from "../services/IdentityServiceApi";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("e-mail required"),
  password: Yup.string()
    .required("Password required")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

/**
 * @description this should be removed before pushing to PROD
 *
 */
const registerApiMocks = () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onPost(/token/i).reply(200, {
    access:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJhdmkiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTcxNjIzOTAyMiwiZW1haWwiOiJycGF0aHVyaUBnbWFpbC5jb20ifQ.6QbUtZHfb8mxpokKDg1B5DK60kuAjc4Lo-xGr53honU",
    refresh: "1234",
  });
  mockApi.onPost(/validatetoken/i).reply(200, false);
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginReqest, setLoginRequet] = React.useState<any>(skipToken);
  const { data, isSuccess, isError, error, isLoading, currentData } =
    useLoginQuery(loginReqest);

  const handleShowClick = () => setShowPassword(!showPassword);
  const context = React.useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setLoginRequet({ userName: values.email, password: values.password });
    },
  });

  // TODO: this should be removed before PROD
  registerApiMocks();

  const checkAndRedirect = async () => {
    if (isSuccess) {
      await context?.setLoginSuccess(data);
      window.location.href = "/user";
    } else if (isError) {
      console.log(error, currentData, isLoading);
    }
  };

  React.useEffect(() => {
    checkAndRedirect();
  });

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl
                isRequired
                isInvalid={formik.errors?.email ? true : false}
              >
                <FormLabel htmlFor="email">E-Mail</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    name="email"
                    id="email"
                    placeholder="email address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </InputGroup>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={formik.errors?.password ? true : false}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default LoginPage;
