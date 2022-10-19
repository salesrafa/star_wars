import { Controller } from "@nestjs/common";
import { AppService } from "../services/app.service";

@Controller()
export class PlanetsController {
  constructor(private readonly appService: AppService) {}
}
