import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function initializeSwagger(app: INestApplication, name: string): void {

    const configurations = new DocumentBuilder()
        .setTitle(name)
        .setDescription(`API Documentation for ${name} API`)
        .setVersion('1.0')
        .addBearerAuth({ // TODO: fix this in base project
            type: 'http',
            description: 'Add JWT Token',
            name: 'Authorization',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        }, 'api_key_auth')
        .build();
    const document = SwaggerModule.createDocument(app, configurations);
    SwaggerModule.setup('api', app, document);
} 