import { getProviders, signIn } from "next-auth/react";
import CustomerLoin from "../../Components/Layouts/CustomerLoin";

export default function SignIn({ providers }) {
  return (
    <>
    <CustomerLoin providers={providers} signIn={signIn} />
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}