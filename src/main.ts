import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./config/swagger";

async function bootstrap() {
  const port = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {cors:true});
  
  app.setGlobalPrefix("v1");
  setupSwagger(app);
  

  // RestAPI
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });

  await app.listen(port);
  console.log("Listening " + port);
}
bootstrap();
