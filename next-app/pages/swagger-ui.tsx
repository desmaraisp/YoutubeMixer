import { createOpenApiRegistry } from '@/middleware/openapi-registry';
import { InferGetStaticPropsType } from 'next';
import 'swagger-ui-react/swagger-ui.css';
import SwaggerUI from 'swagger-ui-react'
import { NoSsr } from '@/components/no-ssr';

export const getStaticProps = async () => {
	const spec = createOpenApiRegistry()

	return {
		props: {
			spec,
		},
	};
};

export default function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
	return <NoSsr><SwaggerUI spec={spec} /></NoSsr>
}