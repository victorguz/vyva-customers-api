import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import { InjectModel, Model } from "nestjs-dynamoose";
import { User } from "src/app/schemas/user.schema";

import { GenericResponse } from "../../core/interfaces/generic-response.interface";
import { Appointment, AppointmentKey } from "../../schemas/appointment.schema";
import { Customer, CustomerKey } from "../../schemas/customer.schema";
import { handleError } from "../../shared/error.functions";
import { DashboardMetricDto, DashboardQueryDto } from "./dto/dashboard.dto";

type DateRange = { start?: number; end?: number };

type DashboardBaseContext = {
  includeCustomers: boolean;
  range: DateRange;
  customers: Customer[];
  appointments: Appointment[];
  customersById: Map<string, Customer>;
  appointmentsInRange: Appointment[];
  customersInRange: Customer[];
  customerAppointmentsAll: Map<string, Appointment[]>;
  customerAppointmentsInRange: Map<string, Appointment[]>;
};

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel("Customer")
    private readonly customerModel: Model<Customer, CustomerKey>,
    @InjectModel("Appointment")
    private readonly appointmentModel: Model<Appointment, AppointmentKey>,
  ) {}

  async getNewCustomers(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildNewCustomersMetric(
          context.customersInRange,
          context.includeCustomers,
        ),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getRetentionRate(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildRetentionRateMetric(
          context.customersInRange,
          context.customerAppointmentsInRange,
          context.customersById,
          context.includeCustomers,
        ),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAtRiskCustomers(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildAtRiskMetric(
          context.customerAppointmentsInRange,
          context.customersById,
          context.includeCustomers,
          context.range,
        ),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAverageFrequencyDays(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildAverageFrequencyMetric(context.customerAppointmentsInRange),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getNoShowRate(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildNoShowMetric(context.appointmentsInRange),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getBookingLeadTimeDays(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildBookingLeadTimeMetric(context.appointmentsInRange),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getAverageTicket(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildAverageTicketMetric(context.appointmentsInRange),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getLtv(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildLtvMetric(context.customerAppointmentsAll),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getVips(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildVipsMetric(
          context.customerAppointmentsAll,
          context.customersById,
          context.includeCustomers,
        ),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getDormantCustomers(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildDormantCustomersMetric(
          context.customerAppointmentsAll,
          context.customersById,
          context.includeCustomers,
          context.range,
        ),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getLostCustomers(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildLostCustomersMetric(
          context.customerAppointmentsAll,
          context.customersById,
          context.includeCustomers,
          context.range,
        ),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getReluctantCustomers(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildReluctantCustomersMetric(
          context.customerAppointmentsAll,
          context.customersById,
          context.includeCustomers,
          context.range,
        ),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getProjectedIncome(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildProjectedIncomeMetric(context.appointments, context.range),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async getLostIncome(
    query: DashboardQueryDto,
    user: User,
  ): Promise<GenericResponse<DashboardMetricDto>> {
    try {
      const context = await this.loadDashboardContext(query, user);
      return new GenericResponse(
        this.buildLostIncomeMetric(context.appointments, context.range),
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  private async loadDashboardContext(
    query: DashboardQueryDto,
    user: User,
  ): Promise<DashboardBaseContext> {
    const includeCustomers = !!query.includeCustomers;
    const range = this.parseRange(query);

    const [customers, appointments, customersInRange, appointmentsInRange] =
      await Promise.all([
        this.fetchCustomers(user.idBusiness),
        this.fetchAppointments(user.idBusiness),
        this.fetchCustomersInRange(user.idBusiness, range),
        this.fetchAppointmentsInRange(user.idBusiness, range),
      ]);

    const customersById = new Map(
      customers.map((customer) => [customer.id, customer]),
    );

    const customerAppointmentsAll =
      this.groupAppointmentsByCustomer(appointments);
    const customerAppointmentsInRange =
      this.groupAppointmentsByCustomer(appointmentsInRange);

    return {
      includeCustomers,
      range,
      customers,
      appointments,
      customersById,
      appointmentsInRange,
      customersInRange,
      customerAppointmentsAll,
      customerAppointmentsInRange,
    };
  }

  private async fetchCustomersInRange(
    idBusiness: string,
    range: DateRange,
  ): Promise<Customer[]> {
    if (!range.start || !range.end) {
      return this.fetchCustomers(idBusiness);
    }

    const customers = await this.customerModel
      .query("businessId")
      .using("customer-businessid-index")
      .eq(idBusiness)
      .where("createdAt")
      .between(range.start, range.end)
      .exec();

    return customers.map((customer) => customer.toJSON() as Customer);
  }

  private async fetchAppointmentsInRange(
    idBusiness: string,
    range: DateRange,
  ): Promise<Appointment[]> {
    if (!range.start || !range.end) {
      return this.fetchAppointments(idBusiness);
    }

    const appointments = await this.appointmentModel
      .query("idBusiness")
      .using("idBusiness-index")
      .eq(idBusiness)
      .where("startDate")
      .between(range.start, range.end)
      .exec();

    return appointments.map(
      (appointment) => appointment.toJSON() as Appointment,
    );
  }

  private parseRange(query: DashboardQueryDto): DateRange {
    if (!query.startDate || !query.endDate) {
      return {};
    }

    return {
      start: moment(query.startDate).startOf("day").valueOf(),
      end: moment(query.endDate).endOf("day").valueOf(),
    };
  }

  private async fetchCustomers(idBusiness: string): Promise<Customer[]> {
    const customers = await this.customerModel
      .query("businessId")
      .using("customer-businessid-index")
      .eq(idBusiness)
      .exec();

    return customers.map((customer) => customer.toJSON() as Customer);
  }

  private async fetchAppointments(idBusiness: string): Promise<Appointment[]> {
    const appointments = await this.appointmentModel
      .query("idBusiness")
      .using("idBusiness-index")
      .eq(idBusiness)
      .exec();

    return appointments.map(
      (appointment) => appointment.toJSON() as Appointment,
    );
  }

  private filterAppointmentsByRange(
    appointments: Appointment[],
    range: DateRange,
  ): Appointment[] {
    if (!range.start || !range.end) {
      return appointments;
    }

    const start = range.start;
    const end = range.end;

    return appointments.filter((appointment) => {
      const value = this.toMillis(appointment.startDate);
      return value >= start && value <= end;
    });
  }

  private groupAppointmentsByCustomer(
    appointments: Appointment[],
  ): Map<string, Appointment[]> {
    const grouped = new Map<string, Appointment[]>();

    appointments.forEach((appointment) => {
      if (!appointment.idCustomer) {
        return;
      }
      const list = grouped.get(appointment.idCustomer) ?? [];
      list.push(appointment);
      grouped.set(appointment.idCustomer, list);
    });

    grouped.forEach((list) => {
      list.sort(
        (a, b) => this.toMillis(a.startDate) - this.toMillis(b.startDate),
      );
    });

    return grouped;
  }

  private buildNewCustomersMetric(
    customersInRange: Customer[],
    includeCustomers: boolean,
  ): DashboardMetricDto {
    return {
      value: customersInRange.length,
      count: customersInRange.length,
      valueType: "number",
      customers: includeCustomers
        ? customersInRange.map((c) => ({
            id: c.id,
            firstName: c.firstName,
            lastName: c.lastName,
            email: c.email,
            phone: c.phone,
          }))
        : undefined,
    };
  }

  private buildRetentionRateMetric(
    customersInRange: Customer[],
    customerAppointmentsInRange: Map<string, Appointment[]>,
    customersById: Map<string, Customer>,
    includeCustomers: boolean,
  ): DashboardMetricDto {
    const retainedIds: string[] = [];

    customersInRange.forEach((customer) => {
      const count = customerAppointmentsInRange.get(customer.id)?.length ?? 0;
      if (count > 1) {
        retainedIds.push(customer.id);
      }
    });

    const base = customersInRange.length;
    const percentage = base > 0 ? (retainedIds.length / base) * 100 : 0;

    return {
      value: this.round(percentage),
      percentage: this.round(percentage),
      count: retainedIds.length,
      valueType: "percentage",
      customers: includeCustomers
        ? retainedIds
            .map((id) => customersById.get(id))
            .filter((customer): customer is Customer => !!customer)
            .map((c) => ({
              id: c.id,
              firstName: c.firstName,
              lastName: c.lastName,
              email: c.email,
              phone: c.phone,
            }))
        : undefined,
    };
  }

  private buildAtRiskMetric(
    customerAppointmentsInRange: Map<string, Appointment[]>,
    customersById: Map<string, Customer>,
    includeCustomers: boolean,
    range: DateRange,
  ): DashboardMetricDto {
    const reference = range.end ? moment(range.end) : moment();
    const threshold = reference.clone().subtract(60, "days").valueOf();

    const atRiskIds: string[] = [];
    const candidateIds: string[] = [];

    customerAppointmentsInRange.forEach((appointments, customerId) => {
      if (appointments.length < 3) {
        return;
      }
      candidateIds.push(customerId);
      const lastVisit = this.toMillis(
        appointments[appointments.length - 1].startDate,
      );
      if (lastVisit < threshold) {
        atRiskIds.push(customerId);
      }
    });

    const base = candidateIds.length;
    const percentage = base > 0 ? (atRiskIds.length / base) * 100 : 0;

    return {
      value: this.round(percentage),
      percentage: this.round(percentage),
      count: atRiskIds.length,
      valueType: "percentage",
      customers: includeCustomers
        ? atRiskIds
            .map((id) => customersById.get(id))
            .filter((customer): customer is Customer => !!customer)
            .map((c) => ({
              id: c.id,
              firstName: c.firstName,
              lastName: c.lastName,
              email: c.email,
              phone: c.phone,
            }))
        : undefined,
    };
  }

  private buildAverageFrequencyMetric(
    customerAppointmentsInRange: Map<string, Appointment[]>,
  ): DashboardMetricDto {
    const customerAverages: number[] = [];

    customerAppointmentsInRange.forEach((appointments) => {
      if (appointments.length < 2) {
        return;
      }

      const gaps: number[] = [];
      for (let i = 1; i < appointments.length; i += 1) {
        const previous = this.toMillis(appointments[i - 1].startDate);
        const current = this.toMillis(appointments[i].startDate);
        const days = (current - previous) / (1000 * 60 * 60 * 24);
        if (Number.isFinite(days) && days >= 0) {
          gaps.push(days);
        }
      }

      if (gaps.length > 0) {
        const avg = gaps.reduce((acc, value) => acc + value, 0) / gaps.length;
        customerAverages.push(avg);
      }
    });

    const average = customerAverages.length
      ? customerAverages.reduce((acc, value) => acc + value, 0) /
        customerAverages.length
      : 0;

    return {
      value: this.round(average),
      valueType: "days",
    };
  }

  private buildNoShowMetric(
    appointmentsInRange: Appointment[],
  ): DashboardMetricDto {
    const total = appointmentsInRange.length;
    const notCompleted = appointmentsInRange.filter(
      (appointment) => appointment.status !== "completed",
    ).length;

    const percentage = total > 0 ? (notCompleted / total) * 100 : 0;

    return {
      value: this.round(percentage),
      percentage: this.round(percentage),
      count: notCompleted,
      valueType: "percentage",
    };
  }

  private buildBookingLeadTimeMetric(
    appointmentsInRange: Appointment[],
  ): DashboardMetricDto {
    const diffs = appointmentsInRange
      .map((appointment) => {
        const created = this.toMillis(appointment.createdAt);
        const start = this.toMillis(appointment.startDate);
        const days = (start - created) / (1000 * 60 * 60 * 24);
        return Number.isFinite(days) && days >= 0 ? days : null;
      })
      .filter((value): value is number => value !== null);

    const average = diffs.length
      ? diffs.reduce((acc, value) => acc + value, 0) / diffs.length
      : 0;

    return {
      value: this.round(average),
      valueType: "days",
    };
  }

  private buildAverageTicketMetric(
    appointmentsInRange: Appointment[],
  ): DashboardMetricDto {
    const amounts = appointmentsInRange.map((appointment) =>
      this.appointmentAmount(appointment),
    );
    const total = amounts.reduce((acc, value) => acc + value, 0);
    const average =
      appointmentsInRange.length > 0 ? total / appointmentsInRange.length : 0;

    return {
      value: this.round(average),
      valueType: "currency",
    };
  }

  private buildLtvMetric(
    customerAppointmentsAll: Map<string, Appointment[]>,
  ): DashboardMetricDto {
    const totals: number[] = [];

    customerAppointmentsAll.forEach((appointments) => {
      if (!appointments.length) {
        return;
      }
      const total = appointments.reduce(
        (acc, appointment) => acc + this.appointmentAmount(appointment),
        0,
      );
      totals.push(total);
    });

    const average = totals.length
      ? totals.reduce((acc, value) => acc + value, 0) / totals.length
      : 0;

    return {
      value: this.round(average),
      valueType: "currency",
    };
  }

  private buildVipsMetric(
    customerAppointmentsAll: Map<string, Appointment[]>,
    customersById: Map<string, Customer>,
    includeCustomers: boolean,
  ): DashboardMetricDto {
    const allAppointments = Array.from(customerAppointmentsAll.values()).flat();
    const globalArpu =
      allAppointments.length > 0
        ? allAppointments.reduce(
            (acc, appointment) => acc + this.appointmentAmount(appointment),
            0,
          ) / allAppointments.length
        : 0;

    const vipIds: string[] = [];

    customerAppointmentsAll.forEach((appointments, customerId) => {
      if (appointments.length <= 3) {
        return;
      }

      const total = appointments.reduce(
        (acc, appointment) => acc + this.appointmentAmount(appointment),
        0,
      );
      const customerArpu = total / appointments.length;
      if (customerArpu > globalArpu) {
        vipIds.push(customerId);
      }
    });

    return {
      value: vipIds.length,
      count: vipIds.length,
      valueType: "number",
      customers: includeCustomers
        ? vipIds
            .map((id) => customersById.get(id))
            .filter((customer): customer is Customer => !!customer)
            .map((c) => ({
              id: c.id,
              firstName: c.firstName,
              lastName: c.lastName,
              email: c.email,
              phone: c.phone,
            }))
        : undefined,
    };
  }

  private buildDormantCustomersMetric(
    customerAppointmentsAll: Map<string, Appointment[]>,
    customersById: Map<string, Customer>,
    includeCustomers: boolean,
    range: DateRange,
  ): DashboardMetricDto {
    const reference = range.end ? moment(range.end) : moment();
    const threshold = reference.clone().subtract(6, "months").valueOf();
    const dormantIds: string[] = [];

    customerAppointmentsAll.forEach((appointments, customerId) => {
      if (appointments.length <= 3) {
        return;
      }
      const lastVisit = this.toMillis(
        appointments[appointments.length - 1].startDate,
      );
      if (lastVisit < threshold) {
        dormantIds.push(customerId);
      }
    });

    return {
      value: dormantIds.length,
      count: dormantIds.length,
      valueType: "number",
      customers: includeCustomers
        ? dormantIds
            .map((id) => customersById.get(id))
            .filter((customer): customer is Customer => !!customer)
            .map((c) => ({
              id: c.id,
              firstName: c.firstName,
              lastName: c.lastName,
              email: c.email,
              phone: c.phone,
            }))
        : undefined,
    };
  }

  private buildLostCustomersMetric(
    customerAppointmentsAll: Map<string, Appointment[]>,
    customersById: Map<string, Customer>,
    includeCustomers: boolean,
    range: DateRange,
  ): DashboardMetricDto {
    const reference = range.end ? moment(range.end) : moment();
    const threshold = reference.clone().subtract(6, "months").valueOf();
    const lostIds: string[] = [];

    customerAppointmentsAll.forEach((appointments, customerId) => {
      if (appointments.length !== 1) {
        return;
      }
      const onlyVisit = this.toMillis(appointments[0].startDate);
      if (onlyVisit < threshold) {
        lostIds.push(customerId);
      }
    });

    return {
      value: lostIds.length,
      count: lostIds.length,
      valueType: "number",
      customers: includeCustomers
        ? lostIds
            .map((id) => customersById.get(id))
            .filter((customer): customer is Customer => !!customer)
            .map((c) => ({
              id: c.id,
              firstName: c.firstName,
              lastName: c.lastName,
              email: c.email,
              phone: c.phone,
            }))
        : undefined,
    };
  }

  private buildReluctantCustomersMetric(
    customerAppointmentsAll: Map<string, Appointment[]>,
    customersById: Map<string, Customer>,
    includeCustomers: boolean,
    range: DateRange,
  ): DashboardMetricDto {
    const reference = range.end ? moment(range.end) : moment();
    const threshold = reference.clone().subtract(12, "months").valueOf();
    const reluctantIds: string[] = [];

    customerAppointmentsAll.forEach((appointments, customerId) => {
      const visitsInLastYear = appointments.filter(
        (appointment) => this.toMillis(appointment.startDate) >= threshold,
      ).length;

      if (visitsInLastYear === 1) {
        reluctantIds.push(customerId);
      }
    });

    return {
      value: reluctantIds.length,
      count: reluctantIds.length,
      valueType: "number",
      customers: includeCustomers
        ? reluctantIds
            .map((id) => customersById.get(id))
            .filter((customer): customer is Customer => !!customer)
            .map((c) => ({
              id: c.id,
              firstName: c.firstName,
              lastName: c.lastName,
              email: c.email,
              phone: c.phone,
            }))
        : undefined,
    };
  }

  private buildProjectedIncomeMetric(
    appointments: Appointment[],
    range: DateRange,
  ): DashboardMetricDto {
    const scoped = this.filterByMonthOrRange(appointments, range);
    const projectedStatuses = new Set(["pending", "confirmed"]);

    const total = scoped
      .filter((appointment) => projectedStatuses.has(appointment.status))
      .reduce(
        (acc, appointment) => acc + this.appointmentAmount(appointment),
        0,
      );

    return {
      value: this.round(total),
      valueType: "currency",
    };
  }

  private buildLostIncomeMetric(
    appointments: Appointment[],
    range: DateRange,
  ): DashboardMetricDto {
    const scoped = this.filterByMonthOrRange(appointments, range);

    const total = scoped
      .filter(
        (appointment) =>
          appointment.status !== "completed" &&
          appointment.status !== "timeOut",
      )
      .reduce(
        (acc, appointment) => acc + this.appointmentAmount(appointment),
        0,
      );

    return {
      value: this.round(total),
      valueType: "currency",
    };
  }

  private filterByMonthOrRange(
    appointments: Appointment[],
    range: DateRange,
  ): Appointment[] {
    if (range.start && range.end) {
      return this.filterAppointmentsByRange(appointments, range);
    }

    const monthStart = moment().startOf("month").valueOf();
    const monthEnd = moment().endOf("month").valueOf();

    return appointments.filter((appointment) => {
      const value = this.toMillis(appointment.startDate);
      return value >= monthStart && value <= monthEnd;
    });
  }

  private appointmentAmount(appointment: Appointment): number {
    if (!appointment.services || appointment.services.length === 0) {
      return 0;
    }

    return appointment.services.reduce((acc, service) => {
      const amount = service.offerPrice ?? service.price ?? 0;
      return acc + amount;
    }, 0);
  }

  private toMillis(value?: Date | string | number): number {
    if (typeof value === "number") {
      return value;
    }

    if (value instanceof Date) {
      return value.getTime();
    }

    if (typeof value === "string") {
      return new Date(value).getTime();
    }

    return 0;
  }

  private round(value: number): number {
    if (!Number.isFinite(value)) {
      return 0;
    }

    return Math.round(value * 100) / 100;
  }
}
