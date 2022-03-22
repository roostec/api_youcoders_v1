class Validation {
    static existsOrError(value, msg) {
        if (!value) throw msg;
        if (Array.isArray(value) && value.length === 0) throw msg;
        if (typeof value == "string" && !value.trim()) throw msg;
    }

    static notExistsOrError(value, msg) {
        try {
            Validation.existsOrError(value, msg);
        } catch (msg) {
            return;
        }
        throw msg;
    }
}
module.exports = Validation;