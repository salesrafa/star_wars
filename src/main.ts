import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const planetsApp = await NestFactory.create(AppModule);
  await planetsApp.listen(3000);
}

bootstrap();
