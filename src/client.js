import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: 'https://us-east-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/application-0-tsrrf/graphql',
	fetchParams({ session }) {
		return {
			headers: {
				Authorization: `Bearer ${session?.user?.token}`
			}
		};
	}
});
