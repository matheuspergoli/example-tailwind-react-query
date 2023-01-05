import React from 'react'
import Head from 'next/head'
import { getAllUsers } from '../service/getAllUsers'
import { QueryClient, useQuery, dehydrate } from 'react-query'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery('users', getAllUsers)

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
}

function Home() {
	const { data } = useQuery({ queryKey: 'users', queryFn: getAllUsers })

	return (
		<>
			<Head>
				<title>NextJS App</title>
			</Head>
			<main>
				<h1>NextJS App</h1>
			</main>
		</>
	)
}

export default Home
