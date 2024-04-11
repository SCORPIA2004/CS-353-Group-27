import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { connectToDatabase } from "@/db";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors and helmet
  app.enableCors();
  app.use(helmet());

  await connectToDatabase();

  // swagger setup
  const config = new DocumentBuilder().setTitle("fitness-tracker").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

bootstrap();
