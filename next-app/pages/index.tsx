import { Card, List, Space, Text, Title } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

export const getServerSideProps = async (_context: GetServerSidePropsContext) => ({ props: {} })

export default function Home() {
	return (<>
		<Title>About the randomizer</Title>
		<Card withBorder>
			<Text>
				Welcome to desmaraisp&apos;s randomizer, where youtube meets spotify in perfect harmony.
			</Text>

			<Space h="md" />
			<Text>
				Are you tired of toggling between YouTube (including Music) and Spotify to enjoy your favorite music? Look no further, you can now seamlessly merge them all together in one easy-to-use interface.
			</Text>

			<Space h="md" />
			<Text>
				Includes:
			</Text>

			<List>
				<List.Item>
					Cross-platform compatibility: Whether you&apos;re on your computer, tablet, or smartphone, this ensures that your playlists are accessible anytime, anywhere. Enjoy your favorite tunes across all your devices effortlessly.
				</List.Item>
				<List.Item>
					Synchronized player: Resume where you left off, allowing you to finally get to the bottom of that endless playlist instead of starting over every time.
				</List.Item>
				<List.Item>
					True shuffling: Instead of hearing the same 10 tracks over and over again (hello youtube playlists), get ALL of your tracks in a random order. No tracks left behind!
				</List.Item>
				<List.Item>
					Uncapped playlist size: There&apos;s no limit to how many tracks or playlists you can mix together. I&apos;m personally somewhere around 600, but I&apos;m sure some of you have more
				</List.Item>
			</List>
			<Space h="md" />

			<Text>
				Ready to elevate your playlist game? Head over <Link href={"/playlists"}>here</Link> to add your first playlist, then enjoy your playlist <Link href={"/player"}>here</Link>.
			</Text>
			<Space h="xl" />

			<Title order={2}>Technical details</Title>
			<List>
				<List.Item>
					Hosted on Cloud Run
				</List.Item>
				<List.Item>
					Developed with NextJS + Prisma ORM
				</List.Item>
				<List.Item>
					Data persistence through Supabase DB
				</List.Item>
				<List.Item>
					Authentication through Supabase auth
				</List.Item>
				<List.Item>
					See the <Link href={"https://github.com/desmaraisp/YoutubeMixer"}>source code</Link>
				</List.Item>
				<List.Item>
					See the <Link href={"https://hub.docker.com/r/desmaraisp/youtube-randomizer"}>docker image</Link>
				</List.Item>
			</List>
		</Card></>)
}
