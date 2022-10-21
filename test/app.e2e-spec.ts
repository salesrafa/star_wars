import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("PlanetController (e2e)", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/planet/load-planet/1 (POST)", () => {
    return request(app.getHttpServer())
      .post("/planet/load-planet/1")
      .expect(201)
      .expect({ message: "success" })
      .timeout(20000);
  });

  it("/planet (GET)", () => {
    return request(app.getHttpServer()).get("/planet").expect(200);
  });

  it("/planet searching for Tatooine (GET)", () => {
    return request(app.getHttpServer())
      .get("/planet?name=Tatooine")
      .expect(200);
  });

  it("/planet/1 (GET)", () => {
    return request(app.getHttpServer()).get("/planet/1").expect(200);
  });

  it("/planet/1 (DELETE)", () => {
    return request(app.getHttpServer())
      .delete("/planet/1")
      .expect(200)
      .expect({ message: "success" });
  });
});
