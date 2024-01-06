import * as Realm from "realm-web";
import { env } from '$env/dynamic/public'

const realmApp = new Realm.App({ id: env.PUBLIC_APP_ID as string });

export default realmApp;