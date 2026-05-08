import { Schema } from "dynamoose";

export interface AppointmentKey {
  id: string;
}

export interface AppointmentService {
  id: string;
  name: string;
  price?: number;
  offerPrice?: number;
  measure?: number;
}

export interface Appointment extends AppointmentKey {
  id: string;
  startDate: Date;
  endDate: Date;
  idCustomer?: string;
  idEmployee?: string;
  status: string;
  idBusiness?: string;
  createdAt?: Date;
  updatedAt?: Date;
  services?: AppointmentService[];
}

export const AppointmentSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    idCustomer: {
      type: String,
      required: false,
      index: {
        type: "global",
        name: "customer-index",
      },
    },
    idEmployee: {
      type: String,
      required: false,
      index: {
        type: "global",
        name: "employee-index",
      },
    },
    status: {
      type: String,
      required: true,
      index: {
        type: "global",
        name: "status-index",
      },
    },
    idBusiness: {
      type: String,
      required: false,
      index: {
        type: "global",
        name: "idBusiness-index",
      },
    },
    services: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            id: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: false },
            offerPrice: { type: Number, required: false },
            measure: { type: Number, required: false },
          },
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
