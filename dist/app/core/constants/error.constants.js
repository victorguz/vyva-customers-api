"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HANDLED_ERRORS = exports.ERROR_MESSAGES = void 0;
const common_1 = require("@nestjs/common");
var ERROR_MESSAGES;
(function (ERROR_MESSAGES) {
    ERROR_MESSAGES["MS001"] = "Usuario creado exitosamente.";
    ERROR_MESSAGES["MS002"] = "Acceso concedido.";
    ERROR_MESSAGES["MS003"] = "Consulta realizada con \u00E9xito.";
    ERROR_MESSAGES["MS004"] = "Este tipo y n\u00FAmero de documento ya est\u00E1 registrado.";
    ERROR_MESSAGES["MS005"] = "Este correo electr\u00F3nico ya est\u00E1 registrado.";
    ERROR_MESSAGES["MS006"] = "Por favor, ingresa al menos un nombre o n\u00FAmero de identificaci\u00F3n para realizar la b\u00FAsqueda.";
    ERROR_MESSAGES["MS007"] = "No se encontr\u00F3 ning\u00FAn registro con los datos proporcionados.";
    ERROR_MESSAGES["MS008"] = "No hay informaci\u00F3n nueva para actualizar.";
    ERROR_MESSAGES["MS009"] = "El nombre de la membres\u00EDa ya est\u00E1 registrado.";
    ERROR_MESSAGES["MS010"] = "Stock insuficiente para este producto.";
    ERROR_MESSAGES["MS011"] = "Solo puedes anular esta transacci\u00F3n una vez.";
    ERROR_MESSAGES["MS012"] = "Este \u00EDtem no es de tipo \"Membres\u00EDa\".";
    ERROR_MESSAGES["MS013"] = "No se pueden anular transacciones realizadas hace m\u00E1s de 30 d\u00EDas.";
    ERROR_MESSAGES["MS014"] = "Solicitud incorrecta, por favor revisa los datos ingresados.";
    ERROR_MESSAGES["MS015"] = "Este \"link\" ya est\u00E1 en uso. Recuerda que debe ser \u00FAnico para cada negocio.";
    ERROR_MESSAGES["MS016"] = "El usuario no est\u00E1 registrado.";
    ERROR_MESSAGES["MS017"] = "Usuario o contrase\u00F1a incorrectos.";
    ERROR_MESSAGES["MS018"] = "";
    ERROR_MESSAGES["MS019"] = "No tienes permisos para acceder a esta secci\u00F3n.";
    ERROR_MESSAGES["MS020"] = "Por favor, ingresa un nombre.";
    ERROR_MESSAGES["MS021"] = "Este usuario no tiene suscripciones activas.";
    ERROR_MESSAGES["MS022"] = "No hay productos asociados a la transacci\u00F3n.";
    ERROR_MESSAGES["MS023"] = "Por pol\u00EDticas administrativas, este usuario no tiene acceso permitido.";
    ERROR_MESSAGES["MS024"] = "La suscripci\u00F3n del usuario ha expirado.";
    ERROR_MESSAGES["MS025"] = "La suscripci\u00F3n del usuario a\u00FAn no ha comenzado.";
    ERROR_MESSAGES["MS026"] = "La suscripci\u00F3n del usuario ha sido anulada.";
    ERROR_MESSAGES["MS027"] = "Error inesperado en el servidor. Por favor, int\u00E9ntalo m\u00E1s tarde.";
    ERROR_MESSAGES["MS028"] = "Asigne un cliente a la compra para habilitar la suscripci\u00F3n.";
    ERROR_MESSAGES["MS029"] = "Por favor, selecciona un entrenador.";
    ERROR_MESSAGES["MS030"] = "El correo electr\u00F3nico no puede exceder los 100 caracteres.";
    ERROR_MESSAGES["MS031"] = "El formato de este correo electr\u00F3nico no es v\u00E1lido.";
    ERROR_MESSAGES["MS032"] = "El usuario necesita estar asociado a una negocio.";
    ERROR_MESSAGES["MS033"] = "El usuario necesita estar asociado a una establecimiento.";
    ERROR_MESSAGES["MS034"] = "Se debe especificar un usuario responsable de la actualizaci\u00F3n.";
    ERROR_MESSAGES["MS035"] = "La suscripci\u00F3n del usuario est\u00E1 pr\u00F3xima a terminar.";
    ERROR_MESSAGES["MS036"] = "Los m\u00E9todos de pago deben cubrir el valor de la compra.";
    ERROR_MESSAGES["MS037"] = "Al registrar el inventario solo se aceptan n\u00FAmeros positivos.";
    ERROR_MESSAGES["MS038"] = "El registro no se puede actualizar.";
    ERROR_MESSAGES["MS039"] = "El negocio no existe.";
    ERROR_MESSAGES["MS040"] = "El establecimiento no existe.";
})(ERROR_MESSAGES || (exports.ERROR_MESSAGES = ERROR_MESSAGES = {}));
exports.HANDLED_ERRORS = [
    {
        keyword: 'Companies_slug_key',
        code: 'MS015',
        status: common_1.HttpStatus.BAD_REQUEST,
    },
    {
        keyword: 'uk_user_document_company',
        code: 'MS004',
        status: common_1.HttpStatus.BAD_REQUEST,
    },
    {
        keyword: 'uk_user_email',
        code: 'MS005',
        status: common_1.HttpStatus.BAD_REQUEST,
    },
    {
        keyword: 'MS016',
        code: 'MS016',
        status: common_1.HttpStatus.NOT_FOUND,
    },
    {
        keyword: 'MS018',
        code: 'MS018',
        status: common_1.HttpStatus.UNAUTHORIZED,
    },
    {
        keyword: 'MS019',
        code: 'MS019',
        status: common_1.HttpStatus.UNAUTHORIZED,
    },
    {
        keyword: 'MS007',
        code: 'MS007',
        status: common_1.HttpStatus.NOT_FOUND,
    },
    {
        keyword: 'MS023',
        code: 'MS023',
        status: common_1.HttpStatus.NOT_ACCEPTABLE,
    },
    {
        keyword: 'MS024',
        code: 'MS024',
        status: common_1.HttpStatus.NOT_ACCEPTABLE,
    },
    {
        keyword: 'MS025',
        code: 'MS025',
        status: common_1.HttpStatus.NOT_ACCEPTABLE,
    },
    {
        keyword: 'MS026',
        code: 'MS026',
        status: common_1.HttpStatus.NOT_ACCEPTABLE,
    },
    {
        keyword: 'MS027',
        code: 'MS027',
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    },
];
//# sourceMappingURL=error.constants.js.map