import { defineConfig, loadEnv } from "vite";
import dotenv from "dotenv";

export default defineConfig(({ command, mode }) => {
	// charger le fichier d'envirenmenet de test

	dotenv.config({
		path: ".env.test",
	});
	// console.log(process.env);avec Github Actions, modifier l'hôte MySQL

	if (process.env.GITHUB_ACTION) {
		process.env.MYSQL_HOST = "127.0.0.1";
	}

	//
	return {
		// vite config
		define: {
			// _APP_ENV_: JSON.stringify(env.APP_ENV),
		},
		test: {
			coverage: {
				reportsDirectory: "_tests/coverage_",
				exclude: [
					"_tests_",
					"vite.config.sj",
					"src/index.ts",
					"dist",
					"mongodb",
				],
			},
		},
	};
});