import { getProviders, signIn } from "next-auth/react";
import CustomerLogin from "/Components/Layouts/CustomerLogin";

export default function SignIn({ providers }) {
  return (
    <>
    <CustomerLogin providers={providers} signIn={signIn} />
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}