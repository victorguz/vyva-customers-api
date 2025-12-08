import { HttpStatus } from '@nestjs/common';
export declare enum ERROR_MESSAGES {
    MS001 = "Usuario creado exitosamente.",
    MS002 = "Acceso concedido.",
    MS003 = "Consulta realizada con \u00E9xito.",
    MS004 = "Este tipo y n\u00FAmero de documento ya est\u00E1 registrado.",
    MS005 = "Este correo electr\u00F3nico ya est\u00E1 registrado.",
    MS006 = "Por favor, ingresa al menos un nombre o n\u00FAmero de identificaci\u00F3n para realizar la b\u00FAsqueda.",
    MS007 = "No se encontr\u00F3 ning\u00FAn registro con los datos proporcionados.",
    MS008 = "No hay informaci\u00F3n nueva para actualizar.",
    MS009 = "El nombre de la membres\u00EDa ya est\u00E1 registrado.",
    MS010 = "Stock insuficiente para este producto.",
    MS011 = "Solo puedes anular esta transacci\u00F3n una vez.",
    MS012 = "Este \u00EDtem no es de tipo \"Membres\u00EDa\".",
    MS013 = "No se pueden anular transacciones realizadas hace m\u00E1s de 30 d\u00EDas.",
    MS014 = "Solicitud incorrecta, por favor revisa los datos ingresados.",
    MS015 = "Este \"link\" ya est\u00E1 en uso. Recuerda que debe ser \u00FAnico para cada negocio.",
    MS016 = "El usuario no est\u00E1 registrado.",
    MS017 = "Usuario o contrase\u00F1a incorrectos.",
    MS018 = "",
    MS019 = "No tienes permisos para acceder a esta secci\u00F3n.",
    MS020 = "Por favor, ingresa un nombre.",
    MS021 = "Este usuario no tiene suscripciones activas.",
    MS022 = "No hay productos asociados a la transacci\u00F3n.",
    MS023 = "Por pol\u00EDticas administrativas, este usuario no tiene acceso permitido.",
    MS024 = "La suscripci\u00F3n del usuario ha expirado.",
    MS025 = "La suscripci\u00F3n del usuario a\u00FAn no ha comenzado.",
    MS026 = "La suscripci\u00F3n del usuario ha sido anulada.",
    MS027 = "Error inesperado en el servidor. Por favor, int\u00E9ntalo m\u00E1s tarde.",
    MS028 = "Asigne un cliente a la compra para habilitar la suscripci\u00F3n.",
    MS029 = "Por favor, selecciona un entrenador.",
    MS030 = "El correo electr\u00F3nico no puede exceder los 100 caracteres.",
    MS031 = "El formato de este correo electr\u00F3nico no es v\u00E1lido.",
    MS032 = "El usuario necesita estar asociado a una negocio.",
    MS033 = "El usuario necesita estar asociado a una establecimiento.",
    MS034 = "Se debe especificar un usuario responsable de la actualizaci\u00F3n.",
    MS035 = "La suscripci\u00F3n del usuario est\u00E1 pr\u00F3xima a terminar.",
    MS036 = "Los m\u00E9todos de pago deben cubrir el valor de la compra.",
    MS037 = "Al registrar el inventario solo se aceptan n\u00FAmeros positivos.",
    MS038 = "El registro no se puede actualizar.",
    MS039 = "El negocio no existe.",
    MS040 = "El establecimiento no existe."
}
export declare const HANDLED_ERRORS: {
    keyword: string;
    code: keyof typeof ERROR_MESSAGES;
    status: HttpStatus;
}[];
