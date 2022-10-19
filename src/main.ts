import { PublicApiService } from "./services/publicApi.service";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  try {
    const dataImported = await PublicApiService.loadData();
    if (dataImported) {
      const app = await NestFactory.create(AppModule);
      await app.listen(3000);
    }
  } catch (e) {
    throw new Error(e);
  }
}
bootstrap();
