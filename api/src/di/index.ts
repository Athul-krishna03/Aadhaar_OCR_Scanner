import { container } from "tsyringe";
import { ServicesRegistery } from "./service.register";
import { Controllers } from "../controllers/controllers";

export class DependencyInjection {
    static registerAll(): void {
        // RepositoryRegistry.registerRepositories();
        ServicesRegistery.registerServices();
    }
}

DependencyInjection.registerAll()
export const controllers = container.resolve(Controllers)