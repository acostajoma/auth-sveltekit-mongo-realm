import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: 'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-tsrrf/graphql',
	fetchParams( { session } ){
		console.log('ACCESS TOKEN : ', session?.user?.token)
		return {
			headers: {
				Authorization: `Bearer ${session?.user?.token}`,
			}
		}
	}
});
