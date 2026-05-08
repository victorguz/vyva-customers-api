import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/app/schemas/user.schema";

import { GenericResponse } from "../../core/interfaces/generic-response.interface";
import { CurrentUser } from "../../core/auth/decorators/current-user.decorator";
import { AuthGuard } from "../../core/auth/guards/auth.guard";
import { DashboardQueryDto } from "./dto/dashboard.dto";
import { DashboardService } from "./dashboard.service";

@ApiTags("Customers Dashboard")
@Controller("customers/dashboard")
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("new-customers")
  async getNewCustomers(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getNewCustomers(query, user);
  }

  @Get("retention-rate")
  async getRetentionRate(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getRetentionRate(query, user);
  }

  @Get("at-risk-customers")
  async getAtRiskCustomers(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getAtRiskCustomers(query, user);
  }

  @Get("average-frequency-days")
  async getAverageFrequencyDays(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getAverageFrequencyDays(query, user);
  }

  @Get("no-show-rate")
  async getNoShowRate(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getNoShowRate(query, user);
  }

  @Get("booking-lead-time-days")
  async getBookingLeadTimeDays(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getBookingLeadTimeDays(query, user);
  }

  @Get("average-ticket")
  async getAverageTicket(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getAverageTicket(query, user);
  }

  @Get("ltv")
  async getLtv(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getLtv(query, user);
  }

  @Get("vips")
  async getVips(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getVips(query, user);
  }

  @Get("dormant-customers")
  async getDormantCustomers(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getDormantCustomers(query, user);
  }

  @Get("lost-customers")
  async getLostCustomers(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getLostCustomers(query, user);
  }

  @Get("reluctant-customers")
  async getReluctantCustomers(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getReluctantCustomers(query, user);
  }

  @Get("projected-income")
  async getProjectedIncome(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getProjectedIncome(query, user);
  }

  @Get("lost-income")
  async getLostIncome(
    @Query() query: DashboardQueryDto,
    @CurrentUser() user: User,
  ): Promise<GenericResponse<any>> {
    return this.dashboardService.getLostIncome(query, user);
  }
}
