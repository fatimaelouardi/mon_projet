import { describe, expect, it } from "vitest";
import supertest, { type Response } from "supertest";
import Server from "../../src/core/server";
import Jwt from "jsonwebtoken";
import MySQLService from "../../src/service/mysql_service";
import type Role from "../../src/models/role_model";
import type User from "../../src/models/user_model";
import type Produit from "../../src/models/produit_model";

describe("produit controller tests suite", async () => {
	// route principale appelée par les tests
	const route = "/produit";

	// user admin
	const role: Role = {
		id_role: 1,
		name: "Admin",
	};
	const admin: User = {
		id_utilisateur: 1,
		email: "email@email.fr",
		mot_de_passe: "password",
		nom: "zena",
		telephone: "0101010101",
		id_role: 1,
		role: role,
	};
	// création d'un produit
	const data: Produit = {
		id_produit: 1,
		nom: "t-shirt",
		description: "description",
		prix: 100,
		theme: "casual",
		genre: "homme",
		image: "th.jpeg",
	};

	// génerer un jwt
	const token = Jwt.sign(
		{
			user: admin,
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: 30,
		},
	);

	const getLastId = async () => {
		// acceder au service my sql
		const mySQLService = new MySQLService();
		const connection = await mySQLService.connect();
		const transaction = await connection.getConnection();
		await transaction.beginTransaction();
		// selection  d'un produit
		const query = `
    SELECT id_produit
    FROM ${process.env.MYSQL_DB}.Produit
    ORDER BY id_produit DESC
    LIMIT 1;
`;
		const results: Produit[] | unknown = await connection.execute(query, data);
		const fullresults: Produit | unknown = (
			(results as Produit[]).shift() as []
		).shift();

		return fullresults;
	};

	it("should return a status code 200 with all entries", async () => {
		const expected = 200;

		// sut (syteme under test)
		const sut = await supertest(new Server().createServer()).get(route);
		const actual = sut.status;
		// assertion
		expect(actual).toBe(expected);
	});

	it("should return a status code 200 with one entry", async () => {
		const expected = 200;

		// sut (syteme under test)
		const sut: Response = await supertest(new Server().createServer()).get(`${route}/1`);
		const actual = sut.status;
		// assertion
		expect(actual).toBe(expected);
	});

	it("should return a status code 201 with create entry", async () => {
		const expected = 201;

		// sut (syteme under test)
		const sut = await supertest(new Server().createServer())
			.post(route)
			.auth(token, { type: "bearer" })
			.send(data);
		const actual = sut.status;
		// assertion
		expect(actual).toBe(expected);
	});

	it("should return a status code 200 with one entry update", async () => {
		const expected = 200;

		const lastId = await getLastId();

		// sut (syteme under test)
		const sut = await supertest(new Server().createServer())
			.put(`${route}/${(lastId as Produit).id_produit}`)
			.auth(token, { type: "bearer" })
			.send(data);

		const actual = sut.status;
		// assertion
		expect(actual).toBe(expected);
	});

	it("should return a status code 200 with one entry delete", async () => {
		const expected = 200;
		const lastId = await getLastId();

		const sut = await supertest(new Server().createServer())
			.delete(`${route}/${(lastId as Produit).id_produit}`)
			.auth(token, { type: "bearer" });

		const actual = sut.status;
		// assertion
		expect(actual).toBe(expected);
	});
});