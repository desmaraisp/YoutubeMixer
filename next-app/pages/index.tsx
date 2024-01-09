import { Text } from "@mantine/core";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (_context: GetServerSidePropsContext) => ({ props: { } })

export default function Home() {
	return (
		<Text>Home</Text>
	)
}
