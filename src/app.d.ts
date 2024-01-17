// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Session {
			user?: {
				token: string;
			};
		}

		// interface Error {}
		interface Locals {
			accessToken: string | undefined;
			serverToken: string | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

interface Stores {
	appStore: Writable<{ app: App; user: User; resetAccessToken: undefined | NodeJS.Timeout }>;
}

export { Stores };
