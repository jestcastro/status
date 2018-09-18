export const toArray = (value: any[]) => {
    if (value) {
        return Object.keys(value).map(key => {
            return getWithKey(value[key], key);
        });
    }
    return [] as any[];
};
export const toArrayWithoutKeys = (value) => {
    if (value) {
        return Object.keys(value).map(key => {
            return value[key];
        });
    }
    return [] as any[];
};
export const toFirestoreArray = (value) => {
    if (value) {
        return value.map(doc => {
            return getWithKey(doc.data(), doc.id);
        });
    }
    return [] as any[];
};
export const cleanObject = (object) => {
    if (object.$key) {
        delete object.$key;
    }
    if (object.$exists) {
        delete object.$exists;
    }
    if (object.$value) {
        delete object.$value;
    }
    return object;
};

export const getWithKey = (value, key) => {
    const instancia = value;
    if (instancia instanceof Object) {
        instancia.$key = key;
        instancia.$exists = true;
        return instancia;
    } else {
        if (instancia) {
            return {
                $key: key,
                $value: value,
                $exists: true
            };
        } else {
            return {
                $key: key,
                $value: null,
                $exists: false
            };
        }
    }
};

export const getInfoHorario = (horario) => {
    const hoy = new Date();
    if (horario) {
        const minuto = 60000;
        const hora = minuto * 60;
        const fecha = ((minuto * hoy.getMinutes()) + (hora * hoy.getHours()));
        const dia = horario[`dia${hoy.getDay()}`];
        if (dia && dia.abre.id <= fecha && dia.cierra.id >= fecha) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
};