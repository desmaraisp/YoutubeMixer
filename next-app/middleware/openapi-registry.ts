import { playlistsRouteConfig } from '@/pages/api/playlist';
import { playlistItemsPatchRouteConfig } from '@/pages/api/playlist-items';
import { playlistDeleteRouteConfig, playlistPutRouteConfig } from '@/pages/api/playlists/[playlist-id]';
import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export function createOpenApiRegistry() {
	const registry = new OpenAPIRegistry();
	registry.registerPath(playlistsRouteConfig)
	registry.registerPath(playlistPutRouteConfig)
	registry.registerPath(playlistDeleteRouteConfig)
	registry.registerPath(playlistItemsPatchRouteConfig)

	const generator = new OpenApiGeneratorV3(registry.definitions);
	return generator.generateDocument({
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'Ad&D Helper tools api',
		}
	});
}
