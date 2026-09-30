export function validateUUID(req, res, next, value) {
    if (value.length != 36) throw new Error("el service ID no tiene el formato adecuado")
    else (next())
}