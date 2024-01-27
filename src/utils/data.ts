export function paramsToFormData(obj: any) {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Array) {
            obj[key].forEach((item: any) => {
                formData.append(key, item);
            });
            return;
        }
        if (obj[key] && (typeof obj[key] !== 'string' || obj[key].length > 0))
            formData.append(key, obj[key]);
    });
    return formData;
}