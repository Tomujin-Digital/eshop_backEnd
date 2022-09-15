import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./config/swagger";

async function bootstrap() {
// RestAPI
const port = process.env.PORT || 3000;
const app = await NestFactory.create(AppModule, { cors: true });

setupSwagger(app);

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