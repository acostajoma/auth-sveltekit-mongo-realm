import * as Realm from "realm-web";
import { env } from '$env/dynamic/public'

export const app = new Realm.App({ id: env.PUBLIC_APP_ID });
