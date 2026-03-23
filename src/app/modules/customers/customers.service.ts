import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import { InjectModel, Model } from "nestjs-dynamoose";
import { User } from "src/app/schemas/user.schema";
import { deleteEmptyProperties } from "src/app/shared/shared.functions";
import { v4 as uuidv4 } from "uuid";

import { GenericResponse } from "../../core/interfaces/generic-response.interface";
import { Customer, CustomerKey } from "../../schemas/customer.schema";
import { handleError } from "../../shared/error.functions";
import {
  CreateCustomerDto,
  CustomersCountResponseDto,
  FindOrCreateForBookingDto,
  UpdateCustomerDto,
} from "./dto/customers.dto";

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel("Customer")
    private readonly model: Model<Customer, CustomerKey>
  ) { }

  async findAll(user: User): Promise<GenericResponse<Customer[]>> {
    try {
      const customers = await this.model
        .query('businessId')
        .using('customer-businessid-index')
        .eq(user.idBusiness)
        .exec();

      return new GenericResponse(
        customers.map((customer) => customer.serialize("frontend") as Customer)
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  async findOne(id: string, user: User): Promise<GenericResponse<Customer>> {
    try {
      const customer = await this.model.get({ id });
      if (!customer) {
        throw new Error("MS007");
      }

      // Verify customer belongs to the business
      const customerData = customer.toJSON() as Customer;
      if (customerData.businessId !== user.idBusiness) {
        throw new Error("MS007"); // Not found (for security)
      }

      return new GenericResponse(customerData);
    } catch (error) {
      throw handleError(error);
    }
  }

  async findOneByEmail(
    email: string,
    user: User
  ): Promise<GenericResponse<Customer>> {
    try {
      const customers = await this.model
        .query('businessId')
        .using('customer-businessid-index')
        .eq(user.idBusiness)
        .and()
        .where('email')
        .eq(email.toLowerCase())
        .exec();

      if (!customers || customers.length === 0) {
        throw new Error("MS007");
      }

      const customerData = customers[0].toJSON() as Customer;
      return new GenericResponse(customerData);
    } catch (error) {
      throw handleError(error);
    }
  }

  async findByIdUser(
    idUser: string,
    user: User
  ): Promise<GenericResponse<Customer[]>> {
    try {
      const customers = await this.model
        .query('businessId')
        .using('customer-businessid-index')
        .eq(user.idBusiness)
        .and()
        .where('idUser')
        .eq(idUser)
        .exec();

      return new GenericResponse(
        customers.map((customer) => customer.toJSON() as Customer)
      );
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Find customer by idUser and idBusiness (for booking flow).
   * Used when the caller is the end-user; idUser comes from @CurrentUser(), idBusiness from body.
   */
  async findByIdUserAndIdBusiness(
    idUser: string,
    idBusiness: string
  ): Promise<Customer | null> {
    try {
      const customers = await this.model
        .query('businessId')
        .using('customer-businessid-index')
        .eq(idBusiness)
        .and()
        .where('idUser')
        .eq(idUser)
        .exec();

      if (!customers || customers.length === 0) return null;
      return customers[0].toJSON() as Customer;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Find or create customer for the authenticated user in the given business.
   * User comes from token (@CurrentUser); body only receives idBusiness.
   * If a customer with the same idUser already exists for that business, returns it and updates its data from the current user.
   * Otherwise creates a new customer linked to the user.
   */
  async findOrCreateForBooking(
    user: User,
    body: FindOrCreateForBookingDto
  ): Promise<GenericResponse<Customer>> {
    try {
      const idBusiness = body.idBusiness;
      if (!idBusiness) {
        throw new Error('MS014'); // idBusiness required
      }

      const existing = await this.findByIdUserAndIdBusiness(user.id, idBusiness);

      if (existing) {
        // Update customer info on each booking from current user
        const nameParts = (user.name || '').trim().split(/\s+/);
        const updatePayload: UpdateCustomerDto = {
          firstName: nameParts[0] || existing.firstName,
          lastName: nameParts.slice(1).join(' ') || existing.lastName || undefined,
          email: user.email ?? existing.email,
          phone: user.phone ?? existing.phone,
          profilePicture: user.profilePicture ?? existing.profilePicture,
        };
        return this.update(existing.id, updatePayload, { ...user, idBusiness } as User);
      }

      // Create new customer from current user
      const nameParts = (user.name || '').trim().split(/\s+/);
      const createPayload: CreateCustomerDto = {
        firstName: nameParts[0] || 'Cliente',
        lastName: nameParts.slice(1).join(' ') || undefined,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
        idUser: user.id,
      };

      const userWithBusiness = { ...user, idBusiness } as User;
      return this.create(createPayload, userWithBusiness);
    } catch (error) {
      throw handleError(error);
    }
  }

  async create(
    body: CreateCustomerDto,
    user: User
  ): Promise<GenericResponse<Customer>> {
    try {
      // Validar que el usuario exista y tenga idBusiness
      console.log("user", user);
      if (!user) {
        throw new Error('MS014');
      }
      if (!user.idBusiness) {
        throw new Error('MS014');
      }

      // Verificar email duplicado solo si se proporciona email (dentro del mismo business)

      // Preserve data field before cleaning (even if labels is empty array)
      const dataField = body.data;
      console.log("dataField", dataField);

      const customerObj = deleteEmptyProperties({
        id: uuidv4(),
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email ? body.email.toLowerCase() : undefined,
        role: body.role || "customer",
        status: body.status !== undefined ? body.status : true,
        documentType: body.documentType,
        documentNumber: body.documentNumber,
        phone: body.phone,
        typePerson: body.typePerson || "natural",
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        country: body.country,
        city: body.city,
        address: body.address,
        profilePicture: body.profilePicture,
        idUser: body.idUser,
        businessId: user.idBusiness,
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
      });

      // Always restore data field if it was present in the original body (even if empty or with empty labels)
      if (dataField !== undefined) {
        // Ensure data is properly structured as a plain object (not a Dynamoose model instance)
        if (typeof dataField === 'object') {
          // Deep clone to ensure it's a plain object
          customerObj.data = JSON.parse(JSON.stringify(dataField));
        } else {
          customerObj.data = dataField;
        }
      }
      console.log("customerObj before create", customerObj);
      console.log("customerObj.data", customerObj.data);
      // Si no hay duplicados, crear el customer
      const newCustomer = await this.model.create(customerObj);
      console.log("newCustomer.toJSON()", newCustomer.toJSON());
      const customerData = newCustomer.toJSON() as Customer;
      console.log("customerData.data after create", customerData.data);
      return new GenericResponse(customerData);
    } catch (error) {
      throw handleError(error);
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    user: User
  ): Promise<GenericResponse<Customer>> {
    try {
      // First verify customer belongs to this business
      const existingCustomer = await this.model.get({ id });
      if (!existingCustomer) {
        throw new Error("MS007");
      }

      const existingCustomerData = existingCustomer.toJSON() as Customer;
      if (existingCustomerData.businessId !== user.idBusiness) {
        throw new Error("MS007"); // Not found (for security)
      }

      // Update email to lowercase if provided and not empty
      if (updateCustomerDto.email && updateCustomerDto.email.trim() !== "") {
        updateCustomerDto.email = updateCustomerDto.email.toLowerCase();
      }

      // Remove idBusiness from update data to prevent changing it
      const { idBusiness: _, ...updateData } = updateCustomerDto;

      // Preserve data field before cleaning (even if labels is empty array)
      const dataField = updateData.data;
      console.log("dataField", dataField);

      // Clean up empty strings for indexed fields to prevent DynamoDB validation errors
      const cleanedUpdateData = { ...updateData };

      // Remove empty strings for indexed fields (email has a global secondary index)
      if (
        cleanedUpdateData.email === "" ||
        cleanedUpdateData.email === null ||
        cleanedUpdateData.email === undefined
      ) {
        delete cleanedUpdateData.email;
      }

      // Use deleteEmptyProperties to clean up other empty values
      const finalUpdateData = deleteEmptyProperties(cleanedUpdateData);

      // Always restore data field if it was present in the original update (even if empty or with empty labels)
      if (dataField !== undefined) {
        finalUpdateData.data = dataField;
      }
      console.log("finalUpdateData", finalUpdateData);
      console.log("finalUpdateData.data", finalUpdateData.data);
      console.log("typeof finalUpdateData.data", typeof finalUpdateData.data);
      console.log("JSON.stringify(finalUpdateData.data)", JSON.stringify(finalUpdateData.data));

      // Ensure data is properly structured as a plain object (not a Dynamoose model instance)
      if (dataField !== undefined && typeof dataField === 'object') {
        // Deep clone to ensure it's a plain object
        finalUpdateData.data = JSON.parse(JSON.stringify(dataField));
      }

      // Update the customer - Dynamoose should handle the nested object correctly
      const updateResult = await this.model.update({ id }, finalUpdateData);
      console.log("updateResult.toJSON()", updateResult.toJSON());
      const updatedCustomer = await this.model.get({ id });
      if (!updatedCustomer) {
        throw new Error("MS007");
      }
      const customerData = updatedCustomer.toJSON() as Customer;
      console.log("customerData after get", customerData);
      console.log("customerData.data", customerData.data);
      return new GenericResponse(customerData);
    } catch (error) {
      throw handleError(error);
    }
  }

  async remove(id: string, user: User): Promise<GenericResponse<void>> {
    try {
      const customer = await this.model.get({ id });
      if (!customer) {
        throw new Error("MS007");
      }

      // Verify customer belongs to this business
      const customerData = customer.toJSON() as Customer;
      if (customerData.businessId !== user.idBusiness) {
        throw new Error("MS007"); // Not found (for security)
      }

      await this.model.update({ id }, { status: false });
      return new GenericResponse(undefined);
    } catch (error) {
      throw handleError(error);
    }
  }

  async getCustomersCount(
    user: User
  ): Promise<GenericResponse<CustomersCountResponseDto>> {
    try {
      // Customer rows use attribute businessId + GSI customer-businessid-index (not idBusiness)
      const businessId = user.idBusiness;

      // Calcular fechas para el filtro del mes
      const startOfMonth = moment().startOf("month").startOf("day");
      const endOfMonth = moment().endOf("month").endOf("day");

      // Obtener todos los clientes del negocio
      const monthCustomers = await this.model
        .query('businessId')
        .using('customer-businessid-index')
        .eq(businessId)
        .and()
        .where('createdAt')
        .between(startOfMonth.toDate().getTime(), endOfMonth.toDate().getTime())
        .count()
        .exec();

      const allCustomers = await this.model
        .query('businessId')
        .using('customer-businessid-index')
        .eq(businessId)
        .count()
        .exec();

      const response: CustomersCountResponseDto = {
        totalCustomers: allCustomers.count ?? 0,
        customersRegisteredToday: monthCustomers.count ?? 0,
      };

      return new GenericResponse(response);
    } catch (error) {
      throw handleError(error);
    }
  }
}
